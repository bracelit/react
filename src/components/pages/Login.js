import React,{Component} from'react';
import '../../styles/login.less';
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
class Login extends Component{
	constructor(){
	  super();
	  this.state={
	  	slidestatus:false,
	  	pass:false,
	  	user:'',
	  	loginstatus:false,
	  	password:''
	  }
	}
	change(){
		this.setState({slidestatus:true})
	}
	componentDidUpdate(nextProps, nextState){
		//监听状态的变化
		let{user,password,loginstatus}=this.state;
		if(user&&password){
this.setState({loginstatus:true}) //注册按钮的样式变化
		}else if((user=='')||(password=='')){
			this.setState({loginstatus:false})
		}
		}
	changepass(){
		this.setState({pass:true})
	}
	getValue(event,item){
		switch(item){
			case 'user':
			this.setState({user:event.target.value});
			break;
			case 'pass':
			this.setState({password:event.target.value});
		}
	}
	goback(){
		window.history.go(-1)
	}
	shouldComponentUpdate(prevProps, nextState){
		let arr=[];//性能优化，状态无改变时，不更新
		let n=0;
		for( let key in this.state){
			if(this.state[key]==nextState[key]){
				n++
			}
				arr.push(this.state[key]);
		}
		if(arr.length==n){
			return false;
		}else{
			return true;
			console.log('ddd')
		}
	}
	logIn(){
	  		let _this=this;
	  		axios.post('http://127.0.0.1:3000/api/user/login',{
	  			us:this.state.user,
	  			pass:this.state.password
	  		}).then((res)=>{
	  			if(res.data!='登录失败'){
	  				Toast.info('登录成功，自动跳转', 3);
	  				 window.localStorage.setItem('user',_this.state.user);
	  				 setTimeout(function(){
	  				 	_this.props.history.push('/my')
	  				 })
	  			}else{
	  				Toast.info('用户名或密码错误', 3);
	  			}
	  		}).catch((err)=>{
	  			console.log(err);
	  		})
	  	}
	render(){
		return <div className="login"> 
		<div className="top">
		<p><FontAwesomeIcon onClick={this.goback.bind(this)} icon="arrow-left"/><span>手机验证码登录</span></p>
		<p>密码登录</p>
		</div>
		<div className="middle">
			<div onClick={this.change.bind(this)}>
			<p  style={{top:this.state.slidestatus&&'10px',fontSize:this.state.slidestatus&&'12px'}}>手机号/邮箱</p>
			<input value={this.state.phone} onChange={this.getValue.bind(this,event,'user')}/></div>
			<div onClick={this.changepass.bind(this)}><p  style={{top:this.state.pass&&'10px',fontSize:this.state.pass&&'12px'}}>密码</p>
			<input type="password" value={this.state.password} onChange={this.getValue.bind(this,event,'pass')}/></div>
			<p>忘记密码</p>
			<p style={{background:(this.state.loginstatus)?'#000':'#999'}} onClick={this.logIn.bind(this)}>登录</p>
			<p>___</p>
			<p><NavLink to="/reg">没有账号?免费注册</NavLink></p>
		</div>
		<div className="bottom">
			 <dl>
			    <dl><dt></dt><dd>新浪微博</dd></dl>
			    <dl><dt></dt><dd>QQ好友</dd></dl>
		 	</dl>
		</div>
		</div>
	}
}
export default Login;