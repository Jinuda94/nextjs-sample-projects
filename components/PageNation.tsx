import { useRouter } from 'next/router';
import Link from 'next/link';

interface PageNationTypes {
  pageOrigin: number;
  type: string;
}

const PageNation = ({ pageOrigin, type }: PageNationTypes) => (
  <div className="page">
    <ul className="pagination modal">
      <li>
        <Link href={type === '' ? '/' : `/${type}?page=1`}>
          <a className={pageOrigin === 1 ? 'active num' : 'num'}>1</a>
        </Link>
      </li>
      <li>
        <Link href={type === '' ? '/2' : `/${type}?page=2`}>
          <a className={pageOrigin === 2 ? 'active num' : 'num'}>2</a>
        </Link>
      </li>
      <li>
        <Link href={type === '' ? '/3' : `/${type}?page=3`}>
          <a className={pageOrigin === 3 ? 'active num' : 'num'}>3</a>
        </Link>
      </li>
      <li>
        <Link href={type === '' ? '/4' : `/${type}?page=4`}>
          <a className={pageOrigin === 4 ? 'active num' : 'num'}>4</a>
        </Link>
      </li>
      <li>
        <Link href={type === '' ? '/5' : `/${type}?page=5`}>
          <a className={pageOrigin === 5 ? 'active num' : 'num'}>5</a>
        </Link>
      </li>
      <li>
        <Link href={type === '' ? '/6' : `/${type}?page=6`}>
          <a className={pageOrigin === 6 ? 'active num' : 'num'}>6</a>
        </Link>
      </li>
      <li>
        <Link href={type === '' ? '/7' : `/${type}?page=7`}>
          <a className={pageOrigin === 7 ? 'active num' : 'num'}>7</a>
        </Link>
      </li>
      <li>
        <Link href={type === '' ? '/8' : `/${type}?page=8`}>
          <a className={pageOrigin === 8 ? 'active num' : 'num'}>8</a>
        </Link>
      </li>
      <li>
        <Link href={type === '' ? '/9' : `/${type}?page=9`}>
          <a className={pageOrigin === 9 ? 'active num' : 'num'}>9</a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      .page {
        text-align: center; // div 사이즈 영역 안에서의 center
        width: 100%;
      }

      .pagination {
        list-style: none;
        display: inline-block;
        padding: 0;
        margin-top: 20px;
      }

      .pagination li {
        display: inline;
        text-align: center;
      }

      // 숫자들에 대한 스타일 지정
      .pagination a {
        float: left;
        display: block;
        font-size: 14px;
        text-decoration: none;
        padding: 5px 12px;
        color: #96a0ad;
        line-height: 1.5;
      }

      .first {
        margin-right: 15px;
      }

      .last {
        margin-left: 15px;
      }

      .first:hover,
      .last:hover,
      .left:hover,
      .right:hover {
        color: #2e9cdf;
      }

      .pagination a.active {
        cursor: default;
        color: #ffffff;
      }

      .pagination a:active {
        outline: none;
      }

      .modal .num {
        margin-left: 3px;
        padding: 0;
        width: 30px;
        height: 30px;
        line-height: 30px;
        -moz-border-radius: 100%;
        -webkit-border-radius: 100%;
        border-radius: 100%;
      }

      .modal .num:hover {
        background-color: #2e9cdf;
        color: #ffffff;
      }

      .modal .num.active,
      .modal .num:active {
        background-color: #2e9cdf;
        cursor: pointer;
      }

      .arrow-left {
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid blue;
      }
    `}</style>
  </div>
);

export default PageNation;
