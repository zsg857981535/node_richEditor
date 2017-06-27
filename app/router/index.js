/**
 * Created by DaGuo on 2017/3/23.
 */

import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import App from '../App';


export default function () {
    return (
        <Router>
            <Route path="/" component={App}/>
        </Router>
    )
}