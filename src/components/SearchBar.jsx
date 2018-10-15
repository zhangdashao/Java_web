import React from 'react'
import { Form, Input, Button, DatePicker, Checkbox } from 'antd';
const { RangePicker } = DatePicker
const FormItem = Form.Item
class SearchBar extends React.Component {
  state = {
    fileName: '',
    start_ime: '',
    end_ime: '',
    isDownload: '',
  }
  onChangePickTime = (date, dateString) => {
    this.setState({
      start_ime:dateString[0],
      end_ime:dateString[1]
    })
  }
  onChangeInput = (e) => {
    this.setState({
      fileName: e.target.value
    })
  }
  onChangeCheckout = (e) =>{
    this.setState({
      isDownload: e.target.checked
    })
  }
  
  render() {
    const identify = this.props.status
    return (
      <div className="form-wrapper">
        <Form layout="inline">
          <FormItem label="文件名：">
            <Input value={this.state.fileName} onChange={this.onChangeInput} placeholder="请输入文件名" />
          </FormItem>
          <FormItem label={identify === 'waste' ? '删除时间' : '时间'}>
            <RangePicker onChange={this.onChangePickTime} />
          </FormItem>
          <FormItem>
            {
              identify === 'admin' && <Checkbox onChange={this.onChangeCheckout}>未下载</Checkbox>
            }
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={() => this.props.handleSearchOption('search', this.state.fileName)}>查询</Button>
            {/* <Button type="primary" onClick={this.resetForm}>重置</Button> */}
            {
              identify === 'waste' && <Button type="primary" onClick={()=>this.props.handleSearchOption('recover')}>批量恢复</Button>
            }
            {
              identify === 'user' && <Button type="primary" onClick={() => this.props.handleSearchOption('download')}>批量下载</Button>
            }
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default SearchBar