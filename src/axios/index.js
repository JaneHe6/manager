import JsonP from 'jsonp';
import { Modal } from 'antd';
import axios from 'axios';
import Utils from '../utils/utils';
export default class Axios{

    static requestList(_this,url,params,isMock){
        var data = {
            params:params,
            isMock
        }
        // key值和value值相等时，可只写一个
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                });
                _this.setState({
                    // list:list,//当值和value一样时，可以只写一个
                    list,
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    static jsonp(options){
        return new Promise((resolve,reject) => {
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                // debugger;
                if(response.status == 'success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = '';
        if(options.isMock){//若为true放置easyMock的接口地址，否则放置服务端的接口地址，此处暂设置为一致
            baseApi = 'https://www.easy-mock.com/mock/5c481805d6aa6f7822d035e9/mock.api';
        }else{
            baseApi = 'https://www.easy-mock.com/mock/5c481805d6aa6f7822d035e9/mock.api';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status == '200'){
                    let res = response.data;
                    if(res.code == '0'){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}