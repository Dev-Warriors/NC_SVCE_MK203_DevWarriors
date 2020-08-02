import React from "react";
import Webcam from "react-webcam";
import S3FileUpload from "react-s3";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const config = {
  bucketName: "mk203devind",
  // dirName: "workers" /* optional */,
  region: "ap-south-1",
  accessKeyId: "",
  secretAccessKey: "",
  // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
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
    console.log(JSON.stringify(imageSrc));
    fetch('http://127.0.0.1:8000/images/', {
      method: 'POST',
      body: JSON.stringify(imageSrc)
    })
    .then( res => console.log(res))
    .catch(error => console.log(error))  
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
      />
      <br/>
      <button onClick={capture}>Capture photo</button>
      <br/><br/>
      {imgSrc && <img src={imgSrc} />}
    </div>
  );
}
