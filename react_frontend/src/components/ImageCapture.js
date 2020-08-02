import React, { Component } from "react";
import ReactS3 from "react-s3";
require('dotenv').config();

const config = {
  bucketName: "mk203devind",
  // dirName: "workers" /* optional */,
  region: "ap-south-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
};

export class ImageCapture extends Component {
  constructor() {
    super();
    this.state = { file: null };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    console.log(e.target.files[0]);
    ReactS3.uploadFile(e.target.files[0], config)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });
  }

  render() {
    return (
      <div class="mt-5">
        <input type="file" onChange={this.onChange} />
        <img style={{ width: "100%" }} src={this.state.file} />
      </div>
    );
  }
}

export default ImageCapture;