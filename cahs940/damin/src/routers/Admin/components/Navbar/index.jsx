import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.css';
import $1 from 'jquery';
import {Redirect, Link} from 'react-router-dom';
import './index.css';
class TopList extends Component {
  constructor(props){
    super(props);
    var { userole, parentUrl} = this.props;
    // console.log('负极路：', parentUrl);
    // var userolestr = 'boss';
    // userole.forEach((ele, index) => {
    //   userolestr = userolestr + ele.roleCode
    // });
    // console.log(userolestr);
    // var urlHash = window.location.hash;


    if( userole === 'boss'){
      this.items = [
        // { title : '日常交易', url : parentUrl + '', index : 'cell1'},
        { title : '我的账户', url : parentUrl + '', index : 'cell1'},
        { title : '店铺资产', url : parentUrl + '/profit', index : 'cell2'},
        { title : '账目管理', url : parentUrl + '/bill', index : 'cell3'},
        { title : '店铺管理', url : parentUrl + '/shopmanage', index : 'cell4'},
        { title : '店铺卡管理', url : parentUrl + '/bankcard', index : 'cell5'},
        { title : '客户资料', url : parentUrl + '/custinfor', index : 'cell6'},        
        { title : '我的收藏', url : parentUrl + '/mycollection', index : 'cell7'}
      ];
    }else if( userole === 'manager' ){
      this.items = [
        // { title : '日常交易', url : parentUrl + '', index : 'cell1'},
        { title : '我的账户', url : parentUrl + '', index : 'cell1'},
        { title : '客户资料', url : parentUrl + '/custinfor', index : 'cell2'},
        { title : '利润分析', url : parentUrl + '/profit', index : 'cell3'},  
        { title : '银行卡管理', url : parentUrl + '/bankcard', index : 'cell4'},
        { title : '账目管理', url : parentUrl + '/tradebill', index : 'cell5'},
        { title : '店铺管理', url : parentUrl + '/shopmanage', index : 'cell6'},
        { title : '店铺相关', url : parentUrl + '/shoprelat', index : 'cell7'},
        { title : '我的收藏', url : parentUrl + '/mycollection', index : 'cell8'}
      ];
    }else if(userole === 'assistant'){
      this.items = [
        // { title : '日常交易', url : parentUrl + '', index : 'cell1'},
        { title : '我的账户', url : parentUrl + '', index : 'cell1'},
        { title : '客户资料', url : parentUrl + '/custinfor', index : 'cell2'},
        { title : '利润分析', url : parentUrl + '/profit', index : 'cell3'},
        { title : '账目管理', url : parentUrl + '/tradebill', index : 'cell4'},
        { title : '银行卡管理', url : parentUrl + '/bankcard', index : 'cell5'},
        { title : '单据管理', url : parentUrl + '/bill', index : 'cell6'},
        { title : '店铺相关', url : parentUrl + '/shopmanage', index : 'cell7'},
        { title : '我的收藏', url : parentUrl + '/mycollection', index : 'cell8'}
      ];
    }else if(userole === 'visitor'){
      this.items = [
         { title : '我的账户', url : parentUrl + '', index : 'cell1'},
         { title : '店铺相关', url : parentUrl + '/shopmanage', index : 'cell2'},
         { title : '我的收藏', url : parentUrl + '/mycollection', index : 'cell3'}
      ];
    }

    // this.state = {
    //   activeflag : 'cell1'
    // };
  // }
  // setActiveFlag = (flag) => {
  //   this.setState({
  //     activeflag : flag
  //   });
  }
  render() {
    const { sele } = this.props;
    const { items } = this;
    // const {  } = this.state;
    // console.log('activeflag:', activeflag);
    return (
        <div className = 'navbar mycontent'>
            <div className='center navbar__center'>
            <div className='navbar__log'></div>
            <div className='navbar__btn'>
                {
                  items.map( ( ele, index) => {
                    return <Link key={ele.index} to={ele.url} 
                                 className={`navbar__btn__cell ${ sele == ele.index && 'navbar__btn__active'}`}>
                                 {ele.title}</Link>
                  } )
                }
            </div>
            </div>
        </div>
    );
  }
}
    
TopList.propTypes = {

};
    
export default TopList;

