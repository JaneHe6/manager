import React from 'react';
import {HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Main from './Main';
import About from './About';
import Topic from './Topic';
import Home from './Home';
import Info from './Info';
import NoMatch from './NoMatch';

export default class IRoute extends React.Component{
    render(){
        return(
            <Router>
                <Home>
                    <Switch>
                        <Route path="/main" render={()=>
                            <Main>
                                <Route path="/main/:mainId" component={Info}></Route>
                                {/* 其中mainId可以随意命名，与在Info中保持一致即可 */}
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route exact={true} path="/about/abc" component={About}></Route>
                        {/* 当在about组件中，只想匹配/about, 而不想匹配/about/abc时，只需给后者添加精准匹配即可 */}
                        <Route path="/topics" component={Topic}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        );
    }
}
