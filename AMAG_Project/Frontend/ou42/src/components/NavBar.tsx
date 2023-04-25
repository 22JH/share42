/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  position: absolute;
`;

export default function NavBar() {
  const pathName = window.location.pathname;

  if (!pathName.includes("admin") || !pathName.includes("usemap")) return null;

  return (
    <>
      <div>NavBar</div>
    </>
  );
}
