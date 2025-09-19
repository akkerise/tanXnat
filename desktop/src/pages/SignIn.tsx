import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store';
import { login } from '@/store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

type Form = { username: string; password: string };

const schema = yup.object({
  username: yup.string().required('Vui lòng nhập tài khoản'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export default function SignIn() {
  const { register: reg, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '' },
  });
  const dispatch = useAppDispatch();
  const auth = useAppSelector(s => s.auth);
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    const r = await dispatch(login(data));
    if ((r as any).meta.requestStatus === 'fulfilled') {
      navigate('/stories');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-xl font-semibold mb-4">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Tài khoản</label>
            <input className="input" {...reg('username')} />
            {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Mật khẩu</label>
            <input type="password" className="input" {...reg('password')} />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>
          {auth.error && <p className="text-sm text-red-600">{auth.error}</p>}
          <button className="btn w-full" disabled={auth.status==='loading'}>
            {auth.status==='loading' ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <div className="mt-3 text-sm text-gray-600">
          Chưa có tài khoản? <Link className="text-blue-600" to="/signup">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}

