import React from 'react';
import {Card, Button, Icon, Radio} from 'antd';
import './ui.less';
import RadioGroup from 'antd/lib/radio/group';
import RadioButton from 'antd/lib/radio/radioButton';

export default class Buttons extends React.Component{

    state = {
        loading:true,
        size:'default'
    }

    handleCloseLoading(){
        this.setState({
           loading:false
        });
    }

    handleChange = (e)=>{
        this.setState({
            size:e.target.value
        });
    }

    render(){
        return(
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">bt1</Button>
                    <Button>bt2</Button>
                    <Button type="dashed">bt3</Button>
                    <Button type="danger">bt4</Button>
                    <Button disabled>bt5</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading.bind(this)}>关闭</Button>
                </Card>
                <Card title="按钮组" style={{marginBottom:10}}>
                    <Button.Group>
                        <Button type="primary"><Icon type="left" />返回</Button>
                        <Button type="primary">前进<Icon type="right" /></Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <RadioGroup className="radioG" value={this.state.size} onChange={this.handleChange}>
                        <RadioButton value="small">小</RadioButton>
                        <RadioButton value="default">中</RadioButton>
                        <RadioButton value="large">大</RadioButton>
                    </RadioGroup>
                    <Button type="primary" size={this.state.size}>bt1</Button>
                    <Button type="default" size={this.state.size}>bt2</Button>
                    <Button type="dashed" size={this.state.size}>bt3</Button>
                    <Button type="danger" size={this.state.size}>bt4</Button>
                </Card>
            </div>
        );
    }
}