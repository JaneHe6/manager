import React from 'react';
import { Row,Col } from 'antd';
import './index.less';
import Util from '../../utils/utils.js';
import axios from '../../axios';

export default class Header extends React.Component{
    state={}
    componentWillMount(){
        this.setState({
            username:'HJH'
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
    }

    getWeatherAPIData(){
        let city = '上海'
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            // debugger;
            // if(res.status){

            // }
        })
    }

    render(){
        const menuType = this.props.menuType;
        return(
            <div className="header">
                <Row className="header-top">
                {
                    menuType?
                    <Col span="6" className="logo">
                        <img src="/assets/logo-ant.png" alt='' />
                        <span>通用管理器</span>
                    </Col>:''
                }
                    
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.username}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':
                    <Row className="breadcrumb">
                        <Col span="4" className="breadcrumb-title">
                            {/* 首页 */}
                        </Col>
                        <Col span="20" className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-detail">晴转多云</span>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}