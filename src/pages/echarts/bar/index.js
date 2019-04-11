import React from 'react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';
// import echarts from 'echarts';导入有图表过大
// 按需加载
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default class Bar extends React.Component{

    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme);
    }

    getOption = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,3000,4000,2000,8000,900,5000]
                }
            ]
            
        } 
        return option;
    }

    getOption2 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            legend:{
                data:['ofo','摩拜','哈啰']
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'ofo',
                    type:'bar',
                    data:[100,300,400,200,800,900,500]
                },
                {
                    name:'摩拜',
                    type:'bar',
                    data:[500,200,700,100,700,900,500]
                },
                {
                    name:'哈啰',
                    type:'bar',
                    data:[400,300,900,200,840,900,500]
                }
            ]
        } 
        return option;
    }
    
    render(){
        return(
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption()}theme="Imooc" style={{height:500}} />
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()}theme="Imooc" style={{height:500}} />
                </Card>
            </div>
        );
    }
}