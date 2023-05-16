import { useBranchChoiceStore } from "../map/store/useBranchChoiceStore";
import { UserShareChoiceNameProps } from "./type/UserShareType";

const UserShareChoiceName = ({
  handleShareMapNavigate,
}: UserShareChoiceNameProps) => {
  const { branchChoice } = useBranchChoiceStore.getState();

  return (
    <>
      <div
        style={{
          width: "79vw",
          paddingLeft: "3vw",
          paddingRight: "3vw",
          height: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ADADAD",
          borderRadius: "5px",
          marginTop: "5%",
          marginLeft: "7.5%",
          marginRight: "7.5%",
          position: "relative",
        }}
        onClick={handleShareMapNavigate}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",
            width: "90%",
            color: "#ADADAD",
          }}
        >
          {branchChoice?.name ? branchChoice?.name : "장소 선택"}
        </span>
        <span
          style={{
            width: "5%",
            height: "70%",
            fontSize: "1.5rem",
            lineHeight: "100%",
          }}
        >
          {">"}
        </span>
      </div>
    </>
  );
};

export default UserShareChoiceName;
