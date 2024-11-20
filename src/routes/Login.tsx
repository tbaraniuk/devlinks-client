import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

import { Input, Button, AuthLayout } from '../components';
import { useLoginUserMutation } from '../api/apiSlice';
import { useAppDispatch } from '../hooks';
import { setTokenCredentials } from '../store/userSlice';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, isLoading] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) return;

    const userData = await login({ username, password });

    if (userData?.data?.access_token) {
      dispatch(setTokenCredentials(userData.data));
      navigate('/');
    } else if (userData?.error?.data?.detail) {
      toast.error(userData.error.data.detail);
    } else {
      toast.error('An error occurred while authorization, please try again!');
    }
  };

  return (
    <AuthLayout>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-neutral-800'>Login</h1>
          <p className='text-neutral-500'>
            Add your details below to get back into the app
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input
            id='username'
            label='Username'
            icon={User}
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='e.g. alex11'
            required
          />

          <Input
            id='password'
            label='Password'
            icon={Lock}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />

          <Button
            type='submit'
            className={isLoading ? 'bg-opacity-50 hover:bg-primary-50' : ''}
            onClick={handleSubmit}>
            {isLoading ? <Loader2 className='animate-spin mx-auto' /> : 'Login'}
          </Button>
        </form>

        <p className='text-center text-neutral-500'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='text-primary hover:text-primary-light font-medium'>
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
