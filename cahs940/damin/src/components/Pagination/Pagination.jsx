import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
import myAjax from '../../tools/myAjax';
/*
    需要传入的参数：
    pageNum ：Number 总页数
    currPage ：Number 当前页码
*/
class Pagination extends Component{
    constructor(props){
        super(props);
        this.state = {
            //当前页码
            scurrIndex : '',
            sPageArr : ''
        }
        //当前页码
        this.currIndex = this.props.currPage || 1;
    }
    componentDidMount(){
        this.handPageArr();
    }

    //生成分页数组
    createPageArr = () => {
        const {pageNum} = this.props;
        var pageArr = [];

        for(var i = 1; i <= pageNum; i++){
            pageArr.push(i);
        }
        return pageArr;
    }
    //选择页码
    setPageNum = ( index ) => {
        if(index === '...'){
            return;
        }else{
            this.currIndex = index;
            //ajax
            this.ajaxGetData(this.currIndex);
            this.handPageArr();
        }
    }
    //上翻页
    forwardIndex = (e) => {
        const { pageNum } = this.props;
        const { currIndex } = this;
        if( currIndex < pageNum ){
            this.currIndex = this.currIndex + 1;
        }
        //ajax
        this.ajaxGetData(this.currIndex);
        this.handPageArr();
    }
    //下翻页
    backward = (e) => {
        const { currIndex } = this;
        if( currIndex > 1 ){
            this.currIndex = this.currIndex - 1;
        }
        //ajax
        this.ajaxGetData(this.currIndex);
        this.handPageArr();
    }
    //插入...省略号
    handPageArr = () => {
        // const { currIndex } = this.state;
        const { pageNum } = this.props;
        const { currIndex } = this;
        var tempPageArr = []
        if( pageNum <= 10 ){
            for(var i = 1; i <= pageNum; i++){
                tempPageArr.push(i);
            }
        }else{
            if(currIndex < 7){
                tempPageArr.push(1);
                tempPageArr.push(2);
                tempPageArr.push(3);
                tempPageArr.push(4);
                tempPageArr.push(5);
                tempPageArr.push(6);
                tempPageArr.push(7);
                tempPageArr.push('...');
                tempPageArr.push(pageNum-2);
                tempPageArr.push(pageNum-1);
                tempPageArr.push(pageNum);
            }else if(currIndex >= 7  && currIndex < pageNum - 5){
                tempPageArr.push(1);
                tempPageArr.push(2);
                tempPageArr.push('...');
                tempPageArr.push(currIndex - 2);
                tempPageArr.push(currIndex - 1);
                tempPageArr.push(currIndex);
                tempPageArr.push(currIndex + 1);
                tempPageArr.push(currIndex + 2);
                tempPageArr.push('...');
                tempPageArr.push(pageNum-1);
                tempPageArr.push(pageNum);
            }else if( currIndex >= pageNum - 5 ){
                tempPageArr.push(1);
                tempPageArr.push(2);
                tempPageArr.push(3);
                tempPageArr.push('...');
                tempPageArr.push(pageNum-6);
                tempPageArr.push(pageNum-5);
                tempPageArr.push(pageNum-4);
                tempPageArr.push(pageNum-3);
                tempPageArr.push(pageNum-2);
                tempPageArr.push(pageNum-1);
                tempPageArr.push(pageNum);
            }
        }

        this.setState({
            sPageArr : tempPageArr,
            scurrIndex : currIndex
        });
    }
    //ajax请求数据
    ajaxGetData = (index) =>{
        // console.log('最里面的ajax');
        if(this.props.ajaxObj){
            var sendData = {
                appID:JSON.parse(sessionStorage['appID']),
                //语言
                lan:'zh_CN', 
                //时间戳 
                // timemstamp:new Date().getTime(),
                token:JSON.parse(sessionStorage['token'])
            };
            for(var attr in this.props.ajaxObj.data){
                sendData[attr] = this.props.ajaxObj.data[attr];
            }
            sendData['pageNumber'] = index;
            sendData['pageSize'] =  this.props.singlePageNum;
            // console.log('单页请求数据：', sendData);
            //请求现金详情
            myAjax({
                url : this.props.ajaxObj.url,
                data : sendData,
                type : 'GET',
                success : this.props.callfuc,
            });
        }
    }
    
   render(){
       const { 
                createPageArr,
                setPageNum,
                forwardIndex,
                backward
        } = this;
       const { pageNum } = this.props;
       const { 
                scurrIndex,
                sPageArr
         } = this.state;
    //    let pageArr = createPageArr();
    console.log('页码数组：', sPageArr);
    console.log('当前页码：', scurrIndex);
       return (
           <div className='pagination'>
               <ul className='pagination__box'>
                    <span   onClick={backward}
                            >{'<<'}</span>
                    {
                       sPageArr != '' &&  sPageArr.map((ele, index) => {
                            return <li  className={`${scurrIndex === ele && 'activeIndex'} ${ele === '...' && 'omitstyle'}`}
                                        onClick= { e => {setPageNum(ele)} }
                                        key={index}>
                                        {ele}
                                    </li>
                        })
                    }
                    <span   onClick={forwardIndex}
                            >{'>>'}</span>              
               </ul>
           </div>
       );
   }
}

export default Pagination;