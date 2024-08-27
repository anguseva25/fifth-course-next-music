import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TrackType} from "@/types/track";

type PlaylistType =  {
    currentTrack: null | TrackType;
    currentPlaylist: TrackType[];
}

const initialState: PlaylistType = {
    currentTrack: null,
    currentPlaylist: [],
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<{ currentTrack: TrackType, currentPlaylist: TrackType[] }>) => {
            state.currentTrack = action.payload.currentTrack;
            state.currentPlaylist = action.payload.currentPlaylist;
        },
    },
});

export const { setCurrentTrack } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;