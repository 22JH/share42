import { useEffect } from "react";

import navStore from "../../store/navStore";
import MapComponent from "../../components/map/MapComponent";

const UserMap = () => {
  const { setPathTitle } = navStore();
  useEffect(() => {
    setPathTitle("유저 맵");
  }, []);

  return (
    <>
      <MapComponent />
    </>
  );
};

export default UserMap;
