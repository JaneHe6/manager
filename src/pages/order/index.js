import React, { Component } from 'react';
import {Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd';
import axios from 'axios';
import Axios from '../../axios';
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component {
    state = {
        list:[]
    }
    params = {
        page:1
    }

    componentDidMount(){
        this.requestList();
    }

    requestList = ()=>{
        let _this = this;
        Axios.ajax({
            url:'order/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item,index)=>{
                item.key = index;
                return item;
            });
            this.setState({
                // list:list,//当值和value一样时，可以只写一个
                list,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    render() {

        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance'
            },
            {
                title:'行驶时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status'
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'total_fee'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay'
            }
        ]

        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button>订单详情</Button>
                    <Button>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
        );           
    }
}


class FilterForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select 
                                placeholder="全部"
                                style={{width:100}}    
                            >
                                <Option value="">全部</Option>
                                <Option value="1">>北京市</Option>
                                <Option value="2">>上海市</Option>
                                <Option value="3">>广州市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                {/* 可选择将其写在一个FormItem内 */}
                {/* <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker style={{marginLeft:20}} showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem> */}
                {/* 也可选择将其写在两个FormItem内 */}
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker style={{marginLeft:20}} showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('status')(
                            <Select 
                                placeholder="全部"
                                style={{width:100}}    
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);