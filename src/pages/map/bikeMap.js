import React from 'react';
import { Card, From } from 'antd';
import axios from '../../axios';
import BaseForm from '../../components/BaseForm';

export default class BikeMap extends React.Component{
    
    state = {}
    map = '';

    formList = [
        {
            type:'城市',
            width:100
        },{
            type:'时间查询'
        },{
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'0',
            width:100,
            list:[{
                id:'0',
                name:'全部'
            },{
                id:'1',
                name:'进行中'
            },{
                id:'2',
                name:'行程结束'
            }]
        }
    ]

    componentDidMount() {
      this.requestList();
    }
    

    requestList = ()=>{
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }

    // 表单查询
    handleFilterSubmit = (filterParams)=>{
        this.params = filterParams;
        this.requestList();
    }

    // 地图渲染
    renderMap = (res)=>{
        let list = res.result.route_list;
        this.map = new window.BMap.Map('container');
        // 取起点和终点
        let gps1 = list[0].split(',');
        let gps2 = list[list.length-1].split(',');
        let startPoint = new window.BMap.Point(gps1[0],gps1[1]);
        let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint,11);

        let startPointIcon = new window.BMap.Icon('/assets/start.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        })
        let endPointIcon = new window.BMap.Icon('/assets/end.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        })

        let bikeMarkerStart = new window.BMap.Marker(startPoint,{icon:startPointIcon});
        let bikeMarkerEnd = new window.BMap.Marker(endPoint,{icon:endPointIcon});

        this.map.addOverlay(bikeMarkerStart);
        this.map.addOverlay(bikeMarkerEnd);

        // 绘制行驶路线
        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]));
        })
        let polyLine = new window.BMap.Polyline(routeList,{
            strokeColor:'#e93339',
            strokeWeight:2,
            strokeOpacity:1
        })
        this.map.addOverlay(polyLine);

        // 服务区
        let serviceList = res.result.service_list;
        let servicePointList = [];
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat));
        })
        let polyServiceLine = new window.BMap.Polyline(servicePointList,{
            strokeColor:'#325eff',
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polyServiceLine);

        // 添加自行车
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon('./assets/bike.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        })
        bikeList.forEach((item)=>{
            let p = item.split(',');
            let point = new window.BMap.Point(p[0],p[1]);
            // 默认图标
            let bikeMarker = new window.BMap.Marker(point);
            // 自定义图标
            // let bikeMarker = new window.BMap.Marker(point,{icon:bikeIcon});
            this.map.addOverlay(bikeMarker);
        })

        this.addMapControl();
    }

    // 添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
    }

    render(){
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        );
    }
}