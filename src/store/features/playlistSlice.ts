import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TrackType} from "@/types/track";
import {fetchFavoriteTracks} from "@/API/getAllTracks";


export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (accessToken: string) => {
      const favoriteTracks = await fetchFavoriteTracks(accessToken);
      return favoriteTracks;
  }
);


type PlaylistType = {
    currentTrack: null | TrackType;
    initialPlaylist: TrackType[];
    likedTracks: TrackType[];
    visiblePlaylist: TrackType[];
    onPlayPlaylist: TrackType[];
    mixedPlaylist: TrackType[];
    isPlaying: boolean;
    isMixed: boolean;
}

const initialState: PlaylistType = {
    currentTrack: null,
    initialPlaylist: [],
    likedTracks: [],
    visiblePlaylist: [],
    onPlayPlaylist: [],
    mixedPlaylist: [],
    isPlaying: false,
    isMixed: false,
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setInitialPlaylist: (state, action: PayloadAction<TrackType[]>) => {
            state.initialPlaylist = action.payload;
            state.visiblePlaylist = action.payload;
        },
        setVisiblePlaylist: (state, action: PayloadAction<TrackType[]>) => {
            state.visiblePlaylist = action.payload;
        },
        setCurrentTrack(state, action: PayloadAction<{ track: TrackType, playlist: TrackType[] }>) {
            state.currentTrack = action.payload.track;
            state.onPlayPlaylist = action.payload.playlist;

            if (state.isMixed) {
                state.mixedPlaylist = state.onPlayPlaylist.toSorted(() => 0.5 - Math.random());
            } else {
                state.mixedPlaylist = state.onPlayPlaylist
            }
        },
        setNextTrack(state) {
            const index = state.mixedPlaylist.findIndex((track) => track._id === state.currentTrack?._id );
            const track = state.mixedPlaylist[index+1];

            if (track) {
                state.currentTrack = track;
            }
        },
        setPrevTrack(state) {
            const index = state.mixedPlaylist.findIndex((track) => track._id === state.currentTrack?._id);
            const track = state.mixedPlaylist[index - 1];

            if (track) {
                state.currentTrack = track;
            }
        },
        likeTrack: (state, action: PayloadAction<TrackType>) => {
            state.likedTracks.push(action.payload);
        },
        dislikeTrack: (state, action: PayloadAction<TrackType>) => {
            state.likedTracks = state.likedTracks.filter(
              (track) => track._id !== action.payload._id
            );
        },
        setIsPlaying(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload;
        },
        setIsMixed(state, action: PayloadAction<boolean>) {
            state.isMixed = action.payload;

            if (state.isMixed) {
                state.mixedPlaylist = state.onPlayPlaylist.toSorted(() => 0.5 - Math.random());
            } else {
                state.mixedPlaylist = state.onPlayPlaylist
            }
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getFavoriteTracks.fulfilled, (state, action) => {
              state.likedTracks = action.payload;
          });
    },
});

export const { setCurrentTrack, setIsPlaying, setNextTrack, setPrevTrack, likeTrack, dislikeTrack, setIsMixed, setVisiblePlaylist, setInitialPlaylist } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
