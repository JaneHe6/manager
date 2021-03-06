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
            current:res.data.result.page,
            pageSize:res.data.result.page_size,
            total:res.data.result.total_count,
            showTotal:()=>{
                return `共${res.data.result.total_count}条`
            },
            // 页面跳转参数
            showQuickJumper:true
        }
    }
}