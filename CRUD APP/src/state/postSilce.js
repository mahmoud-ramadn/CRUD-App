import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
  loading: false,
  error: null,
  record: null,
};

export const editPost = createAsyncThunk(
  "Posts/editPost",
  async (item, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await fetch(`https://crud-app-server-2betib8gf-mahmoud-ramadans-projects.vercel.app/posts/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch posts thunk
export const fetchPosts = createAsyncThunk(
  "Posts/fetchPosts",
  async (_, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await fetch("https://crud-app-server-2betib8gf-mahmoud-ramadans-projects.vercel.app/posts");
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPost = createAsyncThunk(
  "Posts/getPost",
  async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await fetch(`https://crud-app-server-2betib8gf-mahmoud-ramadans-projects.vercel.app/posts/${id}`);

      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete post thunk
export const deletePost = createAsyncThunk(
  "Posts/deletePost",
  async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      await fetch(`https://crud-app-server-2betib8gf-mahmoud-ramadans-projects.vercel.app/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insetPost = createAsyncThunk(
  "Posts/insetPost",
  async (item, ThunkAPI) => {
    const { rejectWithValue, getState } = ThunkAPI;
    const { auth } = getState();

    try {
      const res = await fetch("https://crud-app-server-2betib8gf-mahmoud-ramadans-projects.vercel.app/posts", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // getpost

      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   Editpost

      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  insert posts

      .addCase(insetPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insetPost.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.push(action.payload);
      })
      .addCase(insetPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter((el) => el.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { cleanRecord } = postSlice.actions;
export default postSlice.reducer;
