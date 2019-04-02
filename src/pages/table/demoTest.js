import React from 'react';
import {Card, Table, Button} from 'antd';
import './../ui/ui.less';


const colums = [
    {
        title:'Name',
        dataIndex:'name'
    },
    {
        title:'Age',
        dataIndex:'age'
    },
    {
        title:'Address',
        dataIndex:'address'
    }
];
const data = [];
for(let i=0;i<26;i++){
    data.push({
        key:i,
        name:`Edward King ${i}`,
        age:32,
        address:`London,Park Lane no.${i}`
    });
}
export default class demoTest extends React.Component{
    
    state = {
        selectedRowKeys:[],
        loading:false
    }

    start = ()=>{
        this.setState({
            loading:true
        })
        setTimeout(()=>{
            this.setState({
                selectedRowKeys:[],
                loading:false
            });
        },1000);
    }

    onSelectChange = (selectedRowKeys)=>{
        console.log('selectedRowKeys changed:',selectedRowKeys);
        this.setState({
            selectedRowKeys
        })
    }

    render(){
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange
        };
        const hasSelected = selectedRowKeys.length>0;

        return(
            <div>
                <Card title="测试表格" className="card-wrap">
                    <div style={{marginTop:16}}>
                        <Button
                            type="primary"
                            onClick={this.start}
                            disabled={!hasSelected}
                            loading={loading}
                        >
                        Reload
                        </Button>
                        <span>
                            {hasSelected?`Selected ${selectedRowKeys.length} items`:''}
                        </span>
                    </div>
                    <Table 
                        rowSelection={rowSelection}
                        columns={colums}
                        dataSource={data}
                    ></Table>
                </Card>
            </div>
        );
    }
}