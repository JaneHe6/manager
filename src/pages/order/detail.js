import React, { Component } from 'react';
import {Card,Form, Select} from 'antd';
import Axios from '../../axios';
import './detail.less';
const FormItem = Form.Item;
const Option = Select.Option;
export default class Detail extends React.Component {

    state = {}
    
    componentDidMount(){
        //取route里的参数
        let orderId = this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo(orderId);
        }

    }

    getDetailInfo = (orderId)=>{
        Axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    orderInfo:res.result
                })
                this.renderMap(res.result);
            }
        })
    }

    renderMap = (result)=>{
        // id,属性
        this.map = new window.BMap.Map('orderDetailMap',{enableMapClick:false});
        this.map.centerAndZoom('上海',11);
        this.addMapControl();
        // 调用绘制路线地图方法
        this.drawBikeRoute(result.position_list);
        // 调用绘制服务区方法
        // this.drawServiceArea(result.area);
    }

    // 添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
    }

    // 绘制路线地图,参数为坐标数组
    drawBikeRoute = (positionList)=>{
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if(positionList.length>0){
            let first = positionList[0];
            let last = positionList[positionList.length-1];
            startPoint = new window.BMap.Point(first.lon,first.lat);

            // 设置图标控件，控件大小，图片大小，位置
            let startIcon = new window.BMap.Icon('/assets/start.png',new window.BMap.Size(36,42),{imageSize:new window.BMap.Size(36,42),anchor:new window.BMap.Size(36,42)});

            let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon});
            this.map.addOverlay(startMarker);

            endPoint = new window.BMap.Point(last.lon,last.lat);
            // 设置图标控件，控件大小，图片大小，位置
            let endIcon = new window.BMap.Icon('/assets/end.png',new window.BMap.Size(36,42),{imageSize:new window.BMap.Size(36,42),anchor:new window.BMap.Size(36,42)});

            let endMarker = new window.BMap.Marker(endPoint,{icon:endIcon});
            this.map.addOverlay(endMarker);

            // 连接路线图
            let trackPoint = [];
            for(let i=0;i<positionList.length;i++){
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon,point.lat));
            }
            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:'#293de3',
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint,11);

            // 绘制服务区
            let polygon = new window.BMap.Polygon(trackPoint,{
                strokeColor:'#293de3',
                strokeWeight:4,
                strokeOpacity:1,
                fillColor:'#293de3',
                fillOpacity:0.5
            })
            this.map.addOverlay(polygon);
            this.map.centerAndZoom(endPoint,11);
        }
    }

    // drawServiceArea = (positionList)=>{
    //     let trackPoint = [];
    //         for(let i=0;i<positionList.length;i++){
    //         let point = positionList[i];
    //         trackPoint.push(new window.BMap.Point(point.lon,point.lat));
    //     }

    //     let polygon = new window.BMap.Polygon(trackPoint,{
    //         strokeColor:'#293de3',
    //         strokeWeight:4,
    //         strokeOpacity:1,
    //         fillColor:'#293de3',
    //         fillOpacity:0.5
    //     })
    //     this.map.addOverlay(polygon);
    //     this.map.centerAndZoom(endPoint,11);
    // }

    render(){
        // 默认是个空值，故给个大括号Object。也可在state中先定义orderInfo
        const info = this.state.orderInfo || {};
        return(
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map">

                    </div>  
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}