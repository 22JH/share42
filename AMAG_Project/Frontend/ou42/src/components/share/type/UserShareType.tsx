export interface UserShareImgProps {
  preview: File | null;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface UserShareInputProps {
  value: string | number;
  handleShareInput: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  text: string;
}

export interface UserShareCategoryProps {
  options: { value: string; category: string }[];
  handleSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectValue: string
}

export interface UserShareContentProps {
  content: string;
  handleShareArea: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

export interface UserShareChoiceNameProps {
  handleShareMapNavigate: () => void;
}