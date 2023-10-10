import { useState } from 'react';
import styles from './UpLoadPage.module.css';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { postFeedApi } from '../../apis/api';
import { useRecoilState } from 'recoil';
import { onOffState } from '../../recoil/onOff';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import AWS from '@aws-sdk/client-s3';
import { PutBucketCorsCommand, S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';

import { v4 as uuidv4 } from 'uuid';
function UpLoadPage() {
  const [isOnOffState, setIsOnOffState] = useRecoilState(onOffState);

  const [value, setValue] = useState({
    title: '',
    photo: '',
    content: '',
    category: '',
    is_secret: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [cookies] = useCookies(['access_token', 'refresh_token']);
  const queryClient = useQueryClient();
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
        const imageURL = result;
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadImage = async () => {
    const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
    const region = 'kr-standard';
    const access_key = 'bwsXS9Z0teKUNcnoZvNQ';
    const secret_key = 'ctHagAeEtaT5bq2ly9JqmzGutvO2Mq4zUUTtZOjM';
    const S3 = new AWS.S3({
      endpoint: endpoint,
      region: region,
      credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_key,
      },
    });
    try {
      const res = await S3.putObject({
        Bucket: 'jini',
        Key: selectedFile.name,
        ACL: 'public-read',
        Body: selectedFile,
      }).promise();
      // console.log('s3 업로드 어쩌고', res);
    } catch (err) {
      throw err;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
    const region = 'kr-standard';
    const access_key = 'bwsXS9Z0teKUNcnoZvNQ';
    const secret_key = 'ctHagAeEtaT5bq2ly9JqmzGutvO2Mq4zUUTtZOjM';
    const S3 = new AWS.S3({
      endpoint: endpoint,
      region: region,
      credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_key,
      },
    });
    if (value.category === '') {
      alert('카테고리를 선택해주세요');
    } else if (value.title === '') {
      alert('제목을 입력해주세요');
    } else if (value.content === '') {
      alert('콘텐츠를 작성해주세요');
    } else if (value.is_secret === '') {
      alert('on/off 여부를 선택해주세요');
    } else if (selectedFile === null) {
      alert('이미지를 업로드해주세요');
    } else {
      try {
        const res = await S3.putObject({
          Bucket: 'jini',
          Key: selectedFile.name,
          ACL: 'public-read',
          Body: selectedFile,
        }).promise();
        // console.log('s3 업로드 어쩌고', res);
        const encodedKey = encodeURIComponent(selectedFile.name);
        const formData = {
          category: value.category,
          title: value.title,
          content: value.content,
          is_secret: value.is_secret,
          file: `https://kr.object.ncloudstorage.com/jini/${encodedKey}`,
        };

        postFeedApi(cookies.access_token, formData)
          .then((res) => {
            queryClient.invalidateQueries('postFeed');
            // console.log('데이터 전송 성공', res);
            navigate('/');
          })
          .catch((err) => {
            // console.log('데이터 전송 에러', err);
            // console.log('formData', formData);
          });
      } catch (err) {
        throw err;
      }
    }
  };

  const postFeedMutation = useMutation(
    (formData) => postFeedApi(cookies.access_token, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('postFeed');
      },
    },
  );

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  title: e.target.value, // title 상태 업데이트
                }))
              }
              className={styles.title}
              placeholder="제목을 입력하세요"
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
              <label htmlFor="fileInput" className={styles.customFileInput}>
                이미지 업로드
              </label>
              <input
                id="fileInput"
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            <div>
              <textarea
                placeholder="내용을 입력하세요"
                onChange={(e) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    content: e.target.value, // content 상태 업데이트
                  }))
                }
                className={styles.description}
                value={value.content}
              />
            </div>
          </div>
          <div className={styles.select_zone}>
            <div>
              {' '}
              <select
                className={styles.category}
                onChange={(e) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    category: e.target.value, // category 상태 업데이트
                  }))
                }
                value={value.category}
              >
                <option value="" disabled>
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
            <div>
              <select
                className={styles.category}
                onChange={(e) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    is_secret: e.target.value, // is_secret 상태 업데이트
                  }))
                }
                value={value.is_secret}
              >
                <option value="" disabled selected>
                  on/off
                </option>
                <option value="true">on</option>
                <option value="false">off</option>
              </select>
            </div>
            <button className={styles.submit_btn} type="submit">
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpLoadPage;
