import React, {Component} from 'react';
import PropTypes from 'prop-types';
import'./Citybox.css';
import citys from './cirtys';
class Citybox extends Component {
    constructor(porps){
        super(porps);
        this.state = {
            indexFlag : 'A',
            showcityFlag : '',
            addCtiyFlag : [],
            userCity : ''
            // arr : []
        }
        this.addCtiytempArr = [];
        // this.arrs= [];
    }

    componentDidMount(){
        this.addCtiytempArr = [
            '北京市',
            '上海市',
            '重庆市',
            '天津市',
            '广东省 深圳市'
        ];
        this.setState({
            addCtiyFlag : this.addCtiytempArr
        });
    }

    //设置当前选中的A-Z的索引值
    setIndexFlag = (flag) => {
        this.setState({
            indexFlag : flag,
        });
    }
    //设置被选择的省(直辖市)
    setShowcityFlag = (obj) => {
        const { showcityFlag } = this.state;
        if( showcityFlag != obj.flag){
            this.setState({
                showcityFlag : obj.flag
            });
        }else{
            this.setState({
                showcityFlag : ''
            });
        }
        //直辖市、地区选择城市
        if(obj.city){
            this.setState({
                userCity : obj.city
            });
        }
    }
    //设置选中的常用的城市数组 城市查询列表中
    setAddCityFlag = (flag) => {
        // console.log('设置常用城市的元素：', flag);
        const { addCtiyFlag } = this.state;
        var { addCtiytempArr } = this;
        var index = addCtiytempArr.indexOf(flag);
        // console.log('设置常用城市元素的索引：', index);
        if( index == -1){
            addCtiytempArr.push(flag);
            this.setState({
                addCtiyFlag : addCtiytempArr.map( ele => ele )
            });
        }else{
            addCtiytempArr.splice(index, 1);
            this.setState({
                addCtiyFlag : addCtiytempArr.map( ele => ele )
            });
        }
        // console.log('数组1:', addCtiytempArr);
    }
    //常用的城市区域 删除常用城市
    deleteCityArr = (flag) => {
        // console.log('要删除的元素：', flag);
        const { addCtiyFlag } = this.state;
        var { addCtiytempArr } = this;
        var index = addCtiytempArr.indexOf(flag);
        // console.log('要删除的元素索引：', index);
        addCtiytempArr.splice( index, 1 );
        this.setState({
            addCtiyFlag : addCtiytempArr.map( ele => ele )
        });
    }

    //得到用户选择的城市
    getUserCity = (citystr) => {
        this.setState({
            userCity :  citystr
        });
        this.props.callFuc(citystr);
    }

    render(){
        const { indexFlag, showcityFlag, addCtiyFlag, userCity } = this.state;
        const { setIndexFlag, setShowcityFlag, setAddCityFlag, deleteCityArr, getUserCity } = this;
        // console.log('城市显示flag:', showcityFlag);
        // console.log('数组2：', addCtiyFlag);
        // console.log('数组1arr：', arr);
        // console.log('数组2arrs：', arrs);
        return(
            <div className='citybox'>
                <div className='citybox__title'>
                    {userCity ? `您选择的城市：${userCity}` : '请选择开户地城市'}
                </div>
                <div className='citybox__habitbox'>
                    <i>常用的城市：<span>右键删除已有的常用城市</span></i>
                    <div className='citybox__habit'>
                        {
                            addCtiyFlag.length != 0 && addCtiyFlag.map(( ele, index ) => {
                                return <span    onContextMenu={ e => { e.preventDefault();  deleteCityArr(ele);}} 
                                                key={ele + index}
                                                onClick={e => {getUserCity(ele)}}
                                                >{ele.indexOf(' ') != -1 ? ele.split(' ')[1] : ele}</span>
                            })
                        }
                    </div>
                </div>
                <div className='citybox__querybox'>
                    <div className='citybox__querybox__tirps'>城市查询：
                        <i className='citybox__querybox__tirps__mess'>点击城市名选择城市，点击
                            <i className='citybox__querybox__tirps__mess__ico'></i>设置常用城市
                        </i>
                    </div>
                    <div className='citybox__query'>                    
                        <div className='citybox__query__index'>
                            <div className='citybox__query__index__box'>
                                {
                                    citys.indexFlag.map((ele, index) => {
                                        return <i   key={ele+index}
                                                    className='cqindex'
                                                    onClick={(e) => { setIndexFlag(ele) }}
                                                >{ele}</i>
                                    })
                                }
                            </div>
                            <span className='citybox__query__index__tirp'>索&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;引</span>
                        </div>
                        <ul className='citybox__query__search'>
                            {
                                citys.province[indexFlag] != '' ? citys.province[indexFlag].map((ele1, index) => {
                                    return  <li  key={ele1 + index + ''}
                                                className ='citybox__query__search__provitem'>
                                                    <span   className='citybox__query__search__provitem__name'
                                                            onClick={ (e) => { setShowcityFlag({flag : ele1.index, city : !ele1.index && ele1.name}) }} >
                                                        {ele1.name}
                                                        {ele1.index ? 
                                                            <i className={ `${ showcityFlag == ele1.index && 'iconstr'}` }></i> : 
                                                            <span   className={`${ addCtiyFlag.indexOf(ele1.name) != -1 && 'iconcity'}`} 
                                                                    onClick={(e) => {setAddCityFlag(ele1.name)}}></span> 
                                                        }
                                                    </span>
                                                     <ul    className={`citybox__query__search__provitem__list 
                                                            ${ showcityFlag == ele1.index && 
                                                            'citybox__query__search__provitem__list--active'}`}>
                                                        { 
                                                            ele1.index && citys.cirtybox[ele1.index].map((ele, index) => {
                                                                return <li  key={ele + index}
                                                                            className='citybox__query__search__provitem__list__ele'
                                                                            >
                                                                            <span   className='citybox__query__search__provitem__list__ele__mess'
                                                                                    onClick={e => {getUserCity(ele1.name + ' ' + ele)}}
                                                                                    >{ele}</span>
                                                                            <i  className={`citybox__query__search__provitem__list__ele__ico 
                                                                                            ${ addCtiyFlag.indexOf(ele1.name + ' ' + ele) != -1 && 'citybox__query__search__provitem__list__ele__ico--active'}`}
                                                                                onClick={(e) => {setAddCityFlag(ele1.name +' '+ ele)}}
                                                                                ></i>
                                                                        </li>
                                                            })
                                                        }
                                                        </ul>                                                    
                                            </li>
                                }) : <div className='citybox__query__search__tirps'>暂无此首字母省市</div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Citybox;