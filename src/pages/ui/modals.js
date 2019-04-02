import React from 'react';
import {Card, Button, Modal} from 'antd';
import './ui.less';

export default class Models extends React.Component{

    state = {
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false
    }

    handleOpen = (type)=>{
        this.setState({
            // showModal1:true
            [type]:true
            // 用type值替代showModal可以快速实现值的匹配，不必逐个判断。将type放在中括号中，是将type当成一个变量动态设置
        });
    }

    handleConfirm = (type)=>{
        // Modal.confirm 等同于 Modal['confirm']，故可将confirm换成type
        // 在开发中，若有一变量 var a={confirm:function()}  ，可以调用 a.confirm(); 也可以调用 a['confirm']

        Modal[type]({
            title:'确认',
            content:'react studying',
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('cancel')
            }
        })
    }

    render(){
        return(
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px弹窗</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Comfirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('warning')}>warning</Button>
                </Card>
                <Modal 
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={()=>{
                        this.setState({
                            showModal1:false
                        });
                    }}
                >
                    <p>React课程</p>
                </Modal>
                <Modal 
                    title="React"
                    visible={this.state.showModal2}
                    okText="好的"
                    cancelText="算了"
                    onCancel={()=>{
                        this.setState({
                            showModal2:false
                        });
                    }}
                >
                    <p>React课程</p>
                </Modal>
                <Modal 
                    title="React"
                    style={{top:20}}
                    visible={this.state.showModal3}
                    onCancel={()=>{
                        this.setState({
                            showModal3:false
                        });
                    }}
                >
                    <p>React课程</p>
                </Modal>
                <Modal 
                    title="React"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    onCancel={()=>{
                        this.setState({
                            showModal4:false
                        });
                    }}
                >
                    <p>水平垂直方向居中体验并不好</p>
                </Modal>
            </div>
        );
    }
}
