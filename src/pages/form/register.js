import React from 'react';
import {Card, Button, Form, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker,Upload,Icon,message, InputNumber} from 'antd';
import moment from 'moment';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;


class Register extends React.Component{

    state = {}

    getBase64 = (img,callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg: imageUrl,
                loading: false,
            }));
        }
    }

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
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const rowObject = {minRows:3,maxRows:5};
        const offsetLayout = {
            // 这种写法和上面的formItemLayout一致，只是此处只有一个值，于是选择简化
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return(
            <div>
                <Card title="注册表单" className="card-wrap">
                    <Form>
                        <FormItem label="用户名：" {...formItemLayout}>
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
                        <FormItem label="密码：" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别：" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'1'
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄：" {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue:'18'
                                })(
                                    <InputNumber  />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态：" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue:'1'
                                })(
                                    <Select>
                                        <Option value="1">棒棒哒</Option>
                                        <Option value="2">陈独秀</Option>
                                        <Option value="3">厉害了</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好：" {...formItemLayout}>
                            {
                                getFieldDecorator('interest',{
                                    initialValue:['1','2','3']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">阅读</Option>
                                        <Option value="3">篮球</Option>
                                        <Option value="4">绘画</Option>
                                        <Option value="5">钢琴</Option>
                                        <Option value="6">小提琴</Option>
                                        <Option value="7">跑步</Option>
                                        <Option value="8">唱歌</Option>
                                        <Option value="9">羽毛球</Option>
                                        <Option value="10">乒乓球</Option>
                                        <Option value="11">爬山</Option>
                                        <Option value="12">蹦极</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚：" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried',{
                                    valuepPropName: true,
                                    initialValue:true
                                })(
                                    <Switch defaultChecked />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日：" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue: moment('2019-01-01 10:10:00')
                                })(
                                    <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址：" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:'上海市XX区XX路'
                                })(
                                    <TextArea autosize={rowObject} />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间：" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker  />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像：" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg?<img src={this.state.userImg} />:<Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('sele')(
                                    <Checkbox checked>我已阅读过<a href="">相关协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('register')(
                                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>
                
            </div>
        );
    }
}
export default Form.create()(Register);