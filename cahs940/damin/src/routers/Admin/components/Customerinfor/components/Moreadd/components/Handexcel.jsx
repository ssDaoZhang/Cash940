import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import $l from 'jquery';
import FileLoader from './loadFlie';
import handData from './handData';
import './Handexcel.css';
import './table.css';
import Tablerow from './Tablerow';
import myAjax from './myAjax';
import XLSX from 'xlsx';
import ProgressBar from '../../components/ProgressBar';
// import Topbar from '../../components/Topbar/Topbar';
// import Carousel from '../../components/carousel/carousel';
// import Product from './compents/Product/Product';
// import Productplat from './compents/Productplat/Productplat';
class Handexcel extends Component {
  constructor(props){
    super(props);
    this.state = {
        color : '#ccc',
        backg_width : 0,
        tableData : '',
        fileflow : '',
        inputCarCodeFlag : false,
        codeValue : '',
        codeErrMess : '',
        progressFlag : false,
        progressPer : 0,
        
    };
    this.events = {
        load: function(data){
        },
         progress: '',//(percent)=>{
        //     var tempnum1 = parseInt(percent);
        //     // var tempnum2 = tempnum1 * 2;
        //     console.log('进度率：', tempnum1);
        //     $l('.handexcel__backg').eq(0).css({
        //         'width':tempnum1 + '%'
        //     });
        //     $l('.handexcel__pro').eq(0).text(tempnum1 + '%');
        // },   
        loadSuccess: function(){
            console.log('success!!!');
        }
    }
    this.tableItem = [
        {tallyDate : '记账日' },
        {tradeDate : '交易日期'},
        {tradeTime : '交易时间'},
        {tradePlace : '交易地点'},
        {pay : '支出'},
        {income : '收入'},
        {balance : '账户余额'},       
        {oppoAccount : '对方户名'},
        {oppoCode : '对方账号'},
        {oppoBank : '对方开户行'},
        {currency : '币种'},        
        {type : '钞/汇'},
        {abstract : '摘要'},
        {PS : '附言'},
        {tradeTbue : '交易渠道/场所'},
        {country : '交易国家或地区简称'},
        {method : '交易方式'},
        {fNum : '交易流水号'}
    ];
    this.handfuc = [
        { bankHand : handData.minSheng, bankT : 'A8'},
        { bankHand : handData.jianHang, bankT : 'A7'},
        { bankHand : handData.gongShang, bankT : 'A7'},
        { bankHand : handData.cunZhen, bankT : 'A2'},
        { bankHand : handData.pingAn, bankT : 'A2'},
        { bankHand : handData.nongYe, bankT : 'A6'},
        { bankHand : handData.zhongHang, bankT : 'A1'}       
    ]
    this.timer = null;
  };
  componentDidMount(){
      if(!this.events.progress){
        this.events.progress = (percent) => {
            var tempnum1 = parseInt(percent);
            this.setState({
                progressPer : tempnum1/100
            })
            // if(tempnum1 == 100){
            //     this.timer = setTimeout(this.setProgressFlag(false),1500);
            // }
        }
    }
  };
  handDragOver = (e) => {
    this.getTableData('');
    this.setProgressFlag(true);
    this.setProgressPer(0);
    if(this.state.fileflow !== ''){
        this.getFileflow({file:'', flag: false});
    }
    e.preventDefault();
    // event.persist();
    // console.log(this);
    this.setState({
        color : '#26ae5f'
    })
  };

  handDrop = (e) => {
    // this.timer &&  clearTimeout(this.timer);
    e.preventDefault();
    console.log('银行：', this.bank, '卡号：', this.carCode);
    var tarFile1 = e.dataTransfer.files[0];
    var inputFileType = tarFile1.name.match(/\.\w*$/)[0];
    console.log('传入文件类型：', inputFileType);
    console.log('传入文件类型：', Object.prototype.toString.call(inputFileType));
    if(inputFileType == '.xlsx' || inputFileType == '.xlsm' || inputFileType == '.xlsb' || inputFileType == '.xls'){
      console.log('传入前的函数：', this.handfuc[this.bank]);
      var loader = new FileLoader(tarFile1, this.events, this.getFileflow, this.getTableData, this.handfuc);
    }else{
        alert('请确保您提交的是表格文件!!!');
        window.location.reload();
    }
    this.setState({
        color : '#26ae5f'
    })
  };

  handChange = (e) => {
    // this.timer &&  clearTimeout(this.timer);
    e.preventDefault();
    var tarFile2 = e.target.files[0];
    var inputFileType = tarFile2.name.match(/\.\w*$/)[0];
    if(inputFileType == '.xlsx' || inputFileType == '.xlsm' || inputFileType == '.xlsb' || inputFileType == '.xls'){
      console.log('传入前的函数：', this.handfuc[this.bank]);
      var loader = new FileLoader(tarFile2, this.events, this.getFileflow, this.getTableData, this.handfuc);
    }else{
        alert('请确保您提交的是表格文件!!!');
        window.location.reload();
    }

  };
  handSelect = (e) =>{
      this.bank = e.target.value;
      console.log('下拉列表的值是：', this.bank);
  };

