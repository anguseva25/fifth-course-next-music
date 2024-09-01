import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TrackType} from "@/types/track";

type PlaylistType = {
    currentTrack: null | TrackType;
    currentPlaylist: TrackType[];
    mixedPlaylist: TrackType[];
    isPlaying: boolean;
    isMixed: boolean;
}

const initialState: PlaylistType = {
    currentTrack: null,
    currentPlaylist: [],
    mixedPlaylist: [],
    isPlaying: false,
    isMixed: false,
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
});

export const { setCurrentTrack, setIsPlaying, setNextTrack, setPrevTrack, setIsMixed } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
