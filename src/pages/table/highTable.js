import React from 'react';
import {Card, Table, Modal, Button, message, Badge} from 'antd';
import axios from 'axios';
import Utils from './../../utils/utils';
import './../../axios/index';

export default class basicTable extends React.Component{

    state={
        dataSource2:[]
    }

    params = {
        page:1
    }

    componentDidMount(){
        this.request();
    }

    // 动态获取mock数据
    request = ()=>{
        //自己的
        let baseUrl = 'https://www.easy-mock.com/mock/5c481805d6aa6f7822d035e9/mock.api';
        //别人的
        // let baseUrl = 'https://www.easy-mock.com/mock/5b012c1fe6e1035843cd3aff/mock.api';
        axios.get(baseUrl+'/table/high/list',{
            params:{
                page:this.state.page
            }
        }).then((res)=>{
            if(res.status==200 && res.data.code==0){
                res.data.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    dataSource2:res.data.result.list
                });
            }
        })
    }
    
	handleChange = (pagination, filters, sorter)=>{
		console.log("::" + sorter);
		this.setState({
			sortOrder: sorter.order
		})
	}

//	删除操作
	handleDelete = (item)=>{
		let id = item.id;
		Modal.confirm({
			title:'确认',
			content:'您确认要删除此条数据吗？',
			onOk:()=>{
				message.success('删除成功');
				this.request();//刷新数据
			}
		})
	}

    render(){
    	//后台有些许报错是因为key值重复的问题
        const columns = [
            {
                title:'id',
                key:'id',
                width:80,
                dataIndex:'id'
            },
            {
                title:'用户名',
                key:'userName',
                width:80,
                dataIndex:'userName'
            },
            {
                title:'性别',
                key:'sex',
                width:80,
                dataIndex:'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'状态',
                key:'state',
                width:80,
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
                width:80,
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
                width:80,
                dataIndex:'birthday'
            },
            {
                title:'地址',
                key:'address',
                width:120,
                dataIndex:'address'
            },
            {
                title:'早起时间',
                key:'time',
                width:80,
                dataIndex:'time'
            }
        ]
        
        

        const columns2 = [
            {
                title:'id',
                key:'id',
                width:80,
                fixed:'left',
                dataIndex:'id'
            },
            {
                title:'用户名',
                key:'userName',
                width:80,
                fixed:'left',
                dataIndex:'userName'
            },
            {
                title:'性别',
                key:'sex',
                width:80,
                dataIndex:'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'状态',
                key:'state',
                width:80,
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
                width:80,
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
                width:80,
                dataIndex:'birthday'
            },
            {
                title:'地址',
                key:'address',
                width:120,
                dataIndex:'address'
            },
            {
                title:'早起时间',
                key:'time',
                width:80,
                dataIndex:'time'
            },
            {
                title:'id',
                key:'id',
                width:80,
                dataIndex:'id'
            },
            {
                title:'用户名',
                key:'userName',
                width:80,
                dataIndex:'userName'
            },
            {
                title:'性别',
                key:'sex',
                width:80,
                dataIndex:'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'状态',
                key:'state',
                width:80,
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
                width:80,
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
                width:80,
                dataIndex:'birthday'
            },
            {
                title:'地址',
                key:'address',
                width:120,
                dataIndex:'address'
            },
            {
                title:'早起时间',
                key:'time',
                width:80,
                dataIndex:'time'
            },
            {
                title:'id',
                key:'id',
                width:80,
                dataIndex:'id'
            },
            {
                title:'用户名',
                key:'userName',
                width:80,
                dataIndex:'userName'
            },
            {
                title:'性别',
                key:'sex',
                width:80,
                dataIndex:'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'状态',
                key:'state',
                width:80,
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
                width:80,
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
                width:80,
                dataIndex:'birthday'
            },
            {
                title:'地址',
                key:'address',
                width:120,
                dataIndex:'address'
            },
            {
                title:'早起时间',
                key:'time',
                width:80,
                fixed:'right',
                dataIndex:'time'
            }
        ]
        
        const columns3 = [
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
                title:'年龄',
                key:'age',
                dataIndex:'age',
                sorter:(a,b)=>{
                	return a.age - b.age;
                },
                sortOrder:this.state.sortOrder
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
        
        const columns4 = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age'
            },
            {
                title:'状态',
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
                dataIndex:'interest',
                render(abc){
                	//此处徽标只是作为案例，一般可结合状态（如：正常，成功，报错，警告，进行中等等）
                    let config ={
                        '1':<Badge status="processing" text="游泳" />,
                        '2':<Badge status="processing" text="阅读" />,
                        '3':<Badge status="error" text="篮球" />,
                        '4':<Badge status="warning" text="绘画" />,
                        '5':<Badge status="default" text="钢琴" />,
                        '6':<Badge status="default" text="小提琴" />,
                        '7':<Badge status="success" text="跑步" />,
                        '8':<Badge status="warning" text="唱歌" />,
                        '9':<Badge status="success" text="羽毛球" />,
                        '10':<Badge status="error" text="乒乓球" />,
                        '11':<Badge status="warning" text="爬山" />,
                        '12':<Badge status="error" text="蹦极" />,
                    }
                    return config[abc];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'操作',
                render:(text,item)=>{//此处值得注意的是，若只是渲染值，可直接使用render函数，但此处涉及this, 需使用箭头函数
                	return <Button size="small" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
                }
            }
        ]
        
        return(
            <div>
                <Card title="头部固定" className="card-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{y:200}}
                     />
                </Card>
                <Card title="头部两侧固定" className="card-wrap">
                    <Table 
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{x:2010,y:500}}
                     />
                </Card>
                <Card title="排序" className="card-wrap">
                    <Table 
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        onChange={this.handleChange}
                     />
                </Card>
                <Card title="操作按钮" className="card-wrap">
                    <Table 
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                     />
                </Card>
            </div>
        );
    }
}