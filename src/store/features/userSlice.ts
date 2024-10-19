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
      throw new Error(json.detail);
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
      throw new Error(json.detail);
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

    if (!response.ok) {
      throw new Error(`Возникла ошибка! Статус: ${response.status}`);
    }

    const json = await response.json();
    return json;
  }
);

type UserStateType = {
  user: null | UserType;
  tokens: {
    access: string | null;
    refresh: string | null;
  };
};

const initialState: UserStateType = {
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
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
