import React from 'react';
import {Card, Table, Modal, Button, message} from 'antd';
import axios from 'axios';
import Utils from './../../utils/utils1';
import Axios from './../../axios/index';

export default class basicTable extends React.Component{

    state={
        dataSource2:[]
    }

    params = {
        page:1
    }

    componentDidMount(){
        const dataSource = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-02-02',
                address:'上海',
                time:'07:00'
            },
            {
                id:'1',
                userName:'Ann',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-02-02',
                address:'上海',
                time:'07:00'
            },
            {
                id:'2',
                userName:'Ella',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-02-02',
                address:'上海',
                time:'07:00'
            }
        ]
        dataSource.map((item,index)=>{
            item.key = index;
        })
        this.setState({
            // dataSource:dataSource   当数据源一致时可简写，如下
            dataSource
        })
        this.request();
    }

    // 动态获取mock数据
    request = ()=>{
        let _this = this;
        let baseUrl = 'https://www.easy-mock.com/mock/5c481805d6aa6f7822d035e9/mock.api';
        axios.get(baseUrl+'/table/list',{
            params:{
                page:this.state.page
            }
        }).then((res)=>{
            if(res.status==200 && res.data.code==0){
                res.data.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    dataSource2:res.data.result.list,
                    // 让选中状态重置
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:Utils.pagination(res,(current)=>{
                        // 执行下一页callback,获取当前页码，存起来传给接口
                        _this.params.page = current;
                        this.request();
                    })
                });
            }
            // console.log(res.data.result);
        })
    }

    // 动态获取mock数据
    // request = ()=>{
    //     let _this = this;
    //     Axios.ajax({
    //         url:'/table/list',
    //         data:{
    //             params:{
    //                 page:this.params.page
    //             }
    //         }
    //     }).then((res)=>{
    //         if(res.code == 0){
    //             res.result.list.map((item,index)=>{
    //                 item.key = index;
    //                 return item;
    //             })
    //             this.setState({
    //                  dataSource2:res.result.list,
    //                 // 让选中状态重置
    //                 selectedRowKeys:[],
    //                 selectedRows:null,
    //                 pagination:Utils.pagination(res,(current)=>{
    //                     // 执行下一页callback,获取当前页码，存起来传给接口
    //                     _this.params.page = current;
    //                     _this.request();
    //                 })
    //             })
    //         }
    //     })
    // }

    


    onRowClick = (record,index)=>{
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName},用户爱好：${record.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }

    // add = ()=>{
    //     let item = this.state.selectedItem;
    //     if(item.id){
    //         // 可在其中做一些删除或修改等操作
    //     }
    // }

    
    // 多选执行删除动作,此处是一个假删除动作
    handleDelete = ()=>{
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id);
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                // 刷新动作
                this.request();
            }
        })
    }

    render(){
        const columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                key:'userName',
                dataIndex:'userName'
            },
            {
                title:'性别',
                key:'sex',
                dataIndex:'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'状态',
                key:'state',
                dataIndex:'state',
                render(state){
                    let config ={
                        '1':'棒棒哒',
                        '2':'小咸鱼',
                        '3':'好丧啊'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                key:'interest',
                dataIndex:'interest',
                render(abc){
                    let config ={
                        '1':'游泳',
                        '2':'阅读',
                        '3':'篮球',
                        '4':'绘画',
                        '5':'钢琴',
                        '6':'小提琴',
                        '7':'跑步',
                        '8':'唱歌',
                        '9':'羽毛球',
                        '10':'乒乓球',
                        '11':'爬山',
                        '12':'蹦极',
                    }
                    return config[abc];
                }
            },
            {
                title:'生日',
                key:'birthday',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                key:'address',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                key:'time',
                dataIndex:'time'
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection={
            type:'radio',
            selectedRowKeys
        }
        const rowCheckSelection={
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                // let ids = [];
                // selectedRows.map((item)=>{
                //     ids.push(item,id)
                // })
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return(
            <div>
                <Card title="基础表格" className="card-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                     />
                </Card>
                <Card title="动态数据渲染表格-Mock" className="card-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                     />
                </Card>
                <Card title="Mock-单选" className="card-wrap">
                    <Table 
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                     />
                </Card>
                <Card title="Mock-多选" className="card-wrap">
                    <Button type="primary" onClick={this.handleDelete} style={{marginBottom:10}}>删除</Button>
                    <Table 
                        bordered
                        rowSelection={rowCheckSelection}
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                     />
                </Card>
                <Card title="Mock-表格分页" className="card-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                     />
                </Card>
            </div>
        );
    }
}