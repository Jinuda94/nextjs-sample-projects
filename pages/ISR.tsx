import Link from 'next/link';
import { useRouter } from 'next/router';
import PageNation from '../components/PageNation';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

interface pockemonListTypes {
  name: string;
  url: string;
}

interface PageParams {
  [key: string]: any;
  page?: string;
}

interface ContentPageProps {
  list: any;
  count: any;
  datetime: any;
}

const ISR = ({ list, count, datetime }: any) => {
  const router = useRouter();
  const { page } = router.query;
  let pageOrigin = 1;
  if (page) {
    if (typeof page === 'string') {
      pageOrigin = parseInt(page);
    }
  }
  const onClick = (id: string) => {
    router.push(`/detail/${id}`);
  };

  const revalidate = () => {
    fetch('/api/revalidate');
  };

  return (
    <>
      <h1 className={'text-rose-600 font-bold'}>{datetime}</h1>
      <button
        className={
          'my-1.5 text-red-700 cursor-pointer border-2 border-solid rounded-lg border-red-700 border-opacity-20  shadow-md rounded-xl hover:border-blue-500 hover:text-blue-500 p-2 max-w-full'
        }
        onClick={() => revalidate()}
      >
        <h4 className={'font-sans'}>revalidate</h4>
      </button>
      <div className="grid grid-cols-5 gap-8">
        {list?.map((pocketmon: pockemonListTypes) => {
          const url = pocketmon.url.split('pokemon/', 2);
          const id = url[1].substring(0, url[1].lastIndexOf('/'));
          return (
            <div
              onClick={() => onClick(id)}
              className="cursor-pointer border-2 border-solid rounded-lg border-gray-700 border-opacity-20 shadow-md rounded-xl delay-100 ease-in-out hover:scale-105 hover:-translate-x-3 max-w-full"
              key={id}
            >
              <img
                className={'w-full'}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              />
              <Link href={`/detail/${id}`} key={id}>
                <a>
                  <h4
                    className={
                      'text-lg text-center text-stone-700 text-b hover:text-blue-500 font-sans subpixel-antialiased font-bold'
                    }
                  >
                    {pocketmon.name}
                  </h4>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> => {
  console.log('[Next.js] Running getStaticProps...');
  let pageOrigin = 1;
  if (params) {
    const { page } = params;

    if (typeof page === 'string') {
      pageOrigin = parseInt(page);
    }
  }
  const BASE_URL = process.env.BASE_URL;
  const { results, count } = await (
    await fetch(`${BASE_URL}?offset=${pageOrigin}0&limit=10}`)
  ).json();

  const today = new Date();

  const hours = today.getHours(); // 시
  const minutes = today.getMinutes(); // 분
  const seconds = today.getSeconds(); // 초
  const datetime = hours + '시 ' + minutes + '분 ' + seconds + '초';

  return {
    props: {
      list: results,
      count: count,
      datetime,
    },
    revalidate: 10,
  };
};

export default ISR;
