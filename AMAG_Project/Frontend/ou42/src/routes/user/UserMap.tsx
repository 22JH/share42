import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MapComponent from '../../components/map/MapComponent';

const UserMap = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    console.log(pathname)
  }, [pathname])
  
  return (
    <>
      <MapComponent />
    </>
  )
}

export default UserMap