  onClickLabel = (e) => {
    this.getTableData('');
    this.setProgressFlag(true);
    this.setProgressPer(0);
    if(this.state.fileflow !== ''){
        this.getFileflow({file:'', flag : false});
    }
    //   console.log('输入的卡号是：', this.carCode);
  };
  getTableData = (data) => {
      this.setState({
          tableData : data
      });
  };
  getFileflow = (data) => {
    this.setState({
        fileflow : data.file,
        inputCarCodeFlag : data.flag
    });
  };

  handInputCarCode = (e) => {
    var codeValue = this.state.codeValue;
    if(codeValue && 
        ( (codeValue.match(/\d{16}/g) && codeValue.length == 16) || 
          (codeValue.match(/\d{17}/g) && codeValue.length == 17) ||
          (codeValue.match(/\d{19}/g) && codeValue.length == 19)
        )
    ){
        console.log('this.carCode:', codeValue);
        var res = null;
        var { fileflow } = this.state;
        myAjax({data : codeValue, callback : (resdata) => { res = resdata}, url:'', method : 'POST', cache : false});
        var rang = fileflow['!ref'].replace('A1',this.handfuc[res].bankT);
        fileflow['!ref'] = rang;
        this.handfuc[res].bankHand(
            {
                 data  : JSON.parse(  JSON.stringify(XLSX.utils.sheet_to_json( fileflow ))),
                 carCode : codeValue,
                 getData : this.getTableData
            }    
        )
       this.setState({
            codeValue : '',
            inputCarCodeFlag : false
        })
    }else{
            this.setState({
                codeErrMess : '您输入的号码不正确，请查证后再输！'
            });
    }
  }
  setProgressFlag = (data) => {
    this.setState({
        progressFlag : data
    })
  }
  setProgressPer = (data) => {
    this.setState({
        progressPer : data
    })
  }
  handInput = (e)=>{
    this.setState({
        codeValue : e.target.value
    })
  }
  render( ){
    if(this.state.fileflow){
        console.log('fileflow有值了：', this.state.fileflow);
    }
    // console.log('backg_width:',backg_width);
    //console.log("getTableData:", this.state.tableData);
    var   {inputCarCodeFlag, color,tableData, fileflow, codeValue, codeErrMess, progressFlag, progressPer} = this.state,
            tableItem = this.tableItem;
            console.log('最后的信息：',tableData);
    if(codeValue){
        console.log('手动输入卡号：', codeValue);
    }
    //         console.log('tableData:', tableData);
    //         console.log('tableItem:', tableItem);
    //         console.log('Object.keys(tableItem)[0]:',Object.keys(tableItem[0])[0]);
    //         console.log('tableData[2]:', tableData !== '' ? tableData[2] :'为空');
    //         console.log('tableItem[0]:', tableItem[0]);
    // console.log('11111:', tableData !== '' ? tableData[2][Object.keys(tableItem[0])[0]] :'为空', '22222:', tableItem[0][Object.keys(tableItem[0])[0]]);
    return (
      <div className="handexcel mycontent">

            <input  id='flie' className='handexcel__input' type="file" onChange={this.handChange}/>
            <label htmlFor="flie" onClick={this.onClickLabel}>请选择您要查询的excel表格</label>
            <div className='handexcel__box'>
            { progressFlag && <div className='handexcel__warp'>
                <span className='handexcel__char'>读取进度：</span>
                <div className='handexcel__bar'><ProgressBar percent={progressPer} width={100} height={10}/></div>
                <span className='handexcel__pro'>{progressPer * 100 + '%'}</span>
            </div>}
            </div>
            <div    className = 'handexcel__inpregion' 
                    onDragOver = { this.handDragOver } 
                    onDrop = { this.handDrop } 
                    style = {{
                                backgroundColor: color
                            }}>
                    请将您上传的表格拖到此区域中
            </div>
            <div className='handexcel__conwarp'>                 
                {
                    inputCarCodeFlag  && <div className='handexcel__concode'>
                                        <div className='handexcel__coninpwarp'>
                                            <input className='handexcel__codeinput' type="text" 
                                                onChange = {this.handInput} 
                                                placeholder='请输入您要查询的卡号' 
                                                value = {this.state.codeValue}/>
                                            <div className='handexcel__codebtn' onClick={this.handInputCarCode}>提交</div>
                                        </div>
                                    <p className='handexcel__mess'>{codeErrMess || '您上传的文件中未提供卡号信息，请手动输入您上传的表格对应得卡号！！！'}</p>
                                </div>
                }
            </div> 
            {
                tableData !== '' &&
                <div className='handexcel__tablewarp'> 
                <div className='handexcel__sign'>
                    <div><span>您查询的银行：</span><span>{tableData !== '' && tableData[0].bank}</span></div>
                    <div><span>您查询的账号：</span><span>{tableData !== '' && tableData[1].carCode}</span></div>
                </div>
                <table className='handexcel__table'>
                    <thead>
                        <tr>
                            {   
                                tableData !== '' &&
                                tableItem.map((ele, index) => {
                                    var tag = Object.keys(ele)[0];
                                    if(tableData[2][tag] !== -1){
                                        return <th key={tag}>{ele[tag]}</th>
                                    }
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                tableData !== '' &&
                                tableData.map((ele, index) => {
                                    if(index > 1){
                                        return <Tablerow dataObj={ele} key={index}/>
                                    }
                                })
                            }
                        </tbody>            
                </table>
                </div>
            }
      </div>

    
    );
  }
}
    
Handexcel.propTypes = {
  // data : PropTypes.array.isRequired
};
    
export default Handexcel;