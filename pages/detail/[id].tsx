import React from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading';
import Link from 'next/link';

const fetchPockemon = async (id: any) =>
  await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).json();

const Id = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery<any[], Error>(['detail'], () =>
    fetchPockemon(id),
  );

  const { name, types, base_experience, abilities, order }: any = data;

  if (isLoading)
    return (
      <div className={'flex justify-center w-full'}>
        <Loading />
      </div>
    );
  if (error) return 'An error has occurred: ' + error?.message;

  return (
    <div>
      {data && (
        <div>
          <div
            // onClick={() => onClick(id, movie.original_title)}
            className="flex border-2 border-solid rounded-lg border-gray-700 border-opacity-20 shadow-md rounded-xl  max-w-full"
          >
            <div className={'w-2/5'}>
              <img
                className={'w-full'}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              />
            </div>
            <div className={'w-3/5 bg-blue-50'}>
              <h1
                className={
                  'text-5xl text-center text-stone-700 text-b hover:text-blue-500 font-sans subpixel-antialiased font-bold mt-2.5'
                }
              >
                {name}
              </h1>
              <h4
                className={
                  'text-2xl text-center text-stone-700 text-b hover:text-blue-500 font-sans subpixel-antialiased font-bold mt-2.5'
                }
              >
                ID : {id}
              </h4>
              <h4
                className={
                  'text-2xl text-center text-stone-700 text-b hover:text-blue-500 font-sans subpixel-antialiased font-bold mt-2.5'
                }
              >
                도감순서 : {order}
              </h4>
              <h4
                className={
                  'text-2xl text-center text-stone-700 text-b hover:text-blue-500 font-sans subpixel-antialiased font-bold mt-2.5'
                }
              >
                기본 경험치 : {base_experience}
              </h4>
              <h4
                className={
                  'text-2xl text-center text-stone-700 text-b hover:text-blue-500 font-sans subpixel-antialiased font-bold mt-2.5'
                }
              >
                타입 : {types && types.map((i: any) => `${i.type.name} `)}
              </h4>
              <h4
                className={
                  'text-2xl text-center text-stone-700 text-b hover:text-blue-500 font-sans subpixel-antialiased font-bold mt-2.5'
                }
              >
                기술 :
                {abilities && abilities.map((i: any) => `${i.ability.name} `)}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const { id } = context.query;
  let idOrigin = 1;
  if (id) {
    if (typeof id === 'string') {
      idOrigin = parseInt(id);
    }
  }

  await queryClient.prefetchQuery(['detail'], () => fetchPockemon(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Id;
