import React, { Component } from "react";
// import { CameraFeed } from './CameraFeed';
import ImageCapture from "./ImageCapture";

export default class ImageUpload extends Component {

  render() {
    return (
      <div>
        <h1>Image Upload Page</h1>
        <ImageCapture />
      </div>
    );
  }
}

// export default ImageUpload;
