/**
 * Created by DaGuo on 2017/3/22.
 */

import fetch from 'isomorphic-fetch';
import {HOST} from '../constant';

//封装fetch api
const DEV = process.env.NODE_ENV == 'development';

export default function request(options = {}) {

    let method = options.method || 'GET',
        token = options.token || '',
        url = options.url,
        uri = HOST + url,
        queryString = '',
        headers = new Headers(),
        req = null,
        params = options.params || {};


    if (method == 'GET') {
        if (Object.keys(params).length) {
            for (let param in params) {
                queryString += (`${param}=${encodeURIComponent(params[param])}&`);
            }
            queryString = queryString.substring(0, queryString.length - 1);//去掉最后一个&符号
            uri = `${uri}?${queryString}`;
        }

        DEV && console.log(`GET:${uri}`);

        if (token) {
            headers.append('authorization', token);
            req = new Request(uri, {
                method,
                headers,
                mode: 'cors',
            });
        } else {
            req = new Request(uri);
        }

    } else if (
        method == 'POST' ||
        method == 'PUT' ||
        method == 'DELETE') {

        let formData = new FormData();

        if (Object.keys(params).length) {
            for (let param in params) {
                formData.append(param, params[param])
            }
        }
        if (token) {
            headers.append('authorization', token)
        }
        req = new Request(uri, {
            method,
            headers,
            mode: 'cors',
            body: formData
        });

        DEV && console.log(`${method}:${uri}:${JSON.stringify(params)}`);
    } else {
        return;
    }

    return fetch(req)
}

export function setToken(token) {
    localStorage.setItem('accessToken', token)
}

export function getToken() {
    return localStorage.getItem('accessToken')
}
export function removeToken() {
    localStorage.removeItem('accessToken')
}