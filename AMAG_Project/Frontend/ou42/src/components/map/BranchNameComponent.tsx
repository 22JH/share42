/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from 'react';
import BranchShareInfoComponent from "./BranchShareInfoComponent";
import { useEffect } from 'react';

interface CustomOverlayContentProps {
  title: string;
  id: number;
}

const hoverDivStyle = css`
  &:hover {
    opacity: 0.5;
  }
`

const BranchNameComponent = ({ title, id }: CustomOverlayContentProps) => {
  return (
    <>
      <div
        css={hoverDivStyle}
        style={{
            backgroundColor: "#0CDEE8",
            padding: "10px",
            borderRadius: "50px",
            cursor:"pointer"
          }}
      >
        <span style={{ color: "white", fontWeight: "900", userSelect: "none", cursor:"pointer" }}>
          {title}
        </span>
      </div>
    </>
  );
};

export default BranchNameComponent;
