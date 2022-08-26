import { useRouter } from 'next/router';
import Seo from '../../components/Seo';

const testFn = async () => {
  const data = await (await fetch(`/test`)).json();
  return data;
};

const MovieDetail = ({ params, data }: any) => {
  const router = useRouter();
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title || 'Loading'}</h4>
    </div>
  );
};

// export const getServerSideProps = async ({ params: { params } }) => {
//   const [title, id] = params || [];
//   const data = await (
//     await fetch(`http://localhost:3000/api/movies/${id}`)
//   ).json();
//
//   return {
//     props: {
//       params,
//       data,
//     },
//   };
// };
//
export default MovieDetail;
