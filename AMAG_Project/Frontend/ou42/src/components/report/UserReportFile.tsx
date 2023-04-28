import { UserReportFileProps } from "./type/UserReportType";
import UserReportNotFIle from "./UserReportNotFIle";

const UserReportFile = ({
  preview,
  fileName,
  handleFileInputChange,
  handleRemoveImage,
}: UserReportFileProps) => {
  return (
    <div
      style={{
        marginTop: "2vh",
        width: "100vw",
      }}
    >
      {preview ? (
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
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "#000000" }}>+ {fileName}</span>
              <div
                style={{
                  backgroundColor: "#acacac",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  textAlign: "center",
                  lineHeight: "20px",
                  color: "white",
                  fontWeight: "900",
                  fontSize: "0.8rem",
                }}
                onClick={handleRemoveImage}
              >
                <span>X</span>
              </div>
            </div>
          </div>
        </label>
      ) : (
        <UserReportNotFIle />
      )}
      <input
        id="camera"
        name="camera"
        type="file"
        accept="image/*;capture=camera"
        style={{
          display: "none",
        }}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default UserReportFile;
