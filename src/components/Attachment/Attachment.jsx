import React from "react";
import textFileIcon from "../../images/edit-files-icon.svg";
import imageFileIcon from "../../images/image-files-icon.svg";
import "./index.scss";

const iconsConfig = {
  "text/plain": textFileIcon,
  "image/jpeg": imageFileIcon,
};

export const Attachment = ({ data }) => {
  return (
    <a
      className="attachment"
      target="_blank"
      href={data?.downloadURL}
      rel="noreferrer"
    >
      <img className="icon" src={iconsConfig[data?.contentType]} alt="" />
      <h5 className="attachment__name">{data?.name.split("_")[0]}</h5>
    </a>
  );
};
