import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import cameraDefault from "../../assets/cameraDefault.png";
import { UserShareImgProps } from "./type/UserShareType";
import swal from 'sweetalert';

const UserShareImg = ({
  preview,
  setPreview,
  formData
}: UserShareImgProps) => {
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const { state } = useLocation();

  const [detecImg, setDetecImg] = useState<boolean | null>(null);
  const [detectData, setDetectData] = useState<FormData | null>(null);
  const newDetectData = new FormData();

  const handleFileDetection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files != null && files.length > 0) {
      setPreview(files[0])
      setDetectData((prev) => {
        newDetectData.append('imgFile', files[0]);
        newDetectData.append('category', state)
        return newDetectData
      });
      setDetecImg(true)
    }
  };

  useEffect(() => {
    if (detecImg === true) {
      fetch('http://www.share42-together.com:8088/api/common/detection', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: detectData
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'SUCCESS') {
          if (preview) {
            formData.append('imgFile', preview)
          }
          formData.append('category', state)
          setDetecImg(false)
        } else {
          setPreview(null)
          setDetecImg(false)
        }
      })
      .catch((error) => console.log(error))
    }

    else if (detecImg === false) {
      fetch('http://www.share42-together.com:8088/api/common/detection', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: detectData
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'SUCCESS') {
          if (preview) {
            formData.append('imgFile', preview)
          }
          formData.append('category', state)
          swal("Detection Clear", "이미지를 검증 완료 했습니다.", "success");
          setDetecImg(false)
        } else {
          setPreview(null)
          setDetecImg(false)
          swal("Detection error", "이미지 검증에 실패 했습니다.", "error");
        }
      })
      .catch((error) => console.log(error))
    }
  }, [state, formData, detectData, preview, detecImg, token, setPreview])

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
            {/* <div
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
            </div> */}
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
        onChange={handleFileDetection}
      />
    </div>
  );
};

export default UserShareImg;
