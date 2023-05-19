export interface UserReportAreaProps {
  content: string;
  handleShareArea: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

export interface UserReportCategoryProps {
  handleSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: {
    value: string;
    category: string;
  }[];
  stationLst?: {
    address: string;
    id: number;
    name: string;
  }[];
  lockerLst?: {
    id: number;
    lockerNumber: number;
  }[]
  category: string;
  title: string;
  typeSelect?: number;
}

export interface UserReportFileProps {
  preview: File | null;
  fileName?: string;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface UserReportTitleProps {
  value: string;
  handleShareInput: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  text: string;
}
