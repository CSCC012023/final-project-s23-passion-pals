import React, {useEffect} from 'react';
import { Container, Typography, Grow, Grid} from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import {getPosts} from './actions/posts'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import uoft from './images/uoft.png';
import useStyles from './styles';
import Post from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import Dash from './components/dashBoard'

const App = () =>{
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/home" element={<Post/>}/>
            <Route path="/dash" element={<Dash/>}/>
        </Routes>
    )
}
export default App;