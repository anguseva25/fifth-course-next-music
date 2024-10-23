import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {FormDataType, ShortFormDataType, UserType} from "@/types/user";

const API_URL = "https://webdev-music-003b5b991590.herokuapp.com/user";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }: ShortFormDataType) => {
    const response = await fetch(`${API_URL}/login/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as UserType;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ email, password, username }: FormDataType) => {
    const response = await fetch(`${API_URL}/signup/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as UserType;
  }
);

export const getTokens = createAsyncThunk(
  "user/getTokens",
  async ({ email, password }: ShortFormDataType) => {
    const response = await fetch(`${API_URL}/token/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  }
);

type UserStateType = {
  user: null | UserType;
  tokens: {
    access: string;
    refresh: string;
  };
};

const initialState: UserStateType = {
  user: null,
  tokens: {
    access: "",
    refresh: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens.access = "";
      state.tokens.refresh = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
      })
      .addCase(
        getTokens.fulfilled, (state, action: PayloadAction<{ access: string; refresh: string }>) => {
          console.log("test", action.payload)
          state.tokens.access = action.payload.access;
          state.tokens.refresh = action.payload.refresh;
        }
      );
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
