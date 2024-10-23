import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortOptions, TrackType} from "@/types/track";
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
    filteredTracks: TrackType[];
    onPlayPlaylist: TrackType[];
    mixedPlaylist: TrackType[];
    isPlaying: boolean;
    isMixed: boolean;
    filterOptions: {
        author: string[];
        year: SortOptions;
        genre: string[];
        searchValue: string;
    };
}

export type FilterOptionsType = keyof PlaylistType["filterOptions"]

const initialState: PlaylistType = {
    currentTrack: null,
    initialPlaylist: [],
    likedTracks: [],
    visiblePlaylist: [],
    filteredTracks: [],
    onPlayPlaylist: [],
    mixedPlaylist: [],
    isPlaying: false,
    isMixed: false,
    filterOptions: {
        author: [],
        year: "",
        genre: [],
        searchValue: "",
    },
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setInitialPlaylist: (state, action: PayloadAction<TrackType[]>) => {
            state.initialPlaylist = action.payload;
            state.visiblePlaylist = action.payload;
            state.filteredTracks = action.payload;
        },
        setVisiblePlaylist: (state, action: PayloadAction<TrackType[]>) => {
            state.visiblePlaylist = action.payload;
            state.filteredTracks = action.payload;
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
        setFilters: (
          state,
          action: PayloadAction<{
              author?: string[];
              searchValue?: string;
              year?: SortOptions;
              genre?: string[];
          }>
        ) => {
            state.filterOptions = {
                author: action.payload.author || state.filterOptions.author,
                searchValue:
                  action.payload.searchValue || state.filterOptions.searchValue,
                year:
                  action.payload.year === ""
                    ? ""
                    : action.payload.year || state.filterOptions.year,
                genre: action.payload.genre || state.filterOptions.genre,
            };

            state.filteredTracks = state.visiblePlaylist.filter((track) => {
                const hasAuthors = state.filterOptions.author.length !== 0;
                const isAuthors = hasAuthors
                  ? state.filterOptions.author.includes(track.author)
                  : true;
                const hasGenres = state.filterOptions.genre.length !== 0;
                const isGenres = hasGenres
                  ? track.genre.reduce(
                    (acc, item) => acc || state.filterOptions.genre.includes(item),
                    false
                  )
                  : true;

                const hasSearchValue = track.name
                  .toLowerCase()
                  .includes(state.filterOptions.searchValue.toLowerCase());
                return isAuthors && isGenres && hasSearchValue;
            });
            if (state.filterOptions.year) {
                state.filteredTracks.sort((a, b) => {
                    const delta =
                      new Date(a.release_date).getTime() -
                      new Date(b.release_date).getTime();
                    if (state.filterOptions.year === "убыв") {
                        return -delta;
                    } else {
                        return delta;
                    }
                });
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

export const { setCurrentTrack, setIsPlaying, setNextTrack, setPrevTrack, likeTrack, dislikeTrack, setIsMixed, setVisiblePlaylist, setInitialPlaylist, setFilters } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
