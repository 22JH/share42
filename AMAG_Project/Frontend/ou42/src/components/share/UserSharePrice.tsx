import { TextField } from "@mui/material";

export interface UserSharePriceProps {
  price: string;
  sharePrice: string;
  handlePrice: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  handleSharePrice: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

const UserSharePrice = ({
  price,
  sharePrice,
  handlePrice,
  handleSharePrice,
}:UserSharePriceProps) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        size="small"
        style={{
          width: "40vw",
          border: "none",
          borderBottom: "3px solid #D14D72",
          marginRight: "1.2rem",
        }}
        placeholder={"대여금액"}
        defaultValue={price}
        onBlur={handlePrice}
        autoComplete='off'
      />
      <TextField
        size="small"
        style={{
          width: "40vw",
          border: "none",
          borderBottom: "3px solid #D14D72",
        }}
        placeholder={"물품정가"}
        defaultValue={sharePrice}
        onBlur={handleSharePrice}
        autoComplete='off'
      />
    </div>
  );
};

export default UserSharePrice;
