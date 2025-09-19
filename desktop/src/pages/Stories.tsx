import React, { useEffect, useState, lazy } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchStories } from '@/store/slices/storySlice';
import { Link } from 'react-router-dom';

const LazyModal = lazy(() => import('@/components/LazyModal'));

export default function Stories() {
  const dispatch = useAppDispatch();
  const { stories, status } = useAppSelector(s => s.story);
  const [open, setOpen] = useState(false);
  useEffect(() => { dispatch(fetchStories()); }, [dispatch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Danh sách truyện</h1>
        <button className="btn" onClick={() => setOpen(true)}>Bộ lọc (Lazy Modal)</button>
      </div>
      {status === 'loading' && <div>Đang tải...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map((s) => (
          <Link key={s.id} to={`/stories/${s.id}`} className="card hover:shadow-md transition">
            <div className="flex gap-4">
              {s.coverUrl ? (
                <img src={s.coverUrl} alt={s.title} className="w-20 h-28 object-cover rounded" />
              ) : (
                <div className="w-20 h-28 bg-gray-200 rounded" />
              )}
              <div>
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-gray-600">{s.author || 'Ẩn danh'}</div>
                <p className="text-sm mt-1 line-clamp-3">{s.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <React.Suspense fallback={null}>
        <LazyModal open={open} onClose={() => setOpen(false)} title="Bộ lọc">
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Ví dụ modal tải chậm và unmount khi đóng.</div>
            <button className="btn" onClick={() => setOpen(false)}>Đóng</button>
          </div>
        </LazyModal>
      </React.Suspense>
    </div>
  );
}

