import React from "react";

export interface UserShareImgProps {
  preview: File | null;
  setPreview: React.Dispatch<React.SetStateAction<File | null>>
  formData: FormData;
}

export interface UserShareInputProps {
  value: string | number;
  handleShareInput: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  text: string;
}

export interface UserShareCategoryProps {
  selectValue: any
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