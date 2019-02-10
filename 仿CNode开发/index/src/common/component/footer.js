import React from 'react';
import { Layout } from 'antd';
const {  Footer } = Layout;
export default function FooterComponent() {
    return(
        <div className='footer-wrap'>
            <Layout className='wrap'>
                <Footer>
                    <div><span>RSS | 源码地址</span></div>
                    <div>
                        <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
                        <p>
                            <span>服务器赞助商为</span>
                            <a>
                                <img src="//static.cnodejs.org/FuIpEaM9bvsZKnQ3QfPtBHWQmLM9" width="92px"/>
                            </a>
                            <span>存储赞助商为</span>
                            <a>
                                <img src="//static.cnodejs.org/Fg0jtDIcTqVC049oVu5-sn6Om4NX" width="115px"/>
                            </a>
                            <span>由</span>
                            <a>
                                <img src="//static.cnodejs.org/FpMZk31PDyxkC8yStmMQL4XroaGD" height="54px" width="166px"/>
                            </a>
                            <span>提供应用性能服务。</span>
                        </p>
                        <p>
                            <span>新手搭建 Node.js 服务器，推荐使用无需备案的</span>
                            <a>DigitalOcean(https://www.digitalocean.com/)</a>
                        </p>
                    </div>
                </Footer>
            </Layout>
        </div>
    )
}