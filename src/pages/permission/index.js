import React from 'react';
import { Card, Button, Modal, Form, Radio, DatePicker, Select, Input, Tree, Transfer } from 'antd';
import ETable from '../../components/ETable';
import Utils from '../../utils/utils';
import axios from '../../axios';
import menuConfig from '../../config/menuConfig';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class Permission extends React.Component{

    state ={
        isRoleVisible:false,
        list:[],
        isPermission:false,
        isUserVisible:false
    }
    
    componentDidMount(){
        axios.requestList(this,'/role/list',{});
    }

    // 创建提交
    handleRoleSubmit = ()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url:'role/create',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isRoleVisible:false
                })
                this.roleForm.props.form.resetFields();
                axios.requestList(this,'/role/list',{});
            }
        })
    }

    handleRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }

    // 权限设置
    handlePermission = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                content:'请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermission:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }

    handlePermEditSubmit = ()=>{
        let data = this.permEditForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url:'/permission/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isPermission:false
                })
                axios.requestList(this,'/role/list',{});
            }
        })
        
    }

    // 用户授权
    handleUserAuth = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                content:'请选择一个角色'
            })
            return;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
        this.getRoleUserList(item.id)
    }

    getRoleUserList = (id)=>{
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.getAuthUserList(res.result);
            }
        })
    }

    getAuthUserList = (dataSource)=>{
        const mockData = [];
        const targetKeys = [];
        let dataSource2 = dataSource.item_list;
        if(dataSource2 && dataSource2.length>0){
            for(let i=0;i<dataSource2.length;i++){
                const data = {
                    key:dataSource2[i].id,
                    title:dataSource2[i].user_name,
                    status:dataSource2[i].status
                }
                if(data.status == 1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }
    
    // 授权提交
    handleUserSubmit = ()=>{
        let data = {}
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isUserVisible:false
                })
                axios.requestList(this,'/role/list',{});
            }
        })
    }

    render(){

        const columns = [
            {
                title:'角色ID',
                dataIndex:'id'
            },{
                title:'角色名称',
                dataIndex:'role_name'
            },{
                title:'创建时间',
                dataIndex:'create_time'
            },{
                title:'使用状态',
                dataIndex:'status',
                render(status){
                    return status == 1?'启用':'停用'
                }
            },{
                title:'授权时间',
                dataIndex:'authorize_time',
                render: Utils.formateDate
            },{
                title:'授权人',
                dataIndex:'authorize_user_name'
            }
        ]
        
        return(
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handleGetText} onClick={this.handlePermission} style={{marginRight:10,marginLeft:10}}>设置权限</Button>
                    <Button type="primary" onClick={this.handleClearContent} onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        dataSource={this.state.list}
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        rowSelection='radio'
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst} />
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermission}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermission:false
                        })
                    }}
                >
                    {/* <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst} /> */}
                    <PermEditForm 
                        detailInfo={this.state.detailInfo} 
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo ={(checkedKeys)=>{
                            this.setState({
                                menuInfo:checkedKeys
                            })
                        }}
                        wrappedComponentRef={(inst)=>this.permEditForm=inst}
                        />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible:false
                        })
                    }}
                >
                    <RoleAuthForm 
                        detailInfo={this.state.detailInfo} 
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        wrappedComponentRef={(inst)=>this.userAuthForm=inst}
                        patchUserInfo={(targetKeys)=>{
                            this.setState({
                                targetKeys
                            })
                        }}
                        />
                </Modal>
            </div>
        );
    }
}

class RoleForm extends React.Component{

    getState = (state)=>{
        return{
            '1':'厉害了',
            '2':'棒棒哒',
            '3':'加油哦'
        }[state]
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status')(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);


class PermEditForm extends React.Component{

    renderTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }else{
                // 两种方式都可以
                // return <TreeNode title={item.title} key={item.key} />  
                return <TreeNode {...item}/>
            }
        })
    }

    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys);
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const detail_Info = this.props.detailInfo;
        const menu_Info = this.props.menuInfo;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input type="text" placeholder={detail_Info.role_name} disabled />
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue:1
                        })(
                            <Select>
                                <Option value={1}>启用</Option>
                                <Option value={2}>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{
                        this.onCheck(checkedKeys);
                    }}
                    checkedKeys={menu_Info}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}
PermEditForm = Form.create({})(PermEditForm);


class RoleAuthForm extends React.Component{

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }

    handleChange = (targetKeys)=>{
        this.props.patchUserInfo(targetKeys)
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:17}
        }
        const detail_Info = this.props.detailInfo;
        const menu_Info = this.props.menuInfo;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input type="text" placeholder={detail_Info.role_name} disabled />
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer 
                        dataSource={this.props.mockData}
                        titles={['待选用户','已选用户']}
                        searchPlaceholder="请输入用户名"
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        render={item=>item.title}
                        listStyle={{width:200,height:400}}
                        onChange={this.handleChange}
                    />
                </FormItem>
            </Form>
        );
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);