import cameraDefault from "../../assets/cameraDefault.png";

export interface UserShareImgProps {
  preview: File | null;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const UserShareImg = ({
  preview,
  handleFileInputChange,
  handleRemoveImage,
}: UserShareImgProps) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        htmlFor="camera"
      >
        {preview ? (
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={URL.createObjectURL(preview)}
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "20px",
              }}
              alt="Thumb"
            />
            <div
              style={{
                width: "40px",
                height: "40px",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                top: "-10px",
                right: "-10px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#D14D72",
                color: "white",
                fontSize: "30px",
                fontWeight: "900",
                lineHeight: "40px",
                cursor: "pointer",
              }}
              onClick={handleRemoveImage}
            >
              X
            </div>
          </div>
        ) : (
          <img
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "20px",
            }}
            src={cameraDefault}
            alt="기본이미지"
          />
        )}
      </label>
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

export default UserShareImg;
