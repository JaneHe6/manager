import React, { Component } from 'react';
import Utils from '../../utils/utils';
import { Table } from 'antd';

export default class ETable extends Component {

    tableInit = ()=>{
        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys;
        // 选中整行
        const rowSelection={
            type:'radio',
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        // 判断分别为不需要单选或复选，需要一个多选，需要单选
        if(row_selection === false || row_selection == null){
            row_selection  = false;
        }else if(row_selection == 'checkbox'){
            rowSelection.type = 'checkbox';
        }else{
            row_selection = 'radio';
        }
        return <Table
            bordered
            {...this.props}
            rowSelection={rowSelection?rowSelection:null}
        >

        </Table>;
    }

    render() {
        return (
        <div>
            {this.tableInit()}
        </div>
        )
    }
}
