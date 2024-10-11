/**
 * Author: HoiHD
 * Created on June 03, 2020
 * Description:
 *  - Dùng để lấy dữ liệu từ DOMAIN được cấu hình trong CONFIG
 *  - Hiện tại có các phương thức: post, get. Ngoài ra sẽ phát triển thêm các phương thức khác trong tương lai.
 */
import { domain as DOMAIN } from './Configs';

import axios from 'axios';

var HTTP = {};

const client = axios.create({
    baseURL: DOMAIN,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

function post(url, options, success, failure) {
    client
        .post(url, options.body)
        .then(
            (res) => {
                if (
                    res.data.error !== undefined &&
                    res.data.error.message !== undefined
                ) {
                    failure(res.data.error.message);
                } else {
                    success(res.data);
                }
            },
            (err) => {
                failure(err.message);
            },
        )
        .catch((err) => {
            // console.log('err:', JSON.stringify());
            failure(err.message);
        });
}

function get(url, options, success, failure) {
    client
        .get(url, {
            params: options.body,
        })
        .then((res) => {
            success(res);
        })
        .catch((err) => {
            failure(err);
        });
}

function call(method, url, options, isjson, success, failure) {
    if (!url.match(/https?:\/\//)) {
        url = DOMAIN + url;
    }

    if (method.toLowerCase() === 'get') {
        get(url, options, success, failure);
    }

    if (method.toLowerCase() === 'post') {
        post(url, options, success, failure);
    }

    let request = fetch(url, options);

    if (isjson) {
        request = request.then((res) => res.json());
    }

    request.then(success).catch(failure);
}

HTTP.post = post;
HTTP.get = get;
HTTP.call = call;

export default HTTP;
