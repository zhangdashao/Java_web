/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Tooltip, Select, message } from 'antd';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../action'
import $api from '../../api'
import { baseURL } from '../../axios/config'

const FormItem = Form.Item;

const Option = Select.Option;


class LoginJL extends React.Component {
  state = {
    imgURL: '',
    projectList: []
  }
  componentWillMount() {
    this.changeValidateCode()
    this._getAllProject()
  }
  componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
    const { auth: nextAuth = {}, history } = this.props;
    // const { history } = this.props;
    if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
      localStorage.setItem('user', JSON.stringify(nextAuth.data));
      history.push('/');
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this._login(values)
      }
    });
  };
  /**点击变更验证码 */
  changeValidateCode = () => {
    this.setState({
      imgURL: `${baseURL}/util/createValidCode?random=${Math.random()}`
    })
  }
  /**获取所有项目 */
  _getAllProject = () => {
    $api.selectAllProjectInfo().then(res => {
      if (res.code === '200') {
        this.setState({
          projectList: res.data
        })
      }
    }).catch(() => {
      message.warning('获取项目列表失败');
    })
  }
  /**登录用户，并对用户登录做出相应操作 */
  _login = (values) => {
    $api.login(values).then(res => {
      if (res.code === '200') {
        const { saveInfo } = this.props;
        saveInfo({
          role_desc: res.data.role_desc,
          project_id: res.data.project_id,
          token: res.data.token,
          urlList: res.data.urlList
        })
      }
    }).catch(() => {
      message.warning('登录失败')
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-form" >
          <div className="login-logo">
            <span>文件管理系统</span>
          </div>
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
            <FormItem>
              {getFieldDecorator('user_account', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('user_password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('project_id', {
                rules: [{ required: true, message: '项目id!' }],
              })(
                <Select>
                  {this.state.projectList.map(item => {
                  return (
                    <Option key={item.project_code} value={item.project_code}>{item.project_name}</Option>
                  )
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Tooltip placement="topLeft" title="点击切换验证码">
                <img src={this.state.imgURL} onClick={this.changeValidateCode} alt="666" />
              </Tooltip>
              {getFieldDecorator('validCode', {
                rules: [{ required: true, message: '验证码' }],
              })(
                <Input type="text" placeholder="请输入验证码" />
              )}
            </FormItem>
            <FormItem>
              {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a> */}
              <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                登录
                            </Button>
              {/* <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a href="">或 现在就去注册!</a>
                                <a onClick={this.gitHub} ><Icon type="github" />(第三方登录)</a>
                            </p> */}
            </FormItem>
          </Form>
        </div>
      </div>

    );
  }
}

const mapStateToPorps = state => {
  const { auth } = state.httpData;
  return { auth };
};
const mapDispatchToProps = dispatch => ({
  saveInfo: value => {
    dispatch(saveUserInfo(value))
  }
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(LoginJL));