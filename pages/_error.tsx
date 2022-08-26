import Loading from '../components/Loading';
import React from 'react';

const ErrorPage = () => (
  <div className={'w-full'}>
    <img className={'w-full'} src={'/pika.jpeg'} />
    <h1
      className={
        'text-5xl text-center text-stone-700 text-b hover:text-blue-500 font-sans subpixel-antialiased font-bold mt-2.5'
      }
    >
      페이지를 찾을 수 없습니다.
    </h1>
  </div>
);

export default ErrorPage;
