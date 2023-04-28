import clip from "../../assets/clip.svg";

const UserReportNotFIle = () => {
  return (
    <>
      <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          htmlFor="camera"
        >
          <div
            style={{
              width: "100vw",
              height: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "85vw",
                height: "6vh",
                border: "1px solid #adadad",
                borderRadius: "5px",
                lineHeight: "6vh",
                padding: "0 3vw",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "#adadad" }}>+ 파일 첨부</span>
              <img src={clip} alt="clip" />
            </div>
          </div>
        </label>
    </>
  )
}

export default UserReportNotFIle