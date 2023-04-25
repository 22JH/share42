type ButtonProps = {
  status: number;
  text: string;
};

const ShareButton = ({ status, text }: ButtonProps) => {
  let bgColor = "";
  switch (status) {
    case 0:
      bgColor = "#0cdee8";
      break;
    case 1:
      bgColor = "#6797F4";
      break;
    case 2:
      bgColor = "#9E9E9E";
      break;
    default:
      bgColor = "#0cdee8";
      break;
  }

  return (
    <button
      style={{
        width: "100px",
        height: "40px",
        fontSize: "1.1rem",
        color: "white",
        border: "none",
        borderRadius: "5px",
        backgroundColor: bgColor,
      }}
    >
      {text}
    </button>
  );
};

export default ShareButton;