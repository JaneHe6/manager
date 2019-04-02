import React from 'react';
import {Card ,Button, message} from 'antd';
import './ui.less';

export default class Messages extends React.Component{

    showMessages = (type)=>{
        message[type]('react——message')
    }

    render(){
        return(
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.showMessages('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showMessages('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.showMessages('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.showMessages('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showMessages('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}