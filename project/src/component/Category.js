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
      {/* <div style={{ padding: 10 }}>카테고리</div> */}
      <div className={styles.category_container}>
        <div className={styles.category_item}>
          <AirplanemodeActiveIcon />
          <div onClick={() => navigate('/travel')}>여행지</div>
        </div>
        <div className={styles.category_item}>
          <MenuBookOutlinedIcon />
          <div onClick={() => navigate('/phrase')}>책/글귀</div>
        </div>
        <div className={styles.category_item}>
          <MusicNoteOutlinedIcon />
          <div onClick={() => navigate('/sing')}>노래</div>
        </div>
        <div className={styles.category_item}>
          <LiveTvOutlinedIcon />
          <div onClick={() => navigate('/movie_drama')}>영화/드라마</div>
        </div>
        <div className={styles.category_item}>
          <SportsEsportsOutlinedIcon />
          <div onClick={() => navigate('/game')}>게임</div>
        </div>
        <div className={styles.category_item}>
          <LocalPostOfficeOutlinedIcon />
          <div onClick={() => navigate('/memory')}>추억</div>
        </div>
        <div className={styles.category_item}>
          <PhotoOutlinedIcon />
          <div onClick={() => navigate('/paint')}>그림</div>
        </div>
        <div className={styles.category_item}>
          <LightbulbOutlinedIcon />
          <div onClick={() => navigate('/idea')}>아이디어</div>
        </div>
        <div className={styles.category_item}>
          <LunchDiningOutlinedIcon />
          <div onClick={() => navigate('/food')}>음식</div>
        </div>
        <div className={styles.category_item}>
          <PlaceOutlinedIcon />
          <div onClick={() => navigate('/place')}>장소</div>
        </div>
        <div>
          <SurfingOutlinedIcon />
          <div onClick={() => navigate('/hobby')}>취미</div>
        </div>
      </div>
    </div>
  );
}
export default Category;
