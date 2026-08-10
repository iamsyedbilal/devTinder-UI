import { createSlice } from "@reduxjs/toolkit";

const initialState = { feed: [] };

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    displayFeed: (state, action) => {
      state.feed = action.payload;
    },
    removeFeed: (state, action) => {
      state.feed = state.feed.filter((item) => item.id !== action.payload);
    },
  },
});

export const { displayFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
