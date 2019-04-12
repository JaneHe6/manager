import React from 'react';
import {HashRouter ,Route ,Switch, Redirect} from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Home from './pages/home';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';
import Tab from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import Logins from './pages/form/login';
import Register from './pages/form/register';
import basicTable from './pages/table/basicTable';
import highTable from './pages/table/highTable';
import demoTest from './pages/table/demoTest';
import City from './pages/city';
import Order from './pages/order';
import User from './pages/user';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import RichText from './pages/rich';
import Permission from './pages/permission';
import NoMatch from './pages/nomatch';

import Common from './common';
import OrderDetail from './pages/order/detail';

export default class IRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                    <Route path="/login" component={Login}/>
                    {/* 在render后，箭头函数后接大括号需要return，不接大括号不需要return */}
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                        </Common>
                    } />
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/ui/buttons" component={Buttons} />
                                <Route path="/ui/modals" component={Modals} />
                                <Route path="/ui/loadings" component={Loadings} />
                                <Route path="/ui/notice" component={Notice} />
                                <Route path="/ui/messages" component={Messages} />
                                <Route path="/ui/tabs" component={Tab} />
                                <Route path="/ui/gallery" component={Gallery} />
                                <Route path="/ui/carousel" component={Carousels} />
                                <Route path="/form/login" component={Logins} />
                                <Route path="/form/register" component={Register} />
                                <Route path="/table/basicTable" component={basicTable} />
                                <Route path="/table/highTable" component={highTable} />
                                <Route path="/table/demoTest" component={demoTest} />
                                <Route path="/city" component={City} />
                                <Route path="/order" component={Order} />
                                <Route path="/user" component={User} />
                                <Route path="/bikeMap" component={BikeMap} />
                                <Route path="/echarts/bar" component={Bar} />
                                <Route path="/echarts/pie" component={Pie} />
                                <Route path="/echarts/line" component={Line} />
                                <Route path="/rich" component={RichText} />
                                <Route path="/permission" component={Permission} />
                                <Redirect to='/home' />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    }/>
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}