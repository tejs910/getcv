import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formAction } from "../../store/formStore";
import uploadImg from "../../assets/uploadIcon.svg";

function FileUpload() {
  const imgFileUpload = useRef();
  const dispatch = useDispatch();
  // const formData = useSelector((state) => state.formStore);
  const uploadImgFile = () => imgFileUpload.current.click();
  return (
    <div className="imageInputUpload">
      <div className="imageInputTitle">Image</div>
      <div className="fileUploader">
        <div className="fileContainer">
          <img
            src={uploadImg}
            className="uploadIcon"
            alt="Upload Icon"
            width={25}
            height={25}
          />
          <p className="">Max file size: 5mb, accepted: jpg|gif|png</p>
          <div className="errorsContainer"></div>
          <button
            type="button"
            className="chooseFileButton"
            onClick={uploadImgFile}
          >
            Choose images
          </button>
          <input
            ref={imgFileUpload}
            style={{ display: "none" }}
            type="file"
            name=""
            accept="image/*"
            onChange={(event) => {
              console.log(event.target.files[0]);
              dispatch(
                formAction.imgUpdate({
                  img: event.target.files[0],
                })
              );
              dispatch(formAction.profileCompleteStatus());
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
