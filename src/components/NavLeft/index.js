import React from 'react';
import MenuConfig from './../../config/menuConfig';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action';
import "./index.less";

const SubMenu = Menu.SubMenu;


export default class NavLeft extends React.Component {

    state={
        currentKey:''
    }

    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        // let currentKey = window.location.hash.replace('#','');
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState({
            currentKey,
            menuTreeNode
        })
    }

    //菜单渲染
    renderMenu = (data)=>{
        return data.map((item) => {
            if(item.children){
                return(
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }

    handleClick = (item)=>{
        // console.log(item);
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));
        this.setState({
            currentKey:item.key
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.png" alt="" />
                    <h1>后台管理系统</h1>
                </div>
                <Menu 
                    theme="dark" 
                    // selectedKeys={[this.state.currentKey]}
                    // onClick={this.handleClick}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}

// export default connect()(NavLeft);