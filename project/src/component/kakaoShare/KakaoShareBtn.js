import { faPaperPlane, faPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

function KakaoShareBtn({ imgFile }) {
  const realUrl = 'https://www.jinii.shop';
  const resultUrl = window.location.href;
  const shareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('8609afb6c55303d6574ec0790adfdaf8');
      }
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'on&off', // 직접 쓴 제목?
          description: '소중한 나의 기록', // 직접 쓴 글로?
          imageUrl: imgFile,
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },

        buttons: [
          {
            title: '웹으로 이동',
            link: {
              mobileWebUrl: realUrl,
              webUrl: realUrl,
            },
          },
        ],
      });
    }
  };
  return (
    <div style={{ marginRight: 10 }}>
      <FontAwesomeIcon
        icon={faPaperPlane}
        className=""
        onClick={() => {
          shareKakao();
        }}
      >
        카카오톡 공유하기
      </FontAwesomeIcon>
    </div>
  );
}
export default KakaoShareBtn;
