import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export type Story = {
  id: string;
  title: string;
  description?: string;
  author?: string;
  coverUrl?: string;
};

export type Chapter = {
  id: string;
  number: number;
  title?: string;
  content: string;
  storyId: string;
};

export const fetchStories = createAsyncThunk('story/list', async () => {
  const res = await axios.get(`${API_URL}/stories`);
  return res.data as Story[];
});

export const fetchStory = createAsyncThunk('story/get', async (id: string) => {
  const res = await axios.get(`${API_URL}/stories/${id}`);
  return res.data as Story & { chapters: Chapter[] };
});

export const fetchChapter = createAsyncThunk(
  'story/chapter',
  async (p: { id: string; number: number }) => {
    const res = await axios.get(`${API_URL}/stories/${p.id}/chapters/${p.number}`);
    return res.data as Chapter;
  }
);

type StoryState = {
  stories: Story[];
  story?: Story & { chapters: Chapter[] };
  chapter?: Chapter;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
};

const initialState: StoryState = {
  stories: [],
  status: 'idle',
  error: null,
};

const slice = createSlice({
  name: 'story',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchStories.fulfilled, (s, a) => { s.status = 'succeeded'; s.stories = a.payload; })
      .addCase(fetchStories.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message || 'Failed'; })
      .addCase(fetchStory.fulfilled, (s, a) => { s.story = a.payload; })
      .addCase(fetchChapter.fulfilled, (s, a) => { s.chapter = a.payload; });
  }
});

export default slice.reducer;
