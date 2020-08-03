import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function DetailedAccordion() {
  const classes = useStyles();
   if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        const lat = position.coords.latitude;
        // console.log("Longitude is :", position.coords.longitude);
        document.getElementById("latitude");
      });
    }
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Avatar
              alt="Profile"
              style={{ width: "90px", height: "90px" }}
              src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528"
            />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Worker ID: 
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Days Present: 1
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Timestamp: 101
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Location: <div id="latitude"></div>
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Typography variant="caption">Present Percentage: 60%</Typography>
            <br />
            <Typography variant="caption">Absent Percentage: 40%</Typography>
            <br />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
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
