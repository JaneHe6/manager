import JsonP from 'jsonp';
import { Modal } from 'antd';
import axios from 'axios';
export default class Axios{
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
        let baseApi = 'https://www.easy-mock.com/mock/5c481805d6aa6f7822d035e9/mock.api';
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