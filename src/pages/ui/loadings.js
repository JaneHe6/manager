import React from 'react';
import {Card, Button, Spin, Icon, Alert} from 'antd';
import './ui.less';

export default class Loadings extends React.Component{


    render(){
        // const定义的变量值当为常量时，则不能改变；当为对象时，则可以改变
        const icon = <Icon type="loading" style={{fontSize:24}} />
        return(
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}} />
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{marginLeft:10}} />
                    {/* 通过indicator更换图标时，更换的是静态的不能旋转的图标，即使设置spinning也无法改变；除非加载的图标本身就是动态的 */}
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert 
                        message="React"
                        description="react实战课程"
                        type="info"
                    />
                    <Alert 
                        message="React"
                        description="react实战课程"
                        type="warning"
                    />
                    
                    <Spin indicator={icon}>
                        <Alert 
                            message="React"
                            description="react实战课程"
                            type="error"
                        />
                    </Spin>
                    <Spin tip="加载中……">
                        <Alert 
                            message="React"
                            description="react实战课程"
                            type="success"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}
