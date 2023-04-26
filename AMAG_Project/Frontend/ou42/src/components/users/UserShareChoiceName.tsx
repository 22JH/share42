import { useStore } from "../map/store/useStore";

export interface UserShareChoiceNameProps {
  handleShareMapNavigate: () => void;
}

const UserShareChoiceName = ({
  handleShareMapNavigate,
}: UserShareChoiceNameProps) => {
  const { branchChoice } = useStore.getState();

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
            width: "25%",
            color: "#ADADAD",
          }}
        >
          장소 선택
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
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            color: branchChoice ? "#000000" : "#ADADAD",
          }}
        >
          { branchChoice ? branchChoice : '지점 미선택' }
        </span>
      </div>
    </>
  );
};

export default UserShareChoiceName;
