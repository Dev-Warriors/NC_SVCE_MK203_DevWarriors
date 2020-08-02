import React, { Component } from "react";
import ReactS3 from "react-s3";
require("dotenv").config();

const config = {
  bucketName: "mk203devind",
  // dirName: "workers" /* optional */,
  region: "ap-south-1",
  accessKeyId: "AKIARPQ22V4BYOGPQ5ZL",
  secretAccessKey: "P0nEtch33zk2qXpri91FING8CBemGXWKqPJzovF0",
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
      file: URL.createObjectURL(e.target.files[0]),
    });
  }

  render() {
    return (
      <div className="mt-5">
        <input type="file" onChange={this.onChange} /><br/><br/>
        <img style={{ width: "500px", height: "250px" }} src={this.state.file} />
      </div>
    );
  }
}

export default ImageCapture;
