import Image from 'next/image';
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

interface PageArrayParams {
  [key: string]: any;
  paths: Array<{ params: { page?: string } }>;
  fallback: boolean;
}

interface ContentPageProps {
  list: any;
  count: any;
}

const SsgPage = ({ list, count }: any) => {
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

  return (
    <>
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
              <span className={'w-full'}>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  width={200}
                  height={175.2}
                  alt={`${pocketmon.name}`}
                  priority
                />
              </span>
              {/*<img*/}
              {/*  className={'w-full'}*/}
              {/*  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}*/}
              {/*/>*/}
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
        <img className={'w-1/4'} src="/Douzone.svg" />
      </div>
      <PageNation pageOrigin={pageOrigin} type={''} />
    </>
  );
};

export const getStaticPaths = async ({}): Promise<PageArrayParams> => {
  const testPage = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const paths = testPage.map((page) => ({
    params: { page: page.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> => {
  let pageOrigin = '1';
  if (params) {
    const { page } = params;
    console.log('page: ' + page);
    console.log(typeof page);

    if (page) pageOrigin = page;
  }
  const BASE_URL = process.env.BASE_URL;
  console.log('pageOrigin: ' + pageOrigin);
  console.log('------------------------------');
  const { results, count } = await (
    await fetch(`${BASE_URL}?offset=${pageOrigin}0&limit=10}`)
  ).json();

  return {
    props: {
      list: results,
      count: count,
    },
  };
};

export default SsgPage;
