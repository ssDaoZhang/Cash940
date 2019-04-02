/*
    传入参数：
        listMess：
            类型：Array
            示例：[
                { item: 'string', url : 'string', cflag : 'string', itemChild : [Array] }
            ]
            实例：[
                { item : '上级项目1', url : '/sx1', cflag: 'sx1', itemChild : [
                  {item : '下级项目1', url : '/sx11'},
                  {item : '下级项目3', url : '/sx13'},
                  {item : '下级项目4', url : '/sx14'},
                  {item : '下级项目5', url : '/sx16'}        
                ]},
            ]
            实例参数详解：
                item :  二级导航栏选项名称
                url : 二级导航栏的Link url
                cflag : active样式切换标志可以取对应的url
                itemChild : 如果存在三级导航选项次数组用来存放三级选项
        parentUrl:  父级路由
            类型：String
            示例：match.url
        cflag：  设置active样式切换标志的初始值
            类型：string
            示例：
                    this.hashSelect = {
                        '#/admin/profit' : 'pall',
                        '#/admin/profit/sinshop' : 'sinshop',
                        '#/admin/profit/panalysis' : 'panalysis'
                    }
                    this.state = {
                        selectItemflag : this.hashSelect[window.location.hash]
                    }    
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NavList.css';

class NavList extends Component{
    constructor(props){
        super(props);
        this.state = {
            listFlag : this.props.cflag
        }
    }

    triggerList = (cflag) =>{
        this.setState({
            listFlag : cflag
        });
    }

    setStyleHeight = ( flag , len) => {
        if( flag ){
            return {
                height : len * 2.1875 + 'em'
            };
        }else{
            return {
                height : 0
            };
        }
    }
    render(){
        const { listMess, parentUrl,  getFlag} = this.props;

        // console.log(listMess);
        const { listFlag } = this.state;
        return (
          <ul className='navlist__list'>
              {
                  listMess.map((ele, index) => {
                      return <li className='navlist__list1' key={ele + index +''}>
                            <Link to={ parentUrl + ele.url} 
                                className={`navlist__linkfont 
                                            navlist__title 
                                            ${listFlag == ele.cflag && 
                                            'navlist__title--active'}`}
                                onClick={()=>{this.triggerList(ele.cflag); getFlag && getFlag(ele.cflag)}}>
                                {ele.item}{ ele.itemChild && <i className="navlist__title__arr"></i>} </Link>
                                {
                                   ele.itemChild && <ul className='navlist__title__actlist' 
                                                        style={this.setStyleHeight(listFlag == ele.cflag, ele.itemChild.length)}>
                                        {   
                                            ele.itemChild.map( (ele, index) => {
                                                // console.log(ele.item);
                                                return <li key={ele + index +''}>
                                                    <Link to={parentUrl + ele.url} className='navlist__linkfont navlist__item'>{ele.item}</Link>
                                                </li>
                                            })
                                        }
                                   </ul> 
                                }  
                      </li>
                  })
              }
          </ul>
        );
    }
};

// Star.propTypes = {
//   value: PropTypes.number.isRequired,
//   size: PropTypes.number
// }

export default NavList;