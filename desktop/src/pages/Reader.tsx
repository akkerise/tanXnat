import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchChapter, fetchStory } from '@/store/slices/storySlice';

export default function Reader() {
  const { id, number } = useParams();
  const dispatch = useAppDispatch();
  const chapter = useAppSelector(s => s.story.chapter);
  const story = useAppSelector(s => s.story.story);
  const navigate = useNavigate();
  const num = Number(number || '1');

  useEffect(() => { if (id) dispatch(fetchStory(id)); }, [id, dispatch]);
  useEffect(() => { if (id && number) dispatch(fetchChapter({ id, number: num })); }, [id, number, dispatch]);

  const goto = (n: number) => navigate(`/stories/${id}/chapters/${n}`);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to={`/stories/${id}`} className="text-blue-600">← {story?.title}</Link>
        <div className="flex gap-2">
          <button className="btn" onClick={() => goto(Math.max(1, num - 1))}>Trước</button>
          <button className="btn" onClick={() => goto(num + 1)}>Sau</button>
        </div>
      </div>
      <div className="card">
        <h1 className="text-xl font-semibold mb-3">Chương {chapter?.number} {chapter?.title ? `- ${chapter?.title}` : ''}</h1>
        <div className="whitespace-pre-wrap leading-7">{chapter?.content || '...'}</div>
      </div>
    </div>
  );
}

