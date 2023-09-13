import { useState } from 'react';
import styles from './UpLoadPage.module.css';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
function UpLoadPage() {
  const [value, setValue] = useState({
    title: '',
    photo: '',
    description: '',
    category: '',
    isSecret: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [cookies] = useCookies(['access_token', 'refresh_token']);
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // 파일의 내용을 읽어 이미지로 표시
        const result = e.target.result;
        setImageSrc(result); // 이미지를 표시하기 위해 상태 업데이트
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleCategoryChange = (event) => {
  //   const selectedCategory = event.target.value; // 선택한 값을 가져옴
  //   setValue((prevValue) => ({
  //     ...prevValue,
  //     category: selectedCategory, // category 상태 업데이트
  //   }));
  // };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      category: value.category,
      title: value.title,
      comment: value.description,
      is_secret: false,
    };
    await axios
      .post('http://27.96.134.191/api/v1/feeds/', formData, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log('데이터 전송 성공', res);
        navigate('/');
      })
      .catch((err) => console.log('데이터 전송 에러', err));
  };
  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  title: e.target.value, // category 상태 업데이트
                }))
              }
              className={styles.title}
              placeholder="제목"
              value={value.title}
            />
            <hr style={{ borderColor: 'rgba(120,120,120 , 0.2)' }} />
            <div className={styles.photoBox}>
              {imageSrc ? (
                <img
                  style={{ width: 200, height: 200 }}
                  src={imageSrc}
                  alt=""
                />
              ) : (
                <AddToPhotosIcon
                  style={{
                    width: 200,
                    height: 200,
                    color: 'rgba(120,120,120 , 0.2)',
                  }}
                />
              )}
            </div>
            <hr style={{ borderColor: 'rgba(120,120,120 , 0.2)' }} />

            <div className={styles.photo}>
              <input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <textarea
                onChange={(e) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    description: e.target.value, // category 상태 업데이트
                  }))
                }
                className={styles.description}
                value={value.description}
              />
            </div>
          </div>

          <div className={styles.category}>
            {' '}
            <select
              name="성별"
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  category: e.target.value, // category 상태 업데이트
                }))
              }
              value={value.category}
            >
              <option value="" disabled selected>
                카테고리
              </option>
              <option value={'travel'}>여행지</option>
              <option value={'phrase'}>책/글귀</option>
              <option value={'sing'}>노래</option>
              <option value={'movie_drama'}>영화/드라마</option>
              <option value={'game'}>게임</option>
              <option value={'memory'}>추억</option>
              <option value={'paint'}>그림</option>
              <option value={'idea'}>아이디어</option>
              <option value={'food'}>음식</option>
              <option value={'place'}>장소</option>
              <option value={'hobby'}>취미</option>
            </select>
          </div>
          <div className={styles.isSecret}>on/off</div>
          <button type="submit">저장하기</button>
        </form>
      </div>
    </div>
  );
}
export default UpLoadPage;
