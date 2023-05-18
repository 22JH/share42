import { useEffect } from "react";

import navStore from "./../../store/navStore";
import MapComponent from "../../components/map/MapComponent";

const AdminMap = () => {
  const { setPathTitle } = navStore();
  useEffect(() => {
    setPathTitle("관리자 맵");
  }, []);

  return (
    <>
      <MapComponent />
    </>
  );
};

export default AdminMap;
