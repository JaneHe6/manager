import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;
export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() +' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    
    pagination(res,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:res.result.page,
            pageSize:res.result.page_size,
            total:res.result.total_count,
            showTotal:()=>{
                return `共${res.result.total_count}条`
            },
            // 页面跳转参数
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = []//[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
        
    }
}