import { useQuery } from '@tanstack/react-query';
import { getReviewApi } from '../apis/api';
import { useCookies } from 'react-cookie';

function Review({ feedId }) {
  const [cookies] = useCookies(['access_token']);
  const { data, isLoading } = useQuery(['reviewData'], () =>
    getReviewApi(cookies.access_token, feedId),
  );
  console.log(data, 'reviewData');
  if (isLoading) {
    return <div>is Loading...</div>;
  }
  return (
    <div>
      {/* {data?.map((item) => (
        <div>
          <div>{item.writer}</div>
          <div>{item.content}</div>
        </div>
      ))} */}
    </div>
  );
}
export default Review;
