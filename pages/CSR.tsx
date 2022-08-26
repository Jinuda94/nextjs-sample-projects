import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PageNation from '../components/PageNation';
import { GetServerSideProps } from 'next';
import Loading from '../components/Loading';

interface pockemonListTypes {
  name: string;
  url: string;
}

const CSR = () => {
  const router = useRouter();
  const { page } = router.query;
  let pageOrigin = 1;
  if (page) {
    if (typeof page === 'string') {
      pageOrigin = parseInt(page);
    }
  }
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    const { results, count } = await (
      await fetch(
        `http://localhost:3000/api/pocketList?page=${pageOrigin}0&limit=10`,
      )
    ).json();
    setList(results);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getList().then((r) => {
        setLoading(false);
      });
    }, 2000);
  }, [pageOrigin]);

  const onClick = (id: string) => {
    router.push(`/detail/${id}`);
  };

  if (loading) {
    return (
      <div className={'flex justify-center w-full'}>
        <Loading />
      </div>
    );
  }

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
      <PageNation pageOrigin={pageOrigin} type={'CSR'} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query;
  let pageOrigin = 1;
  if (page) {
    if (typeof page === 'string') {
      pageOrigin = parseInt(page);
    }
  }
  const { results, count } = await (
    await fetch(
      `http://localhost:3000/api/pocketList?page=${pageOrigin}0&limit=10`,
    )
  ).json();

  return {
    props: {
      list: results,
      count: count,
    },
  };
};

export default CSR;
