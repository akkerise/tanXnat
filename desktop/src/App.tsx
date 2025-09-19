import React from 'react';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import RoutesConfig from './routes';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { logout } from './store/slices/authSlice';

function Navbar() {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold">Truyện Cổ</Link>
          <Link to="/stories" className="text-gray-700 hover:text-black">Danh sách</Link>
        </div>
        <div>
          {auth.token ? (
            <button className="btn" onClick={() => { dispatch(logout()); navigate('/signin'); }}>Đăng xuất</button>
          ) : (
            <Link className="btn" to="/signin">Đăng nhập</Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1 w-full max-w-5xl">
        <Outlet />
      </div>
      <footer className="text-center text-xs text-gray-500 py-4">© {new Date().getFullYear()} Truyện Cổ</footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        {RoutesConfig.map((r) => (
          <Route key={r.path} path={r.path} element={<r.element />} />
        ))}
      </Route>
    </Routes>
  );
}

