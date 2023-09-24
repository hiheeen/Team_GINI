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
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
  const [progress, setProgress] = useState(0);
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
        // console.log('이미지 URL', imageURL);
      };
      reader.readAsDataURL(file);
    }
  };
  // const uniqueKey = uuidv4();
  // const client = createClient({
  //   accessKey: 'bwsXS9Z0teKUNcnoZvNQ',
  //   secretKey: 'ctHagAeEtaT5bq2ly9JqmzGutvO2Mq4zUUTtZOjM',
  // });
  // const uploadFileToNaverStorage = async (file) => {
  //   try {
  //     const uploadResponse = await client.uploadFile({
  //       bucket: 'jini',
  //       key: uniqueKey,
  //       file: file,
  //     });
  //     return uploadResponse.url;
  //   } catch (error) {
  //     console.error('Naver Object Storage upload error:', error);
  //     return null;
  //   }
  // };
  const uploadImage = async () => {
    const endpoint = new AWS.Endpoint(
      'https://kr.object.gov-ncloudstorage.com',
    );
    const region = 'gov-standard';
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
    // 파일 업로드
    // try {
    //   const res = await S3.putObject({
    //     Bucket: 'jini',
    //     Key: selectedFile.name,
    //     ACL: 'public-read',
    //     Body: selectedFile,
    //   }).promise();
    //   console.log('s3 업로드 어쩌고', res);
    // } catch (err) {
    //   console.error('업로드 중 오류 발생', err);
    // }
    // 진행률 어쩌고
    S3.putObject({
      Bucket: 'jini',
      Key: selectedFile.name,
      ACL: 'public-read',
      Body: selectedFile,
    })
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));

        setTimeout(() => {
          setSelectedFile(null);
        }, 3000);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      category: value.category,
      title: value.title,
      content: value.content,
      is_secret: value.is_secret,
      file: '',
    };

    postFeedApi(cookies.access_token, formData)
      .then((res) => {
        queryClient.invalidateQueries('postFeed');
        console.log('데이터 전송 성공', res);
        // setIsOnOffState(value.is_secret);
        navigate('/');
      })
      .catch((err) => {
        console.log('데이터 전송 에러', err);
        console.log('formData', formData);
      });
  };

  const postFeedMutation = useMutation(
    (formData) => postFeedApi(cookies.access_token, formData),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: () => {
        // 새로운 쿼리를 무효화합니다.
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
            <button onClick={uploadImage}>파일 업로드</button>
            {progress !== 0 && (
              <div color="primary">업로드 진행률 : {progress}%</div>
            )}
            <div>
              <textarea
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
          <div>
            <select
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
          <button type="submit">저장하기</button>
        </form>
      </div>
    </div>
  );
}
export default UpLoadPage;
