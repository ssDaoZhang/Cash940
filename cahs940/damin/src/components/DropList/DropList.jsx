/*
需要传入的参数：

	data   下拉列表选项
	类型: Array
	样式: [
		{ code : 'string', name : 'string', mark :  'string' },
		{ code : '选项名对应的值，需要显示，与mark二选一', 
		  name : '必须参数选项名，需要显示', 
		  mark :  '选项名对应的值，不做显示，与code二选一'' 
		}
    ]
    
	iconHeight	默认选项的高度height
	类型：String
    样式：'10px'  '10em'   em参考字体大小16px
    
	opWarpPosTop    下拉表warp相对于默认选项的top
	类型：String
    样式：'10px'  '10em'   em参考字体大小16px
    
	opWarpwidth    	可以设置下拉表warp(及下来列表选项)的width
	类型：String
    样式：'10px'  '10em'   em参考字体大小16px
    
	opheight		可以设置下拉表选项的height, 下拉表warp的height = 4 * opheight	
	类型：String
    样式：'10px'  '10em'   em参考字体大小16px
    
	callFuc		获取用户选中的选项的code或mark
	类型：Function 		
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import './DropList.css';
class DropList extends Component{
    constructor(props){
        super(props);
        this.state = {
            showList : false,
            selectedCode : this.props.data[0].code || '',
            selectedName : this.props.data[0].name || '',
            selectedMark : this.props.data[0].mark || ''
        }
        this.props.callFuc( this.props.data[0]);
    }
    setSelectedCode = (obj) => {
        this.setState({
            selectedCode : obj.code,
            selectedName : obj.name,
            selectedMark : obj.mark
        });
        //obj.code || obj.mark
        this.props.callFuc(obj);
    }
    triggerShowList = (e) => {
        this.setState({
            showList : true
        });
    }
    hiddenShowList = (e) => {
        this.setState({
            showList : false
        });
    }

    render(){
        let { showList, selectedCode, selectedName} =this.state;
        // console.log(' this.porps:', this.props);
        const { data, opWarpPosTop, iconHeight, opWarpwidth, opheight } = this.props;
        const iconstyle = { height : iconHeight };
        const opWarpstyle = { top : opWarpPosTop };
        var opstyle = {},
            opboxstyle = {};
            if( opWarpwidth && opheight){
                opWarpstyle.width = opWarpwidth;
                opWarpstyle.height = 5 * Number(opheight.match(/\d+/g)[0]) + opheight.match(/\D+/g)[0];
                opboxstyle = {
                    height : 6 * Number(opheight.match(/\d+/g)[0]) + opheight.match(/\D+/g)[0]
                }
                opstyle = { 
                    height : opheight
                }
            }
        return(
                <div className='droplist' onMouseLeave={this.hiddenShowList}>
                    <div className='droplist__item' onClick={this.triggerShowList} style={iconstyle}>
                       {selectedCode && <span>区号</span> }
                        <span>{selectedCode || selectedName}</span>
                        <i></i>
                    </div>
                    { showList && <div className='droplist__optionwarp' style={opWarpstyle}>
                        <ul className='droplist__option' style={opboxstyle}>
                        {
                            data.map( 
                                       (ele, index) => <li  style={ opstyle }
                                                            className={`${selectedName === ele.name && 'activeLi'}`}
                                                            key={ele.name} 
                                                            onClick={()=>{this.setSelectedCode({name:ele.name, code:ele.code, mark:ele.mark})}}>
                                                            <span>{ele.name}</span>
                                                            { ele.code && <span>{ele.code}</span>}
                                                        </li>
                             )
                        }
                        </ul>
                    </div>}
                </div>
        )
    }
}

export default DropList;