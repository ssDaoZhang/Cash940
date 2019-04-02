import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import $l from 'jquery';
import XLSX from 'xlsx';
import './Moreadd.css';
import FileLoader from './tools/loadFlie';
import myAjax from '../../../../../../tools/myAjax';
import Tablerow from './components/Tablerow';
import ProgressBar from '../../../../../../components/ProgressBar';

class MoreAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
        tableData : '',
        getMessFlag : false,
        progressFlag : false,
        progressPer : 0,
        readFlag : true,
        tirpFlag : false 
    };
    this.events = {
        load: function(data){
        },
        progress: '',  
        loadSuccess: function(){
            console.log('success!!!');
        }
    }
    this.tableItem = [
        { custName : '客户名'},
        { custPhone : '短信通知手机号'},
        { eMail : 'E-mail'},
        { receiveAccName : '收款账户'},
        { receiveAccCode : '收款账号'},
        { receiveBank : '开户行'},
        { phone : '手机号'},
        { certificateType : '客户证件类型'},
        { certificateCode : '客户证件号'}
    ];
    this.timer = null;
  };
  componentDidMount(){
      if(!this.events.progress){
        this.events.progress = (percent) => {
            var tempnum1 = parseInt(percent);
            this.setState({
                progressPer : tempnum1/100
            });
        }
    }
  };
  handDragOver = (e) => {
    e.preventDefault();
  };

  handDrop = (e) => {
    e.preventDefault();
    if(this.state.readFlag){
        this.setState(preState => { readFlag : !preState.readFlag});
        this.setProgressPer({data : 0, flag : true});
        var tarFile1 = e.dataTransfer.files[0];
        var inputFileType = tarFile1.name.match(/\.\w*$/)[0];
        if(inputFileType == '.xlsx' || inputFileType == '.xlsm' || inputFileType == '.xlsb' || inputFileType == '.xls' || inputFileType == '.csv'){
          var loader = new FileLoader(tarFile1, this.events, this.getTableData);
        }else{
            alert('请确保您提交的是表格文件!!!');
            window.location.reload();
        }
    }else{
        this.setState(
            { tirpFlag : true }
        );
    }
  };

  handChange = (e) => {
    e.preventDefault();
    if(this.state.readFlag){
        this.setState(preState => { readFlag : !preState.readFlag});
        this.setProgressPer({data : 0, flag : true});
        var tarFile2 = e.target.files[0] || '';
        if( tarFile2 != ''){
        var inputFileType = tarFile2.name.match(/\.\w*$/)[0];
        if(inputFileType == '.xlsx' || inputFileType == '.xlsm' || inputFileType == '.xlsb' || inputFileType == '.xls' || inputFileType == '.csv'){
          var loader = new FileLoader(tarFile2, this.events, this.getTableData);
        }else{
            alert('请确保您提交的是表格文件!!!');
            window.location.reload();
        }
        }else{
            alert('请输入表格文件!!!');
            window.location.reload();
        }
    }else{
        this.setState(
            { tirpFlag : true }
        );
    }

  };

  getTableData = (data) => {
      this.setState({
          tableData : data,
          getMessFlag : true
      });
  };

  setProgressPer = (obj) => {
    this.setState({
        progressPer : obj.data,
        progressFlag : obj.flag
    })
  }
  sendData = (e) => {
      const { tableData } = this.state;
      var _this = this;
      if(tableData != ''){
       myAjax({
            flag : 1,
            type : 'GET',
            data : JSON.stringify(tableData),
            url : '',
            success : () =>{ 
                _this.setState({
                    tableData : '',
                    tirpFlag : false,
                    getMessFlag : false,
                    readFlag : true
                });
            }
       }); 
    }
  }
  render(){
    var {
            tableData, 
            progressFlag, 
            progressPer,  
            getMessFlag,
            readFlag,
            tirpFlag
        } = this.state,
        tableItem = this.tableItem;
            console.log('最后的信息：',tableData);
    return (
      <div className="moreadd">
            <div className='moreadd__template'>
                请将你要上传的客户资料按照excel模板进行整理后上传，<a href="#">点击下载excel模板</a>
            </div>
            <div className="moreadd__input">
            <input  id='flie' type="file" onChange={this.handChange}/>
            <label htmlFor="flie" >请选择上传的excel表格</label>
                <span>{ tirpFlag ? '当前文件还未读取完成，请稍后' : ''}</span>
            </div>
            <div className='moreadd__progressbox'>
                { progressFlag && <div className='moreadd__progressbox__warp'>
                    <span className='moreadd__progressbox__char'>读取进度：</span>
                    <div className='moreadd__progressbox__bar'><ProgressBar percent={progressPer} width={100} height={10}/></div>
                    <span className='moreadd__progressbox__pro'>{progressPer * 100 + '%'}</span>
                </div>}
            </div>
            <div    className = 'moreadd__inpregion' 
                    onDragOver = { this.handDragOver } 
                    onDrop = { this.handDrop }>
                    请将您上传的表格拖到此区域中
            </div>
            <div className='moreadd__tirp'>                 
                {
                    getMessFlag  && <div className='moreadd__tirp__warp'>
                                <span>请查看提交的文档信息读取是否正确，如果单条信息有错误可以提交后在<i>客户资料查询与维护</i>
                                        中查找后进行修改，如果文档信息读取错误请查看源文件是否按模板要求填写</span>
                                <div className='moreadd__tirp__btn' onClick={this.sendData}>确认后提交</div>
                             </div>
                }
            </div> 
            {
                getMessFlag  &&
                <div className='moreadd__tablewarp'>
                    <div className='moreadd__tablewarp__cover'>
                    <table className='moreadd__tablewarp__table'>
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
                        <tbody className='moreadd__table__tbody'>
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
                </div>
            }
      </div>

    
    );
  }
}
    
MoreAdd.propTypes = {
  // data : PropTypes.array.isRequired
};
    
export default MoreAdd;