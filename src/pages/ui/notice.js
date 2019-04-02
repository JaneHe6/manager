import React from 'react';
import {Card, Button, notification} from 'antd';
import './ui.less';

export default class Notice extends React.Component{

    openNotification = (type,direction)=>{
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:'success!!!',
            description:'春运到了'
        });
        // notification.info({
        //     message:'success!!!',
        //     description:'春运到了'
        // });
        // notification.warning({
        //     message:'success!!!',
        //     description:'春运到了'
        // });
        // notification.error({
        //     message:'success!!!',
        //     description:'春运到了'
        // });
    }

    render(){
        return(
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="方向位通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>topLeft</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>topRight</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning','bottomRight')}>bottomRight</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error','bottomLeft')}>bottomLeft</Button>
                </Card>
            </div>
        );
    }
}
