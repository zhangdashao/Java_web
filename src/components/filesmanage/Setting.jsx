import React from 'react'
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class Setting extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 14,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 15
        },
      },
    };


    return (
      <Form style={{ width: '36%', margin: '50px auto' }} onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入姓名',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="医院"
        >
          {getFieldDecorator('hospital', {
            rules: [{
              required: true, message: '请输入医院',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="职位"
        >
          {getFieldDecorator('position', {
            rules: [{
              required: true, message: '请输入职位',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入你的手机号' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="原始密码"
        >
          {getFieldDecorator('oldPassword', {
            rules: [{
              required: true, message: '请输入原密码',
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入新密码',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true, message: '请输入确认密码',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ]
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">确认修改</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Setting);
