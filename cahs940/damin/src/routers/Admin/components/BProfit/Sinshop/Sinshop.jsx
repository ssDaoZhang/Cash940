import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import formatDate from 'format-date';
import './Sinshop.css';
import DropList from '../../../../../components/DropList/DropList';
class Sinshop extends Component{
    constructor(props){
        super(props);
        this.shopData = [
            { mark : 'shopID1', name : '小店一'},
            { mark : 'shopID2', name : '小店二'},
            { mark : 'shopID3', name : '小店三'},
            { mark : 'shopID4', name : '小店四'},
            { mark : 'shopID5', name : '小店五'},
            { mark : 'shopID6', name : '小店六'},
            { mark : 'shopID7', name : '小店七'},
            { mark : 'shopID8', name : '小店八'},
            { mark : 'shopID9', name : '小店九'},
            { mark : 'shopID10', name : '小店十'},
            { mark : 'shopID11', name : '小店11'},
            { mark : 'shopID12', name : '小店12'},
            { mark : 'shopID13', name : '小店13'},
            { mark : 'shopID14', name : '小店14'},
            { mark : 'shopID15', name : '小店15'},
            { mark : 'shopID16', name : '小店16'},
            { mark : 'shopID17', name : '小店17'},
            { mark : 'shopID18', name : '小店18'},
            { mark : 'shopID19', name : '小店19'},
            { mark : 'shopID20', name : '小店20'},
            { mark : 'shopID21', name : '小店21'},
            { mark : 'shopID22', name : '小店22'},
            { mark : 'shopID23', name : '小店23'},
            { mark : 'shopID24', name : '小店24'}
        ];
        this.state = {
            currShopID : this.shopData[0].mark,
            sDate : new Date(),
            eDate : new Date(),
            showSTimeFlag : false,
            showETimeFlag : false,
            testInput : ''
        }
    }
    selectedShopiD = ( currshopID ) => {
        this.setState({
            currShopID : currshopID
        });
    }
    setSDate = (currDate) => {
        this.setState({
            sDate : currDate
        });
    }
    setEDate = (currDate) => {
        this.setState({
            eDate : currDate
        });
    }
    setShowSTimeFlag = () => {
        // this.setState({
        //     showSTimeFlag : flag.flag
        // });
        // console.log("标志改变启动：", flag.name, flag.flag);
        this.setState( preState =>{
            return {showSTimeFlag : !preState.showSTimeFlag};
        });
    }
    setShowETimeFlag = () => {
        this.setState( preState =>{
            return {showETimeFlag : !preState.showETimeFlag};
        });
    }
    getProfit = (e) => {
        const { currShopID, sDate, eDate } = this.state;
        const   sDateStr = formatDate( '{year}{month}{day}', sDate),
                eDateStr = formatDate( '{year}{month}{day}', eDate);
        if(sDateStr <= eDateStr){
            console.log('ajax写这里:', currShopID, sDateStr, eDateStr);
        }
    }
    setTestInPut = (e) => {
        this.setState({
            testInput : e.target.value
        });
    }
    testInPut = (e) => {
        var inputStr = e.target.value;
        console.log('限制输入：', e.target.value);
        console.log('输入键值：', e.keyCode);
        if(e.keyCode < 48 || e.keyCode > 57 || e.keyCode < 96 || e.keyCode > 110 ){
            e.keyCode = 32;
        }
        this.setState({
            testInput : inputStr.replace(/\D+/g,'')
        });
        console.log('输入键值2：', e.keyCode);
    }
    render(){
        const { shopData, selectedShopiD, setSDate, setEDate } = this;
        const { sDate, eDate, showSTimeFlag, showETimeFlag, testInput } = this.state;
        var sTimeStr = formatDate( '{year}-{month}-{day}', sDate),
            eTimeStr = formatDate( '{year}-{month}-{day}', eDate);
            // console.log('开始日历标志：', showSTimeFlag);
        return(
            <div className='sinshop'>
                <h2 className='sinshop__top'>
                    单个店铺利润查询
                </h2>
                <div className='sinshop__content'>
                    <div className='sinshop__content__seleshop'>
                        <span>请选择您要查看的店铺：</span>
                        <div className='sinshop__content__seleshop__iconbox'>
                            <DropList   data={shopData}
                                        callFuc={selectedShopiD}
                                        iconHeight='1.3em'
                                        opWarpPosTop='1.3em'
                                        opWarpwidth='8em'
                                        opheight='1em'
                                        />
                        </div>
                    </div>
                    {/* <div className='sinshop__content__selecurr'>
                        <span>请选择币种：</span>
                        <div></div> 
                    </div> */}
                    <div className='sinshop__content__seletime'>
                        <span className='sinshop__content__seletime__tirp'>
                            请选择你要查看的时间段：
                        </span>
                        <div className='sinshop__content__seletime__stimebox'>
                            <span onClick={this.setShowSTimeFlag}>{'开始时间：' + sTimeStr}
                                <i className={showSTimeFlag ? 'sanjactive' : ''}></i>
                            </span>
                            { showSTimeFlag && <div  className='sinshop__content__seletime__stimebox__calendar'>
                                 <Calendar   onChange={setSDate}
                                            value={sDate}
                                            className='my__calendarwarp'                                        
                                            showNeighboringMonth = {false}
                                            view='month'
                                            />
                            </div>}
                        </div>
                        <div className='sinshop__content__seletime__stimebox'>
                            <span   onClick={this.setShowETimeFlag}>{'结束时间：' + eTimeStr}
                                <i className={showETimeFlag ? 'sanjactive' : ''}></i>
                            </span>
                            { showETimeFlag && <div     className='sinshop__content__seletime__stimebox__calendar'>
                                <Calendar   onChange={setEDate}
                                            value={eDate}
                                            minDate={sDate}
                                            className='my__calendarwarp'  
                                            showNeighboringMonth = {false}                                          
                                            />
                            </div>}
                        </div>
                    </div>
                    <div    onClick={this.getProfit} className='sinshop__content__btn'
                            >查&nbsp;&nbsp;&nbsp;&nbsp;询</div>
                    <div className='sinshop__content__profit'>
                        <span className='messpro fontw'>利润：</span>
                        <span className='messpro '>币种</span>
                        <div>
                            <i className='boxwh'>100 000 000 000 000</i>
                            <i className='boxwh'>单位</i>
                        </div>
                    </div>
                    <input  type="text" 
                            // onKeyDown={this.testInPut} 
                            // onKeyUp={this.testInPut}
                            value={testInput}
                            onChange={this.setTestInPut}
                            />
                </div>
            </div>
        );
    }
}

export default Sinshop;