import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Stories = lazy(() => import('./pages/Stories'));
const StoryDetail = lazy(() => import('./pages/StoryDetail'));
const Reader = lazy(() => import('./pages/Reader'));

const SuspenseWrap = (Comp: React.LazyExoticComponent<() => JSX.Element>) => () => (
  <React.Suspense fallback={<div className="text-center">Đang tải...</div>}>
    <Comp />
  </React.Suspense>
);

export default [
  { path: '/', element: SuspenseWrap(Stories) },
  { path: '/stories', element: SuspenseWrap(Stories) },
  { path: '/stories/:id', element: SuspenseWrap(StoryDetail) },
  { path: '/stories/:id/chapters/:number', element: SuspenseWrap(Reader) },
  { path: '/signin', element: SuspenseWrap(SignIn) },
  { path: '/signup', element: SuspenseWrap(SignUp) },
  { path: '*', element: () => <Navigate to="/" replace /> },
];

