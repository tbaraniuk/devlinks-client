import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

import { Input, Button, AuthLayout } from '../components';
import { useAppDispatch } from '../hooks';
import { useRegisterUserMutation } from '../api/apiSlice';
import { setCredentials } from '../store/userSlice';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const [
    register,
    { isError: isUserRegisterError, isLoading: isUserRegisterLoading },
  ] = useRegisterUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warn('Password and confirm password should be the same!');
      return;
    }

    const userData = await register({
      email: email,
      username: username,
      password: password,
    });

    if (userData.data.token) {
      dispatch(setCredentials(userData.data));
      navigate('/');
    } else if (isUserRegisterError) {
      toast.error('An error occurred while registering, please try again!');
    }
  };

  return (
    <AuthLayout>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-neutral-800'>
            Create account
          </h1>
          <p className='text-neutral-500'>
            Let's get you started sharing your links!
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input
            id='email'
            label='Email address'
            icon={Mail}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='e.g. alex@email.com'
            required
          />
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
            placeholder='At least 8 characters'
            required
          />

          <Input
            id='confirmPassword'
            label='Confirm password'
            icon={Lock}
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Repeat password'
            required
          />

          <Button
            type='submit'
            className={
              isUserRegisterLoading ? 'bg-opacity-50 hover:bg-primary-50' : ''
            }
            onClick={handleSubmit}>
            {isUserRegisterLoading ? (
              <Loader2 className='animate-spin mx-auto' />
            ) : (
              'Login'
            )}
          </Button>
        </form>

        <p className='text-center text-neutral-500'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-primary hover:text-primary-light font-medium'>
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
