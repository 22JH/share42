import { useNavigate } from "react-router";
import { ButtonProps } from "./type/MapType";

const MapButtonComponent = ({ status, text, articleId }: ButtonProps) => {
  let bgColor = "";
  let color = "";

  const navigate = useNavigate();  
  switch (status) {
    case 0:
      bgColor = "#00ff44";
      color = "#006315";
      break;
    case 1:
      bgColor = "#00f7ff";
      color = "#13565c";
      break;
    case 2:
      bgColor = "#c9c9c9";
      color = "#343434";
      break;
    case 3:
      bgColor = "#ff2f00";
      color = "#ffffff";
      break;
    case 4:
      bgColor = "#0073ff";
      color = "#ffffff";
      break;
    case 5:
      bgColor = "#c9c9c9";
      color = "#343434";
      break;
    default:
      bgColor = "#c9c9c9";
      color = "#343434";
      break;
  }

  const handleShareNavigate = () => {
    navigate(`/user/share-post/${articleId}`)
  }

  return (
    <button
      style={{
        width: "100px",
        height: "40px",
        fontSize: "1.1rem",
        color: color,
        fontWeight: '900',
        border: "none",
        borderRadius: "5px",
        backgroundColor: bgColor,
      }}
      onClick={handleShareNavigate}
    >
      {text}
    </button>
  );
};

export default MapButtonComponent;
