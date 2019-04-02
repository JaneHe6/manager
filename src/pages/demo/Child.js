import React from 'react'
 
 export default class Child extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             count:0
         };
     }

     //WARNING! To be deprecated in React v17. Use componentDidMount instead.
     componentWillMount() {
         console.log('will Mount');
     }

     componentDidMount() {
         console.log('did mount');
     }

     componentWillReceiveProps(newProps){
         console.log('will props' + newProps.name);
     }

     
     shouldComponentUpdate() {
         console.log('should update');
         return true;
     }

    componentWillUpdate() {
        console.log('will update');
    }

    componentDidUpdate() {
        console.log('did update');
    }

     render(){
         return <div>
            <p>以下是子组件测试生命周期</p>
            <p>{this.props.name}</p>
         </div>
     }
 }