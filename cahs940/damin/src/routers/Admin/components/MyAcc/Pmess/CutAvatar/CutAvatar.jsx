import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './CutAvatar.css';
class CutAvatar extends Component{
    constructor(props){
        super(props);
        this.state={
            avatarUrl : '',
            retCanvasUrl : '',
            retCanvasBlobName : '',

        };
        this.cropper = '';
    }

    getAvatar = (e) => {
        e.preventDefault();
        var _this = this;
        var tarImg = e.target.files[0];
        this.setState({
            retCanvasBlobName : tarImg.name
        });
        if(tarImg.type.match('image')){
            if( tarImg.size > 2097152){
                alert('图片大小超过限制请重新选择图片上传！！！');
            }else{
                var reader = new FileReader();
                reader.readAsDataURL(tarImg);
                reader.onload =  (e) => {
                    _this.setState({
                        avatarUrl : e.target.result
                    });
                };
            }            
        }else{
            alert('请添加图片文件！！！');
        }
    }

    getCropData = () =>{
        const { cropper } = this;
        const { retCanvasBlobName } = this.state;
        const { sendCutImg } =this.props;
        var retCanvas = cropper.getCroppedCanvas();
        var retImgUrl = retCanvas.toDataURL();
        sendCutImg( retImgUrl );
        this.setState({
            retCanvasUrl : retImgUrl
        });
        retCanvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('avatar', blob, retCanvasBlobName);
            //AJAX写这里
        })
        // console.log('截取区域返回值：', cropper.getData());
        // console.log('图片容器返回值：', cropper.getContainerData());
        // console.log('图片返回值：', cropper.getImageData());
        // console.log('画布返回值：', cropper.getCanvasData());
    }

    render(){
        const { avatarUrl,  retCanvasUrl, retCanvasBlobName } = this.state;
        const { cropper } = this;
        // console.log('截取的图片：', cropper);
        // console.log('返回的canvasBlod名字:', retCanvasBlobName);
        return(
        <div className='cutavatarwarp'>
        <div className='cutavatar'>
            <div className='cutavatar__top'>
            <label>
                <span>上传图片</span>
                <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={this.getAvatar}/>
            </label>
            <i>支持图片格式jpeg,jpg,png,图片不超过2m</i>
            </div>
            <Cropper
                src = { avatarUrl || ''}
                className="cutavatar__cropper"
                ref={cropper => this.cropper = cropper}
                viewMode={1}
                // zoomable={false}
                preview='.cutavatar__cropper-preview'
                // style={{opacity: 0.5}}
                // Cropper.js options
                aspectRatio={1 / 1}
                autoCropArea={0.5}
                dragMode = 'move'
              />
              <img className='cutavatar__img' src={retCanvasUrl} alt=""/>
              <div className='cutavatar__btn' 
                onClick={this.getCropData}>提&nbsp;&nbsp;&nbsp;交</div>
        </div>
        </div>
        );
    }
}
export default CutAvatar;