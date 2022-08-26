import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const NavBar = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/`);
  };

  return (
    <nav className={'flex gap3 items-center flex-col pt-5 pb-3'}>
      <span className={'w-1/4'} onClick={onClick}>
        <Image
          src={`/Douzone.svg`}
          width={'500px'}
          height={'300'}
          alt={`Douzone`}
          priority
        />
      </span>
      {/*<img className={'w-1/4'} src="/Douzone.svg" />*/}
      <div className={'flex gap3 flex-row items-center'}>
        <Link href="/">
          <a
            className={
              router.pathname === '/' || router.pathname === '/[page]'
                ? 'active'
                : ''
            }
          >
            SSG
          </a>
        </Link>
        <Link href="/SSR">
          <a className={router.pathname === '/SSR' ? 'active' : ''}>SSR</a>
        </Link>
        <Link href="/CSR">
          <a className={router.pathname === '/CSR' ? 'active' : ''}>CSR</a>
        </Link>
        <Link href="/ISR">
          <a className={router.pathname === '/ISR' ? 'active' : ''}>ISR</a>
        </Link>
      </div>
      <hr className={'border-b-neutral-400 w-full'} />
      <style jsx>{`
        nav a {
          font-weight: 600;
          font-size: 18px;
          margin-left: 10px;
        }
        .active {
          color: tomato;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
