import React from "react";
import Webcam from "react-webcam";
// import S3FileUpload from "react-s3";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function WebcamCapture() {
  const webcamRef = React.useRef(null);

  const [imgSrc, setImgSrc] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 450,
      height: 250,
    });
    setImgSrc(imageSrc);

    const data = { imageSrc, fileName };
    console.log(JSON.stringify({ data }));
    fetch("http://127.0.0.1:8000/user_profile/image/", {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, [webcamRef, setImgSrc, fileName]);

  return (
    <div>
      <Webcam
        audio={false}
        height={250}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={450}
        videoConstraints={videoConstraints}
      />
      <br /><br/>
      <input type="text" onChange={(e) => setFileName(e.target.value)} placeholder="User ID"/> <br/><br/>
      <button type="button" className="btn btn-primary btn-sm" style={{cursor: "pointer"}} onClick={capture}>Capture Photo</button>
      <br /><br />
      {imgSrc && <img src={imgSrc} />}<br/><br/><br/>
    </div>
  );
}
