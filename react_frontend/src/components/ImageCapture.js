import React, { Component } from 'react'
import ReactS3 from 'react-s3';

const config = {
  bucketName: "mk203devind",
  // dirName: "workers" /* optional */,
  region: "ap-south-1",
  accessKeyId: "",
  secretAccessKey: "",
  // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
};

export class ImageCapture extends Component {
    constructor() {
        super();
    }
    upload(e) {
        console.log(e.target.files[0]);
        ReactS3.uploadFile(e.target.files[0], config)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                alert(err);
            })
    }
    render() {
        return (
            <div>
                <input type="file" onChange={this.upload}/>
            </div>
        )
    }
}

export default ImageCapture
