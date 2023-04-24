/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface BranchShareInfoComponentProps {
  id: number;
  setIsOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const ModalStyle = css`
  width: 410px;
  height: calc(915px - 30px);
  background: white;
  position: fixed !important;
  top: 5vh !important;
  left: 1vw !important;
  z-index: 11 !important;
  cursor: auto !important;
`

const BranchShareInfoComponent = ({ id, setIsOpen }: BranchShareInfoComponentProps) => {
  return (
    <div css={ModalStyle}>
        <button onClick={() => setIsOpen((prevState) => ({ ...prevState, [id]: false }))}
        >닫기</button>
        <div>{/* 모달 컨텐츠 내용 */}</div>
    </div>
  );
};

export default BranchShareInfoComponent;
