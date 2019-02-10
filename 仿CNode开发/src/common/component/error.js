import React from 'react';
import {Spin} from "antd";
export default function Error() {
    return (
        <div className='error-style'>
            <Spin tip='连接服务器出错,请稍后再试!'/></div>
    );
};