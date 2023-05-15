import React from "react";

export interface EventMarkerComponentProps {
  marker: markerProps;
  position: positionProps;
  setIsOpenMap?: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export interface CustomOverlayMapComponentProps {
  marker: markerProps;
  position: positionProps;
  setIsOpenMap?: React.Dispatch<React.SetStateAction<boolean | null>>;
  pathname?: string;
  isOpen: Record<string, boolean>;
  isVisible: Record<string, boolean>;
  handleMarkerInfo: (id: number) => void;
  setIsVisible?: any
  setIsOpen?: any
  markerId?: any;
}

export interface positionProps {
  lat: number;
  lng: number;
}

export interface markerProps {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface MapComponentProps {
  setIsOpenMap?: React.Dispatch<React.SetStateAction<null | boolean>>;
}

export interface MarkerDetailShareInfoComponentProps {
  id: number;
  handleMarkerInfo: (id: number) => void;
  address: string;
  name: string;
  markerInfo: any;
}

export interface CustomOverlayContentProps {
  markerInfo: {
    lockerNumber: number;
    error: boolean;
    shareArticleAccountNickname: string;
    shareArticleId: number;
    shareArticleName: string;
    shareArticleSharePrice: number;
    shareArticleShareStatus: number;
    shareArticleUptDt: string;
  };
}

export interface MarkerShareInfoComponentProps {
  marker: markerProps;
  handleMarkerInfo: (id: number) => void;
  setIsOpenMap?: React.Dispatch<React.SetStateAction<null | boolean>>;
  name: string;
  totalCount: number;
  useCount: number;
  setIsVisible?: any;
  setIsOpen?: any;
  markerId?: any;
  position?: any;
}

export interface ButtonProps {
  status: number;
  text: string;
  articleId: number;
}

export interface UserShareMapProps {
  setIsOpenMap: React.Dispatch<React.SetStateAction<null | boolean>>;
}
