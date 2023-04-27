import MapComponent from "../map/MapComponent";
import { UserShareMapProps } from "../map/type/MapType";

const UserShareMap = ({ setIsOpenMap }: UserShareMapProps) => {
  return (
    <>
      <MapComponent setIsOpenMap={setIsOpenMap} />
    </>
  );
};

export default UserShareMap;
