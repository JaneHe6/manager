import React, { Component } from 'react';
import {Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component {
    state = {
        list:[]
    }
    params = {
        page:1
    }
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'2',
            width:100,
            list:[{
                id:'0',
                name:'全部'
            },{
                id:'1',
                name:'北京'
            },{
                id:'2',
                name:'上海'
            },{
                id:'3',
                name:'广州'
            }
            ]
        },{
            type:'时间查询'
        },{
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list:[{
                id:'0',
                name:'全部'
            },{
                id:'1',
                name:'进行中'
            },{
                id:'2',
                name:'结束行程'
            }
            ]
        }
    ]
    componentDidMount(){
        this.requestList();
    }

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }

    requestList = ()=>{
        let _this = this;
        axios.requestList(this,'/order/list',this.params,true);//最后一个参数表示是否为Mock数据，前期调试设置为true，后期可删除
        // axios.ajax({
        //     url:'order/list',
        //     data:{
        //         params:{
        //             page:this.params
        //         }
        //     }
        // }).then((res)=>{
        //     let list = res.result.item_list.map((item,index)=>{
        //         item.key = index;
        //         return item;
        //     });
        //     this.setState({
        //         // list:list,//当值和value一样时，可以只写一个
        //         list,
        //         // 让选中状态重置
        //         selectedRowKeys:[],
        //         selectedRows:null,
        //         pagination:Utils.pagination(res,(current)=>{
        //             _this.params.page = current;
        //             _this.requestList();
        //         })
        //     })
        // })
    }

    // onRowClick = (record,index)=>{
    //     let selectKey = [index];
    //     Modal.info({
    //         title:'信息',
    //         content:`用户名：${record.user_name}, 用户里程：${record.distance}`
    //     })
    //     this.setState({
    //         selectedRowKeys:selectKey,
    //         selectedItem:record
    //     })
    // }
    
    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            })
            return;
        }
        //window.open打开一个新窗口
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
        // window.location.href=`/#/common/order/detail/${item.id}`
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
                dataIndex:'status',
                render(status){
                    return status==1?'进行中':'行程结束'
                }
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
    
    // const selectedRowKeys = this.state.selectedRowKeys;
    // // // 选中整行
    // const rowSelection={
    //     type:'radio',
    //     selectedRowKeys
    // }

        return (
            <div>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:20}}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable  
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        rowSelection='checkbox'
                    />
                    {/* <Table 
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
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    /> */}
                </div>
            </div>
        );           
    }
}


// class FilterForm extends React.Component{

//     render(){
//         const { getFieldDecorator } = this.props.form;
//         return(
//             <Form layout="inline">
//                 <FormItem label="城市">
//                     {
//                         getFieldDecorator('city_id')(
//                             <Select 
//                                 placeholder="全部"
//                                 style={{width:100}}    
//                             >
//                                 <Option value="">全部</Option>
//                                 <Option value="1">>北京市</Option>
//                                 <Option value="2">>上海市</Option>
//                                 <Option value="3">>广州市</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 {/* 可选择将其写在一个FormItem内 */}
//                 {/* <FormItem label="订单时间">
//                     {
//                         getFieldDecorator('start_time')(
//                             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                     {
//                         getFieldDecorator('end_time')(
//                             <DatePicker style={{marginLeft:20}} showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                 </FormItem> */}
//                 {/* 也可选择将其写在两个FormItem内 */}
//                 <FormItem label="订单时间">
//                     {
//                         getFieldDecorator('start_time')(
//                             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     {
//                         getFieldDecorator('end_time')(
//                             <DatePicker style={{marginLeft:20}} showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="订单状态">
//                     {
//                         getFieldDecorator('order_status')(
//                             <Select 
//                                 placeholder="全部"
//                                 style={{width:100}}    
//                             >
//                                 <Option value="">全部</Option>
//                                 <Option value="1">进行中</Option>
//                                 <Option value="2">结束行程</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
//                     <Button>重置</Button>
//                 </FormItem>
//             </Form>
//         );
//     }
// }
// FilterForm = Form.create({})(FilterForm);