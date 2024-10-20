import {useAppDispatch, useAppSelector} from "@/hooks";
import {
  likeTrack as likeTrackAction,
  dislikeTrack as dislikeTrackAction,
} from "@/store/features/playlistSlice";
import { dislikeTrack, likeTrack} from "@/API/getAllTracks";
import {TrackType} from "@/types/track";

export const useLikeTrack = (track: TrackType) => {
  const dispatch = useAppDispatch();

  const tokens = useAppSelector((state) => state.user.tokens);
  const user = useAppSelector((state) => state.user.user);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);

  const isLiked = likedTracks.find((item) => item._id === track._id);

  const handleLike = async (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!tokens.access || !tokens.refresh || !user) {
      return alert("Авторизуйтесь, чтобы добавить трек в избранное");
    }

    const action = isLiked ? dislikeTrack : likeTrack;

    try {
      await action({
        trackId: track._id,
        access: tokens.access,
        refresh: tokens.refresh,
      });
      if (isLiked) {
        dispatch(dislikeTrackAction(track));
      } else {
        dispatch(likeTrackAction(track));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isLiked, handleLike };
};
