import React from 'react';

export default class Info extends React.Component{
    render(){
        return(
            <div>
                    this is Info page.动态路由值是：
                    {this.props.match.params.mainId}
            </div>
        );
    }
}
