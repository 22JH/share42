import BottomMenuBar from "../BottomMenuBar";
import { useLocation, useNavigate } from "react-router-dom";
import UserHomeSpeedDial from "../user/UserHomeSpeedDial";

const UserCommunityBottomBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (pathname === '/user/community') {
      navigate('/user/community/reg')
    }
  }

  return (
    <div>
      {/* 하단 메뉴바 가져오기 */}
      < BottomMenuBar />
      {pathname === "/user/community" ? (
        <div 
          className="speed-dial"
          style={{ 
            position: 'absolute',
            bottom: '7%',
            right: '0%',
          }}
          onClick={handleNavigate}
        >
          <UserHomeSpeedDial />
        </div>
      ) : null}
    </div>
  )
}

export default UserCommunityBottomBar;