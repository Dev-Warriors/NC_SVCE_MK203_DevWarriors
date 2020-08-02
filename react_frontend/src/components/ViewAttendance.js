import React, { Component } from "react";
import WorkerCard from "./WorkerCard";

class ViewAttendance extends Component {
    constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("localhost:8000/work/:id/workers")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {console.log(data)});
  }

  render() {
    return (
      <div className="mx-2 mt-5">
        <WorkerCard value="xyz" />
      </div>
    );
  }
}

export default ViewAttendance;
