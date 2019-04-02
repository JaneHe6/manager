import React from 'react';
import {Card, Form, Input, Button, message, Icon, Checkbox} from 'antd';

const FormItem = Form.Item;
class Logins extends React.Component{

    handleSubmit = ()=>{
        // 获取表单中的数值
        let userInfo = this.props.form.getFieldsValue();
        // 表单校验
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.userName} 恭喜你，你通过本次表单组件学习，你的当前密码为：${userInfo.userPwd}` )
            }
        })
    }
            
    render(){

        const { getFieldDecorator } = this.props.form;

        return(
            <div>
                <Card title="登录行内表单" className="card-wrap">
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" className="card-wrap">
                    <Form style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                        {
                                            min:5,max:10,
                                            message:'长度不在范围内'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为字母或数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                )
                            }
                            
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[]
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float:"right"}}>忘记密码</a>
                            <Button type="primary" style={{width:300}} onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                
            </div>
        );
    }
}
export default Form.create()(Logins);