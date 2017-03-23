/**
 * Created by DaGuo on 2017/3/23.
 */

import React from 'react';
import { Router} from 'react-router';
import App from '../App';


export const routerConfig = [
    {
        path:'/',
        component: App
    }
];

export default function (history){
    return (
        <Router history = {history} routers = {routerConfig}/>
    )
}