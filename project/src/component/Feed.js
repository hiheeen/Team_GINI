import styles from './Feed.module.css';
import dayjs from 'dayjs';
const data = [
  {
    img: 'https://images.unsplash.com/photo-1693761934322-095c367125f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ1fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    created_at: dayjs('2023-09-14T08:44:17.883Z').format('YYYY-MM-DD'),
    title: 'test 게시글',
    content:
      '무한한 우주 속에서 우리는 작은 빛 중 하나일 뿐이지만, 우리 안에는 큰 꿈과 감정이 숨쉬고 있습니다. 각각의 순간은 소중하며, 우리의 삶은 아름다운 여행입니다. 가끔은 눈을 감고 하늘의 별들을 바라보며 우리가 얼마나 작고 무한한 우주 속에서 얼마나 특별한 존재인지를 생각해보는 것도 좋습니다. 그리고 그 감정을 나누고 공유하며, 우리의 삶을 더 풍요롭게 만들어나갑시다.',
    is_secret: true,
    category: '추억',
  },
  {
    img: 'https://images.unsplash.com/photo-1693761934322-095c367125f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ1fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    created_at: dayjs('2023-09-14T08:44:17.883Z').format('YYYY-MM-DD'),
    title: 'test 게시글',
    content:
      '무한한 우주 속에서 우리는 작은 빛 중 하나일 뿐이지만, 우리 안에는 큰 꿈과 감정이 숨쉬고 있습니다. 각각의 순간은 소중하며, 우리의 삶은 아름다운 여행입니다. 가끔은 눈을 감고 하늘의 별들을 바라보며 우리가 얼마나 작고 무한한 우주 속에서 얼마나 특별한 존재인지를 생각해보는 것도 좋습니다. 그리고 그 감정을 나누고 공유하며, 우리의 삶을 더 풍요롭게 만들어나갑시다.',
    is_secret: true,
    category: '추억',
  },
  {
    img: 'https://images.unsplash.com/photo-1693761934322-095c367125f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ1fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    created_at: dayjs('2023-09-14T08:44:17.883Z').format('YYY-YMM-DD'),
    title: 'test 게시글',
    content:
      '무한한 우주 속에서 우리는 작은 빛 중 하나일 뿐이지만, 우리 안에는 큰 꿈과 감정이 숨쉬고 있습니다. 각각의 순간은 소중하며, 우리의 삶은 아름다운 여행입니다. 가끔은 눈을 감고 하늘의 별들을 바라보며 우리가 얼마나 작고 무한한 우주 속에서 얼마나 특별한 존재인지를 생각해보는 것도 좋습니다. 그리고 그 감정을 나누고 공유하며, 우리의 삶을 더 풍요롭게 만들어나갑시다.',
    is_secret: true,
    category: '추억',
  },
];
// on/off 여부에 따라 feed에서 사람들의 프로필과 닉네임을 보여줘야 한다.
// off 일 때에는 안 보여줘도 됨. 내 것만 나오기 때문에.

function Feed() {
  const testImg = process.env.PUBLIC_URL + '/images/testImg.png';
  const testImg2 = process.env.PUBLIC_URL + '/images/testImg2.png';
  return (
    <div>
      <div style={{ padding: '5px 20px 20px 20px' }}>
        <img style={{ width: 700 }} alt="" src={testImg} />
      </div>
      <div style={{ padding: '5px 20px 20px 20px' }}>
        <img style={{ width: 700 }} alt="" src={testImg} />
      </div>
      <div style={{ padding: '5px 20px 20px 20px' }}>
        <img style={{ width: 700 }} alt="" src={testImg} />
      </div>

      {/* <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: 700 }} alt="" src={testImg2} />
      </div> */}
      {data.map((item, index) => (
        <div key={index}>
          <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img className={styles.feedImg} alt="" src={item.img} />
            </div>
            <div className={styles.date_category}>
              <div className={styles.date}>{item.created_at}</div>
              <div className={styles.category}>{item.category}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Feed;
