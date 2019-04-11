import React from 'react';
import { Card, Button, Modal, Form, Radio, DatePicker, Select, Input } from 'antd';
import axios from '../../axios'
import Utils from '../../utils/utils';
import ETable from '../../components/ETable';
import BaseForm from '../../components/BaseForm';
import moment from 'moment';
import '../../style/common.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
export default class User extends React.Component{

    state = {
        list:[],
        isVisible:false
    }

    params = {
        page:1
    }

    formList=[
        {
            type:'INPUT',
            label:'用户名',
            placeholder:'请输入用户名',
            field:'user_name',
            width:120
        },{
            type:'INPUT',
            label:'用户手机',
            placeholder:'请输入用户手机号',
            field:"user_mobile",
            width:150
        },{
            type:'DATE',
            label:'入职日期',
            placeholder:'请选择入职日期',
            field:'user_date'
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
        axios.requestList(this,'/user/list',this.params,true);
    }

    handleOperate = (type)=>{
        let item = this.state.selectedItem;
        if(type == 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            })
        }else if(type == 'edit'){
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userInfo:item
            })
        }else if(type == 'detail'){
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'员工详情',
                userInfo:item
            })
        }else{
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前选中的员工',
                onOk(){
                    axios.ajax({
                        // url:'/user/delete',
                        url:'/user/list',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code == 0){
                            _this.setState({
                                isVisible:false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    // 创建员工提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            // url:type=='create'?'/user/add':'user/edit',
            url:type=='create'?'/user/list':'user/list',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code == 0){
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }

    render(){

        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){
                    return {
                        '1':'厉害了',
                        '2':'棒棒哒',
                        '3':'加油哦'
                    }[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(interest){
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
                    return config[interest];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'联系地址',
                dataIndex:'address'
            },
            {
                title:'手机号码',
                dataIndex:'mobile'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ]

        let footer = {};
        if(this.state.type == 'detail'){
            footer = {
                footer:null
            }
        }

        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    {/* 定义一个方法，通过传入不同的参数，进行不同的操作 */}
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable  
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        // pagination={this.state.pagination}
                        pagination={false}
                        selectedItem={this.state.selectedItem}
                        rowSelection={true}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>{this.userForm = inst;}} />
                </Modal>
            </div>
        );
    }
}

class UserForm extends React.Component{

    getState = (state)=>{
        return{
            '1':'厉害了',
            '2':'棒棒哒',
            '3':'加油哦'
        }[state]
    }

    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return(
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type == 'detail'? userInfo.user_name :
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.user_name
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type == 'detail'? userInfo.sex==1?'男':'女' :
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type == 'detail'? this.getState(userInfo.state) :
                        getFieldDecorator('state',{
                            initialValue:userInfo.state
                        })(
                            <Select>
                                <Option value={1}>厉害了</Option>
                                <Option value={2}>棒棒哒</Option>
                                <Option value={3}>加油哦</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type == 'detail'? userInfo.birthday :
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type == 'detail'? userInfo.address :
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址" />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);