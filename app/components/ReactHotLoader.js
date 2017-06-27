/**
 * Created by DaGuo on 2017/6/27.
 */
import React from 'react';
const DEV = process.NODE_ENV =='development'
const ReactHotLoader =
    DEV
        ? require('react-hot-loader').AppContainer
        : ({ children }) => React.Children.only(children);

export default ReactHotLoader;