/*
    需要传入的参数：
        timeMess ： 
            String: 描述日期的作用
        getDateFuc ：
            Function: 获取用户选择的日期
                参数：为用户选择的Date对象
        mDate:
            Date:   选择时间段是限制第二个日历的可选时间
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import formatDate from 'format-date';
import './Mycalendar.css';
/*
    参数：
        getDateFuc  Function  获取被选择的日期
        timeMess String 点击提示信息
        mDate Date 设置可选择的最小日期
        showFlag Boolean 默认显示选择的日期
                         true 不显示选择日期
        selectDate Date 已选的日期
*/
class Mycalendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            seedDate : this.props.selectDate ||new Date(),
            showSDateFlag : false
        }
    }
    setSeedDate = (currDate) => {
        this.setState({
            seedDate : currDate
        });
    }
    setShowDFlag = () => {
        this.setState( preState => {
            return {
                showSDateFlag : !preState.showSDateFlag
            };
        });
    }
    sendDateToWarp = () => {
        const { seedDate } = this.state;
        this.props.getDateFuc( seedDate );
    }
    render(){
        const { seedDate, showSDateFlag } = this.state;
        const { setSeedDate, setShowDFlag } = this;
        const { getDateFuc, timeMess, mDate, showFlag } = this.props;
        const seedDateStr = formatDate( '{year}-{month}-{day}', this.props.selectDate);
        // console.log('传入的显示标志：', showFlag);
        return(
            <div className='mycalendar' onMouseLeave={ this.sendDateToWarp }>
                <span onClick={setShowDFlag}>{showFlag ? timeMess : timeMess + seedDateStr}
                    <i className={showSDateFlag ? 'sanjactive' : ''}></i>
                </span>
                {showSDateFlag && <div className='mycalendar__calendar'>
                    <Calendar
                        onChange={setSeedDate}
                        value={seedDate}
                        className='my__calendarwarp'
                        showNeighboringMonth = {false}
                        view='month'
                        minDate={ mDate || new Date(0)}
                    />
                </div>}
            </div>
        );
    }
}

export default Mycalendar;