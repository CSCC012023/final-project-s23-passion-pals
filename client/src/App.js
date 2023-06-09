import React, {useEffect} from 'react';
import { Container, Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {getPosts} from './actions/posts'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import uoft from './images/uoft.png';
import useStyles from './styles';

const App = ()=>{
    const classes =  useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <Container maxWidth="lg">
          <Typography className={classes.heading} variant="h2" align="center">Passion Pals</Typography>
          <img style={{ position: 'relative', top: '10px', left: '600px' }} src={uoft} alt="icon" height="60" />
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
        </Container>
      );
    };
export default App;