import React from 'react';
import { Link } from 'react-router-dom';

export default class Main extends React.Component{
    render(){
        return(
            <div>
                    this is main3 page.<br />
                    <Link to="/main/test-id">子路由1</Link><br />
                    <Link to="/main/456">子路由2</Link><br />
                    <Link to="/main/111">子路由3</Link>
                    <hr />
                    {this.props.children}
            </div>
        );
    }
}
