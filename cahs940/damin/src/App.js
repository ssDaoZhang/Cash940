// import React, { Component } from 'react';
// import {Link, BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom';
// import Login from './routers/Login/Login';
// import Admin from './routers/Admin/Admin';
// import Handexcel from './routers/Handexcel/Handexcel';
// import Appl from './Test';
// class App extends Component {
//   render() {
//     return (
//       <Router>
//         {/* <Switch> */}
//         <div>
//           <Route path="/handata"  exact component={Handexcel}/>
//           <Route path="/"  exact component={Login}/>
//           <Route path="/login2"  exact component={Appl}/>
//           <Route path="/admin"  component={Admin}/>
//         </div>
//         {/* </Switch> */}
//       </Router>
//       // <Appl/>
//     );
//   }
// }

import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import { IndexRoute } from 'react-router';
// import './App.css';
import Topics from './Test';
import Login from './routers/Login/Login';
import Admin from './routers/Admin/Admin'; 
import NavList from './components/NavList/NavList';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      resData : ''
    }
    this.listmess1 = [
        { item : '上级项目1', url : '/sx1', cflag: 'sx1', itemChild : [
          {item : '下级项目1', url : '/sx11'},
          {item : '下级项目3', url : '/sx13'},
          {item : '下级项目4', url : '/sx14'},
          {item : '下级项目5', url : '/sx16'}        
        ]},
        { item : '上级项目2', url : '/sx2', cflag: 'sx2', itemChild : [
          {item : '下级项目1', url : '/sx21'},
          {item : '下级项目3', url : '/sx23'},
          {item : '下级项目4', url : '/sx24'},
          {item : '下级项目5', url : '/sx26'}        
        ]},
        { item : '上级项目3', url : '/sx3', cflag: 'sx3', itemChild : [
          {item : '下级项目1', url : '/sx31'},
          {item : '下级项目3', url : '/sx33'},
          {item : '下级项目4', url : '/sx34'},
          {item : '下级项目5', url : '/sx36'}        
        ]},
        { item : '上级项目4', url : '/sx4', cflag: 'sx4'},
        { item : '上级项目5', url : '/sx5', cflag: 'sx5'},
        { item : '上级项目6', url : '/sx6', cflag: 'sx6', itemChild : [
          {item : '下级项目1', url : '/sx61'},
          {item : '下级项目3', url : '/sx63'},
          {item : '下级项目4', url : '/sx64'},
          {item : '下级项目5', url : '/sx66'}        
        ]}
    ] 
  }

  getResData = (data) => {
    this.setState({
      resData : data
    });
  }

  render() {
    const {listmess1} = this; 
    var getResData = this.getResData;
    // console.log("得到的数据：" + this.state.resData);
    // console.log('根路径：', window.location.hash);
    // if(window.location.hash == '' || window.location.hash =='#/'){
    //   return < Redirect to='/login'/>;
    // }
    return (
        <Router>
           <Switch>
              {/* <Route path='/test'  component = {()=>{ return <NavList listMess={listmess1} cflag='sx1' parentUrl='/test'/>}}/> */}
             <Route path="/admin" component={Admin} />
             {/* <Redirect from='/admin' to='/admin/myacc'/> */}
             <Route path='/login'  component = {Login}/>
             <Redirect from='/' to='/login'/>
           </Switch>
        </Router>
    );
  }
}
// export default Topics;
export default App;
