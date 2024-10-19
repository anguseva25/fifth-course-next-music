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
    currentPlaylist: TrackType[];
    mixedPlaylist: TrackType[];
    isPlaying: boolean;
    isMixed: boolean;
    likedTracks: number[];
}

const initialState: PlaylistType = {
    currentTrack: null,
    currentPlaylist: [],
    mixedPlaylist: [],
    isPlaying: false,
    isMixed: false,
    likedTracks: [],
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setCurrentTrack(state, action: PayloadAction<{ currentTrack: TrackType, currentPlaylist: TrackType[] }>) {
            state.currentTrack = action.payload.currentTrack;
            state.currentPlaylist = action.payload.currentPlaylist;

            if (state.isMixed) {
                state.mixedPlaylist = state.currentPlaylist.toSorted(() => 0.5 - Math.random());
            } else {
                state.mixedPlaylist = state.currentPlaylist
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
        likeTrack: (state, action: PayloadAction<number>) => {
            if (!state.likedTracks.includes(action.payload)) {
                state.likedTracks.push(action.payload);
            }
        },
        dislikeTrack: (state, action: PayloadAction<number>) => {
            state.likedTracks = state.likedTracks.filter(
              (id) => id !== action.payload
            );
        },
        setIsPlaying(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload;
        },
        setIsMixed(state, action: PayloadAction<boolean>) {
            state.isMixed = action.payload;

            if (state.isMixed) {
                state.mixedPlaylist = state.currentPlaylist.toSorted(() => 0.5 - Math.random());
            } else {
                state.mixedPlaylist = state.currentPlaylist
            }
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getFavoriteTracks.fulfilled, (state, action) => {
              state.likedTracks = action.payload.map((track: TrackType) => track._id);
          });
    },
});

export const { setCurrentTrack, setIsPlaying, setNextTrack, setPrevTrack, likeTrack, dislikeTrack, setIsMixed } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
