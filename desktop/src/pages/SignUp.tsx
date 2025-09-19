import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '@/store';
import { register as registerThunk } from '@/store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

type Form = { username: string; password: string };

const schema = yup.object({
  username: yup.string().required('Vui lòng nhập tài khoản'),
  password: yup.string().min(8, 'Tối thiểu 8 ký tự').required('Vui lòng nhập mật khẩu')
});

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: yupResolver(schema)
  });
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    setStatus('loading'); setError('');
    const r = await dispatch(registerThunk(data));
    if ((r as any).meta.requestStatus === 'fulfilled') {
      setStatus('done');
      navigate('/signin');
    } else { setStatus('error'); setError((r as any).error?.message || 'Đăng ký thất bại'); }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-xl font-semibold mb-4">Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Tài khoản</label>
            <input className="input" {...register('username')} />
            {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Mật khẩu</label>
            <input type="password" className="input" {...register('password')} />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn w-full" disabled={status==='loading'}>
            {status==='loading' ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>
        <div className="mt-3 text-sm text-gray-600">
          Đã có tài khoản? <Link className="text-blue-600" to="/signin">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}

