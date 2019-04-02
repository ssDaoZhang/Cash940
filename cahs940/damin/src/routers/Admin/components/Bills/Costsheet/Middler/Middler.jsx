import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import formatDate from 'format-date';
import './Middler.css';
import myAjax from '../../../../../../tools/myAjax';
class Middler extends Component{
    constructor(props){
        super(props);
        this.state = {
            //经手人列表
            userList : ''
        };
    }
    componentDidMount(){
        myAjax({
            url : '/shopShift/getUserList',
            data : { 
                appID : JSON.parse(sessionStorage['appID']),
                //店铺ID
                // shopID:this.seletedShopId.mark,
                //语言
                lan:'zh_CN', 
                //时间戳
                timestamp : new Date().getTime(),
                token : JSON.parse(sessionStorage['token']),
            },
            type : 'GET',
            success : this.handBackData,
        });
    }
    //处理返回数据
    handBackData = (data) => {
        if(data.statusCode == 0){
            // console.log('经手人返回的数据：', data.list);
            var userMessArr = [];
            data.list.forEach((ele, index) => {
                userMessArr.push({
                    userName : ele.name || ele.nickName,
                    userID : ele.userID,
                    userRoles : ele.roles,
                });
            });
            this.setState({
                userList : userMessArr
            });
        }
        // console.log('经手人返回的数据：', data);
    }
    render(){
        const {
            userList
        }  = this.state;
        const {
            callFuc
        } = this.props;
        // console.log('经手人返回的数据：', userList);
        return(
            <div className='middlercenter'>
                    <table>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>角色</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userList != '' && userList.map((ele, index) => {
                                    return <tr key={index} onClick={e => callFuc(ele)}>
                                            <td>{ele.userName}</td>
                                            <td>{ele.userRoles || ''}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
            </div>
        )
    }
}
export default Middler;