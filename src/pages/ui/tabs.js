import React from 'react';
import {Card, Button, Tabs, message, Icon } from 'antd';
import './ui.less';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

const TabPane = Tabs.TabPane;

export default class Tab extends React.Component{

    newTabIndex = 0;

    handleCallback = (key)=>{
        message.info('hi,您选择了的页面是Tab' + key)
    }

    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content:'Tab 1',
                key:'1'
            },
            {
                title:'Tab 2',
                content:'Tab 2',
                key:'2'
            },
            {
                title:'Tab 3',
                content:'Tab 3',
                key:'3'
            }
        ]
        this.setState({
            // 通过设置属性值设置默认激活
            activeKey:panes[0].key,
            panes
            // 当key值和value值一致时，可简写为panes,若不一样可写作 panes:panes 。其中此处的panes为key,上一个 const panes 中的panes为value
        })
    }

    onChange = (activeKey)=>{
        this.setState({
            // 激活事件
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `AddnewTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render(){
        return(
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">content1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>content2</TabPane>
                        <TabPane tab="Tab 3" key="3">content3</TabPane>
                    </Tabs>
                </Card>
                <Card title="带图的Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">content1</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2">content2</TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3">content3</TabPane>
                        {/* 若要添加的图标在图标库中不存在，那么可以使用img来添加 */}
                    </Tabs>
                </Card>
                <Card title="控制Tab页签" className="card-wrap">
                    <Tabs 
                        // defaultActiveKey="2" 
                        // defaultActiveKey初始化选中面板的 key，如果没有设置 activeKey
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        // onChange={this.handleCallback} 
                        onEdit={this.onEdit}
                        type="editable-card">
                        {
                            this.state.panes.map((panel)=>{
                                return <TabPane 
                                    tab={panel.title}
                                    key={panel.key}
                                >{panel.content}</TabPane>
                            })
                        }
                        {/* map循环可以在箭头函数中通过return改变返回的值 */}
                    </Tabs>
                </Card>
            </div>
        );
    }
}