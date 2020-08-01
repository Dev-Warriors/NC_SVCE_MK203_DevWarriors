import React from "react";
import Webcam from "react-webcam";
import ReactS3Uploader from "react-s3-uploader";
import S3FileUpload from "react-s3";
import base64Img from 'base64-img'

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
    // var imageExtension = imgUpload.split(';')[0].split('/');
    // imageExtension = imageExtension[imageExtension.length - 1];
    S3FileUpload.uploadFile(`${imgUpload}.${imageExtension}`, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
