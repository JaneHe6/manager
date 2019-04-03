import React from 'react';
import {HashRouter ,Route ,Switch} from 'react-router-dom';
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
import NoMatch from './pages/nomatch';

import Common from './common';
import OrderDetail from './pages/order/detail';

export default class IRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notice" component={Notice} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tab} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousels} />
                                <Route path="/admin/form/login" component={Logins} />
                                <Route path="/admin/form/register" component={Register} />
                                <Route path="/admin/table/basicTable" component={basicTable} />
                                <Route path="/admin/table/highTable" component={highTable} />
                                <Route path="/admin/table/demoTest" component={demoTest} />
                                <Route path="/admin/city" component={City} />
                                <Route path="/admin/order" component={Order} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    }/>
                    {/* 在render后，箭头函数后接大括号需要return，不接大括号不需要return */}
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                        </Common>
                    } />
                </App>
            </HashRouter>
        );
    }
}