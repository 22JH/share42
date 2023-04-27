export interface EventMarkerComponentProps {
  marker: markerProps;
  position: positionProps;
  setIsOpenMap?: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export interface CustomOverlayMapComponentProps {
  marker: markerProps;
  position: positionProps;
  setIsOpenMap?:
    | React.Dispatch<React.SetStateAction<boolean | null>>;
  pathname?: string;
  isOpen: Record<string, boolean>;
  isVisible: Record<string, boolean>;
  handleMarkerInfo: (id: number) => void;
}

export interface positionProps {
  lat: number;
  lng: number;
}

export interface markerProps {
  id: number;
  content: string;
  address: string;
  lat: number;
  lng: number;
  cabinetCnt: number;
  cabinetUse: number;
}

export interface MapComponentProps {
  setIsOpenMap?: React.Dispatch<React.SetStateAction<null | boolean>>;
}

export interface MarkerDetailShareInfoComponentProps {
  id: number;
  handleMarkerInfo: (id: number) => void;
  address: string;
  name: string;
}

export interface CustomOverlayContentProps {
  markerInfo: {
    id: number;
    userid: string,
    title: string,
    price: number,
    status: number,
    branchname: string,
    address: string
  }
}

export interface MarkerShareInfoComponentProps {
  marker: markerProps;
  handleMarkerInfo: (id: number) => void;
  setIsOpenMap?: React.Dispatch<React.SetStateAction<null | boolean>>;
}

export interface ButtonProps {
  status: number;
  text: string;
};

export interface UserShareMapProps {
  setIsOpenMap: React.Dispatch<React.SetStateAction<null | boolean>>
}


