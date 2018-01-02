import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
// import moment from 'moment';
import { Col, Button, Input, Form, Icon } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router';
import openNotificationWithIcon from './notification_ant/Notifications';
import {addclickrequest, loginrequest} from "./actions";
import {connect} from 'react-redux';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:'',
			errorText: '',
			success: false,
		};
		this.handSubmit = this.handSubmit.bind(this);
	}
	// HandChange(e) {
	// 	let value = e.target.value;
	// 	let name = e.target.name;
	// 	let _state = this.state;
	// 	_state[name] = value;
	// 	this.setState({_state});
	// }
	handSubmit(e){
		e.preventDefault();
        const { form } = this.props;
        this.props.loginrequest(form.getFieldValue('email'), form.getFieldValue('password'))
		console.log(this.props);
        // const { form } = this.props;
        // let email = form.getFieldValue('email')
		// let pass = form.getFieldValue('password')
		// let self = this;
		// axios.post('https://api-dev.terra-utm.com/v1/login', {
		//     email: email,
		//     password: pass
		//   })
		//   .then(function (response) {
		//   	// console.log(response)
		//   	if (response.data.data.token) {
		//     	localStorage.setItem('token', response.data.data.token);
		//     	self.setState({success: true});
		// 		console.log(response.data.status);
		//   		openNotificationWithIcon('success');
		//   	}
		//   })
		//   .catch(function (response) {
		//   	if (response.response) {
		//   		self.setState({errorText: response.response.data.error.message})
		// 		console.log(this.props.form)
		//   	}
		//   });
	}
    onSubmit(e) {
		e.preventDefault();
		console.log("cctn");
	}
	render() {
		console.log(this.props);
        const { getFieldDecorator } = this.props.form;
		if (this.state.success || localStorage.getItem('token')) {
			return (
				<Redirect to="/listuser"/>
			)
		}
		return (
			<Col md={{span: 8, offset: 8}} xs={{span: 24}}>
				<Form layout="horizontal" onSubmit={this.handSubmit}>
					<Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: false, message: 'this.state.errorText' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                        )}
					</Form.Item>
					<Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: false, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">Submit</Button>
					</Form.Item>
					{this.state.errorText && <p className="error">{this.state.errorText}</p>}
                    <Form.Item
                        label={this.state.errorText}
                        hasFeedback
                        // validateStatus="error"
                    >
                    </Form.Item>

				</Form>
                <Form layout="inline" onSubmit={this.onSubmit}>
                    <Form.Item label="name">
                        {getFieldDecorator('name',) (<Input />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
			</Col>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		email: state.email,
		password: state.password
	}
}
const WrappedNormalLoginForm = Form.create()(Login);
export default connect(mapStateToProps, {loginrequest})(WrappedNormalLoginForm);