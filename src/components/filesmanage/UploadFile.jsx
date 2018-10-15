import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Upload, Icon, message, Button,Input } from 'antd';
import reqwest from 'reqwest'

const Dragger = Upload.Dragger;
const { TextArea } = Input;



class UploadFile extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: '//jsonplaceholder.typicode.com/posts/',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }
  
  render() {
    const { uploading } = this.state;
    const props = {
      name: 'file',
      multiple: false,
      action: '//jsonplaceholder.typicode.com/posts/',
     
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        if (this.state.fileList.length > 0) {
          message.warning("仅限上传一个文件！")
          return
        }
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    const btnStyle = {
      'display': 'block',
      'margin': '0 auto',
      'margin-top': '20px',
    }

    return (
      <div className="gutter-example">
        <BreadcrumbCustom first="文件管理" second="上传文件" />
        <div className="container" style={{'padding-top':'50px'}}>
          <div style={{width:'30%',margin: '0px auto'}}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
            
          </div>
          <div style={{ width: '30%', margin: '0 auto', padding: '15px' }}>
            <TextArea rows={4} placeholder="请在里面输入备注" />
            <Button
              size="large"
              style={btnStyle}
              className="upload-demo-start"
              type="primary"
              onClick={this.handleUpload}
              disabled={this.state.fileList.length === 0}
              loading={uploading}
            >
              {uploading ? '上传中' : '开始上传'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default UploadFile