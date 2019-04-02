import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, Route} from 'react-router-dom';
import './Customerinfor.css';
import Newadd from './components/Newadd/Newadd';
import Navbar from '../Navbar/index';
import Moreadd from './components/Moreadd/Moreadd';
import Querycust from './components/Querycust/Querycust';
class Customerinfor extends Component {
    constructor(props){
      super(props);
      this.hashSelect = {
          '#/admin/custinfor' : 'add',
          '#/admin/custinfor/add' : 'add',
          '#/admin/custinfor/query' : 'search'
      }
      this.state = {
        listFlag : this.hashSelect[window.location.hash]
      }
    }

    triggerList = (flag) => {
        this.setState({
            listFlag : flag
        });
    }

    render(){
        const {match} = this.props;
        const{
            listFlag
        } = this.state;
        console.log('客户资料props:', this.props);
        console.log('客户资料父级路径：', match && match.url);
        console.log('hash值：', window.location.hash);
        return (
            <div className='mycontent'>
                <Navbar userole = 'boss' parentUrl = '/admin' sele='cell6'/>
                <div className='custinfor'>
                    <ul className='custinfor__list'>
                            <li className='custinfor__title1'>
                                <Link to={match.url} className={`custinfor__linkfont 
                                                        custinfor__title 
                                                        ${listFlag == 'add' && 
                                                        'custinfor__title--active'}`}
                                    onClick={()=>{this.triggerList('add')}}>新增客户资料<i className="custinfor__title__arr"></i></Link>
                                <ul className={`custinfor__title__actlist ${listFlag=='add'  && 'custinfor__title__actlist--active'}`}>
                                    <li><Link to={match.url} className='custinfor__linkfont custinfor__item'>批量新增客户资料</Link></li>
                                    <li><Link to={ `${match.url}/add` } className='custinfor__linkfont custinfor__item'>添加客户资料</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to={ `${match.url}/query` } className={`custinfor__linkfont 
                                                        custinfor__title 
                                                        ${listFlag == 'search' && 
                                                        'custinfor__title--active'}`} 
                                                        onClick={()=>{this.triggerList('search')}}>客户资料查询与维护</Link>
                            </li>
                    </ul>
                    <div className='custinfor__content'>
                        <Route exact path={ match.url } component={Moreadd}/>
                        <Route path={ `${match.url}/add` } component={Newadd}/>
                        <Route path={ `${match.url}/query`} component={Querycust}/>
                    </div>                     
                </div>                
            </div>
        );
    }
}
export default Customerinfor;