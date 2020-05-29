import React from "react";
import "./audioPage.css";

const AudioPage = () => {
  return (
    <>
    <div className="new-releases">
      <div className="new-releases__title">
        <h3 className="new-releases__title-text">All music </h3>
        <a href="#" className="show-all-link">
          show all
          <i className="icon-angle-right icon-angle-right_ml"></i>
        </a>
        <div className="playlist">
          <img src={`./uploads/img/5bf8b514-3273-4dac-85fa-3e568ea6da3d_para.jpg`} alt="Song"/>
        </div>
      </div>
    </div>
  </>
  );
};

export default AudioPage;
