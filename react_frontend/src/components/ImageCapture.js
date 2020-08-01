import React from "react";
import Webcam from "react-webcam";
import ReactS3Uploader from "react-s3-uploader";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function WebcamCapture() {
  const webcamRef = React.useRef(null);

  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 500,
      height: 300,
    });
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={600}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} />}
    </div>
  );
}
