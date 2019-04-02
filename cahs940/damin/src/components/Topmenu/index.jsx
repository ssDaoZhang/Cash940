import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';
// import './index.css';
// import getData from '../../../src/tools/getData';
// import './index.css';
class TopMenu extends Component {
// const TopMenu = ({ current,  setdata}) => {
    constructor(props){
        super(props); 
        this.state = {
          showmenuli : '0'
        }
    }
    // getVal = (val) => {
    //     this.setState(val);
    // }
    componentDidMount(){
        // getData(this.getVal);
    }
    getMenuIndex = (index) => {
        this.setState({showmenuli : (index + '') })
    }
    //退出登录操作
    getOut = (e) => {
        sessionStorage.clear(); 
    }
    render() {
        var topItems = [
                            {title:'CASH首页', url:'#'},
                            {title:'联系客服', url:'#'},
                            {title:'站内导航', url:'#'},
                       ]   

        var menuIt5 = [
            { title: '项目w1', url: '#' }, 
            { title: '项目w2', url: '#' }, 
            { title: '项目w3', url: '#' }, 
            {title: '项目w4',url:'#'}   
        ]
        const useracc = this.props.useracc
    return (
        <div className="topMenu">
            <div className="topMenu__topWarp">
            <div className="topMenu__top center">
                <div className="topMenu__useracc">
                    <div className="topMenu__useracc__acc">{useracc}</div>
                    <a href='http://localhost:3100/#/' className="topMenu__useracc__leave"
                        onClick={this.getOut}>退出登录</a>
                </div>
                <div className="topMenu__topItems">
                {
                    topItems.map( (ele, index) =>{
                            if(index == topItems.length - 1){
                                return <div className="topMenu__nav  topMenu__topbtn" key={ele.title}>
                                    <Link to={ele.url} className="topMenu__navbtn" key={ele.title}>
                                        <span className="topMenu__text">{ele.title}<i></i></span>
                                    </Link>
                                    <ul className="topMenu__nav__list">
                                        {
                                            menuIt5.map((ele) => {
                                                return <li key={ele.title}><a href={ele.url}>{ele.title}</a></li>
                                            })
                                        }
                                    </ul>
                                </div>
                            }else{
                                return <Link to={ele.url} className="topMenu__topbtn" key={ele.title}>
                                <span className="topMenu__text">{ele.title}</span>
                                </Link>
                            }
                        }
                    )
                }
                </div>
            </div>
            </div>
            <div className="topMenu__mid center">
                <div className="topMenu__logo"></div>
                <div className="topMenu__name"></div>
                <div className="topMenu__search">
                    <input type="text" placeholder="请输入您要查询的内容"/>
                    <div className="topMenu__search__btn"><i></i>搜索</div>
                </div>
            </div>
        </div>
    
    );
    }
};

TopMenu.propTypes = {
    // current: PropTypes.string.isRequired
};

export default TopMenu;