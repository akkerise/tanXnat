import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchStory } from '@/store/slices/storySlice';

export default function StoryDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const story = useAppSelector(s => s.story.story);
  useEffect(() => { if (id) dispatch(fetchStory(id)); }, [id, dispatch]);
  if (!story) return <div>Đang tải...</div>;
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {story.coverUrl ? (
          <img src={story.coverUrl} alt={story.title} className="w-24 h-32 object-cover rounded" />
        ) : (
          <div className="w-24 h-32 bg-gray-200 rounded" />
        )}
        <div>
          <h1 className="text-2xl font-semibold">{story.title}</h1>
          <div className="text-sm text-gray-600">{story.author || 'Ẩn danh'}</div>
          <p className="mt-2 text-gray-700 max-w-3xl">{story.description}</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Danh sách chương</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {story.chapters?.map((c) => (
            <Link key={c.id} to={`/stories/${story.id}/chapters/${c.number}`} className="text-blue-600 hover:underline">
              Chương {c.number} {c.title ? `- ${c.title}` : ''}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

