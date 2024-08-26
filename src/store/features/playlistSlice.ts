import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TrackType} from "@/types/track";

type PlaylistType =  {
    currentTrack: null | TrackType;
}

const initialState: PlaylistType = {
    currentTrack: null,
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
            state.currentTrack = action.payload;
        },
    },
});

export const { setCurrentTrack } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;