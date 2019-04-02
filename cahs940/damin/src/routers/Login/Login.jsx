import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, BrowserRouter as Router,Route} from 'react-router-dom';
import './Loginbox.css';
import './Login.css';
import TopReg from './components/TopRegion/TopRegion';
import Loginblock from './components/Loginblock/Loginblock';
import Registerblock from './components/Registerblock/Registerblock';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        activeFlag : window.location.hash === "#/login" ? true :false
      };
  };
  setActiveFlag1 = (e) =>{
      this.setState((preState, porps) => {
            return { activeFlag : !preState.activeFlag ? !preState.activeFlag : preState.activeFlag};
      })
  }

  setActiveFlag2 = (e) =>{
      this.setState((preState, porps) => {
            return { activeFlag : preState.activeFlag ? !preState.activeFlag : preState.activeFlag};
      })
  } 

  render() {
    const {activeFlag} = this.state;
    const {match} = this.props;

    return (    
      <div className="login mycontent">
          <div className="login__topregion">
               <TopReg/>  
          </div>
          <div className='login__medregion mycontent'>
            {/* <Loginbox url={match.url}/> */}
            <div className = 'logwarp center'>
                <div className = 'logbox'>
                    <div className = 'logbox__item'>
                        <Link className={`${activeFlag&&'logbox__active'}`}
                          onClick={this.setActiveFlag1} to={match.url}>登录</Link>
                        <Link className={`${!activeFlag&&'logbox__active'}`} 
                          onClick={this.setActiveFlag2} to={`${match.url}/register`}>免费注册</Link>
                    </div>
                      <div className='logbox__login'>
                        <Route  exact={true} path={match.url} component={Loginblock}></Route>
                      </div> 
                      <Route path={`${match.url}/register`} component={Registerblock}></Route> 
                </div>
            </div>
          </div>
          {/* <a href="https://www.baidu.com">百度一下</a> */}
      </div>
      
    );
  }
}
    
Login.propTypes = {
  // data : PropTypes.array.isRequired
};
    
export default Login;