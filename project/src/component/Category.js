import { useState } from 'react';
import styles from './Category.module.css';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SurfingOutlinedIcon from '@mui/icons-material/SurfingOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useNavigate } from 'react-router-dom';
function Category() {
  const [showPeoples, setShowPeoples] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div style={{ padding: 10 }}>카테고리</div>
      <div className={styles.category_container}>
        <div>
          <AirplanemodeActiveIcon />
          <div onClick={() => navigate('/travel')}>여행지</div>
        </div>
        <div>
          <MenuBookOutlinedIcon />
          <div onClick={() => navigate('/phrase')}>책/글귀</div>
        </div>
        <div>
          <MusicNoteOutlinedIcon />
          <div onClick={() => navigate('/sing')}>노래</div>
        </div>
        <div>
          <LiveTvOutlinedIcon />
          <div onClick={() => navigate('/movie_drama')}>영화/드라마</div>
        </div>
        <div>
          <SportsEsportsOutlinedIcon />
          <div onClick={() => navigate('/game')}>게임</div>
        </div>
        <div>
          <LocalPostOfficeOutlinedIcon />
          <div onClick={() => navigate('/memory')}>추억</div>
        </div>
        <div>
          <PhotoOutlinedIcon />
          <div onClick={() => navigate('/paint')}>그림</div>
        </div>
        <div>
          <LightbulbOutlinedIcon />
          <div onClick={() => navigate('/idea')}>아이디어</div>
        </div>
        <div>
          <LunchDiningOutlinedIcon />
          <div onClick={() => navigate('/food')}>음식</div>
        </div>
        <div>
          <PlaceOutlinedIcon />
          <div onClick={() => navigate('/place')}>장소</div>
        </div>
        <div>
          <SurfingOutlinedIcon />
          <div onClick={() => navigate('/hobby')}>취미</div>
        </div>
      </div>
      <div
        style={{ padding: 10 }}
        className={styles.showPeoples}
        onClick={() => setShowPeoples(!showPeoples)}
      >
        둘러보기 <span>{showPeoples ? '<<' : '>>'}</span>
      </div>
      {showPeoples ? (
        <div className={styles.showPeoples_container}>
          <div>all</div>
          <div>여행지</div>
          <div>책/글귀</div>
          <div>노래</div>
          <div>영화/드라마</div>
          <div>게임</div>
          <div>추억</div>
          <div>그림</div>
          <div>아이디어</div>
          <div>음식</div>
          <div>장소</div>
          <div>취미</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
export default Category;
