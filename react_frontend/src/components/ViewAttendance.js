import React, { Component } from "react";
import WorkerCard from "./WorkerCard";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
// import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

class ViewAttendance extends Component {
  constructor() {
    super();
    this.state = {
      name1: "",
      name2: "",
      days1: "",
      days2: "",
      location: "",
      timestamp: "",
      // user: [
      //   {
      //     name: "Zero to one",
      //     days_present: "9780804139298",
      //   },
      // ],
      // attendances: [
      //   {
      //     location: "Chennai",
      //     timestamp: "2020-08-02 15:19:02.287237+00:00",
      //   },
      // ],
    };
  }

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/user_profile/work/1/workers/`)
      .then((res) => {
        this.setState({
          name1: res.data[0].user.name,
          name2: res.data[1].user.name,
          days1: res.data[0].user.days_present,
          days2: res.data[1].user.days_present,
          location1: res.data[0].attendences[res.data[0].attendences.length-1].location,
          location2: res.data[1].attendences[res.data[1].attendences.length-1].location,
          timestamp1: res.data[0].attendences[res.data[0].attendences.length-1].timestamp,
          timestamp2: res.data[1].attendences[res.data[1].attendences.length-1].timestamp,
        });
        //   Object.keys(parsed).forEach(function (key) {
        //     console.log(parsed[key].user.name);
        //   });
        // console.log(this.state);
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="mx-2 mt-5">
      <h2>Worker Attendance</h2>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className="col-md-4">
              <Avatar
                alt="Profile"
                style={{ width: "90px", height: "90px" }}
                src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528"
              />
            </div>
            <div className="d-flex col-md-4">
              <p><strong>Worker Name:</strong> {this.state.name1}<br/>
              <strong>Days Present:</strong> {this.state.days1}<br/>
              <strong>Timestamp:</strong> {this.state.timestamp1}<br/>
              <strong>Location:</strong> {this.state.location1}</p>
            </div>
          </AccordionSummary>
          <AccordionDetails style={{ alignItems: "center" }}>
            <div className="col-md-4" />
            <div className="col-md-4">
              <Typography variant="caption">Present Percentage: 60%</Typography>
              <br />
              <Typography variant="caption">Absent Percentage: 40%</Typography>
              <br />
            </div>
            <div className="col-md-4">
              <Typography variant="caption">
                Work Region: Chennai
                <br />
                {/* <a href="#secondary-heading-and-columns" className={classes.link}>
                Learn more
              </a> */}
              </Typography>
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <div className="m-2">
              <Chip
                style={{ backgroundColor: "#357a38", color: "white" }}
                label="Active"
              />
            </div>
          </AccordionActions>
        </Accordion>
        <br/>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className="col-md-4">
              <Avatar
                alt="Profile"
                style={{ width: "90px", height: "90px" }}
                src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528"
              />
            </div>
            <div className="d-flex col-md-4">
              <p><strong>Worker Name:</strong> {this.state.name2}<br/>
              <strong>Days Present:</strong> {this.state.days2}<br/>
              <strong>Timestamp:</strong> {this.state.timestamp2}<br/>
              <strong>Location:</strong> {this.state.location2}</p>
            </div>
          </AccordionSummary>
          <AccordionDetails style={{ alignItems: "center" }}>
            <div className="col-md-4" />
            <div className="col-md-4">
              <Typography variant="caption">Present Percentage: 60%</Typography>
              <br />
              <Typography variant="caption">Absent Percentage: 40%</Typography>
              <br />
            </div>
            <div className="col-md-4">
              <Typography variant="caption">
                Work Region: Chennai
                <br />
                {/* <a href="#secondary-heading-and-columns" className={classes.link}>
                Learn more
              </a> */}
              </Typography>
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <div className="m-2">
              <Chip
                style={{ backgroundColor: "#357a38", color: "white" }}
                label="Active"
              />
            </div>
          </AccordionActions>
        </Accordion>
      </div>
    );
  }
}

export default ViewAttendance;
