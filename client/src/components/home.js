import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Container, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import Posts from "./Posts/Posts";
import Form from "./Form/Form";
import uoft from "../images/uoft.png";
import useStyles from "../styles";

// The Post component displays the main page with posts and a form
function Post() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the posts on component mount
    dispatch(getPosts());
  }, [dispatch]);
//   The above code defines the Post component, which represents the main page displaying posts and a form. It imports necessary dependencies and components from React,
//    React Router, Material-UI, and Redux. The component uses the useStyles hook to apply styles, and the useDispatch hook to dispatch actions. 
  return (
    <Container maxWidth="lg">
      <Typography className={classes.heading} variant="h2" align="center">
        Passion Pals
      </Typography>
      <img
        style={{ position: "relative", top: "10px", left: "600px" }}
        src={uoft}
        alt="icon"
        height="60"
      />
      <Grow in>
        <Container>
          <Grid container justifyContent="center" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={4}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      {/* <Link to="/login">Login Page</Link> */}
    </Container>
  );
}

export default Post;
