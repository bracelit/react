import React,{Component} from'react';
import '../../styles/reg.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import { Toast, Result, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
let timer=null;
class Reg extends Component{
	constructor(props){
	  super(props);
	  this.state={
	  	checkname:'',
	  	sendcode:'获取验证码',
	  	getstatus:true,
	  	regstatus:false,
	  	code:false,phone:false,phonecode:false,pass:false,checkpass:false,
	  	codeValue:'',phoneValue:'',phoneCodeValue:'',passValue:'',checkpassValue:''
	  }
	}
	changeStatus(value){
		switch(value){
			case 'code':this.setState({code:true}) ;break;
			case 'phone':this.setState({phone:true}) ;break;
			case 'phonecode':this.setState({phonecode:true});break;
			case 'pass': this.setState({pass:true});break;
			case 'checkpass':this.setState({checkpass:true});break;
		}
	}
	codeReset(value){
	switch(value){
			case 'codeValue':this.setState({codeValue:''}) ;break;
			case 'phoneValue':this.setState({phoneValue:''}) ;break;
			case 'phoneCodeValue':this.setState({phoneCodeValue:''});break;
			case 'passValue': this.setState({passValue:''});break;
			case 'checkpassValue':this.setState({checkpassValue:''}) ;break;
		}
	}
	componentDidUpdate(nextProps, nextState){
		//监听状态的变化
		let{phoneValue,phoneCodeValue,passValue,checkpassValue}=this.state;
		if(phoneValue&&phoneCodeValue&&passValue&&checkpassValue){
this.setState({regstatus:true}) //注册按钮的样式变化
		}else if((phoneValue=='')||(phoneCodeValue=='')||(passValue=='')||(checkpassValue=='')){
			this.setState({regstatus:false})
		}
		if(phoneValue!=nextState.phoneValue){
			clearTimeout(timer);
	  		    timer=setTimeout(()=>{
		    	axios.post('http://127.0.0.1:3000/api/user/checkname',{
					us:this.state.phoneValue
				}).then((res)=>{
					this.setState({checkname:res.data});this.refs.text.innerText=res.data;
				}).catch((err)=>{
				   console.log(err)
				})
		    },800)
		}

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
		}
	}
	onChange(item,event){
		event.preventDefault();
		switch(item){
			case 'codeValue':this.setState({codeValue:event.target.value}) ;break;
			case 'phoneValue':this.setState({phoneValue:event.target.value}) ;
			break;
			case 'phoneCodeValue':this.setState({phoneCodeValue:event.target.value});break;
			case 'passValue': this.setState({passValue:event.target.value});break;
			case 'checkpassValue':this.setState({checkpassValue:event.target.value}) ;break;
		}
		
	}
	goback(){
		window.history.go(-1)
	}
	reg(){
		let arr=[false,false,false];//验证所有输入是否合法
		let {phoneValue,phoneCodeValue,passValue,checkpassValue}=this.state;
		switch(false){
			case /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/.test(phoneValue):
			 Toast.info('请输入正确的号码', 2);
			 break;
			case /^([A-z]|_)\w{5,11}$/.test(passValue):
			  Toast.info('密码格式不对', 2);
			  break;
			case passValue==checkpassValue:
			 Toast.info('两次密码输入不一致', 2);
			 break;
			default:
			axios.post('http://127.0.0.1:3000/api/user/reg',{
						us:phoneValue,
						pass:passValue,
						code:phoneCodeValue
					}).then((res)=>{
						this.props.history.push('/result')
					})
		}
	}
	sendcode(){
		let {phoneValue,sendcode,getstatus}=this.state;
		let _this=this;
				if(getstatus){
				if(phoneValue!=''&&/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/.test(phoneValue)){
				axios.post('http://127.0.0.1:3000/api/user/getcode',{
					email:phoneValue
				})
				_this.setState({getstatus:false,sendcode:30});//防止多次发送
				let code=30;//倒计时，定时器
				let time=setInterval(function(){
					code--;
					_this.setState({sendcode:code})
					if(code<=0){
						clearInterval(time);
						_this.setState({
							sendcode:'重新获取',
							getstatus:true})
					}
				},1000)
				}else{
		 Toast.info('请输入正确的号码', 3);
	}
	}else{
		 Toast.info('请勿重复发送', 3);
	}
}
	render(){
		let {checkname}=this.state;
		return <div className="reg"> 
		<p><FontAwesomeIcon onClick={this.goback.bind(this)} icon="arrow-left"/><NavLink to="/login">登录</NavLink></p>
		<p>注册</p>
		<div>
			<p style={{top:this.state.code&&'10px',fontSize:this.state.code&&'12px'}}>图形验证码</p>
			<input value={this.state.codeValue} onClick={this.changeStatus.bind(this,'code')} onChange={this.onChange.bind(this,event,'codeValue')}/>
			<i onClick={this.codeReset.bind(this,'codeValue')}  style={{display:!this.state.code&&'none'}}></i> <img src={require('../../img/create.jpg')}/></div>
		<div>
			<p ref='text' style={{top:this.state.phone&&'10px',fontSize:this.state.phone&&'12px',color:(checkname=='ok')?'green':'',color:(checkname=='登录')?'grey':'',color:(checkname=='用户名已存在')?'red':''}}>登录</p><input  value={this.state.phoneValue} onClick={this.changeStatus.bind(this,'phone')}  onChange={this.onChange.bind(this,'phoneValue')}/>
			<i onClick={this.codeReset.bind(this,'phoneValue') } style={{display:!this.state.phone&&'none'}}></i>
		</div>
		<div>
			<p style={{top:this.state.phonecode&&'10px',fontSize:this.state.phonecode&&'12px'}}>获取验证码</p>
			<input  value={this.state.phoneCodeValue} onClick={this.changeStatus.bind(this,'phonecode')} onChange={this.onChange.bind(this,'phoneCodeValue')}/>
			<i onClick={this.codeReset.bind(this,'phoneCodeValue')} style={{display:!this.state.phonecode&&'none'}}></i><span onClick={this.sendcode.bind(this)}>{this.state.sendcode}</span></div>
		<div>
			<p style={{top:this.state.pass&&'10px',fontSize:this.state.pass&&'12px'}}>密码6-11位</p><input  value={this.state.passValue} onClick={this.changeStatus.bind(this,'pass')} onChange={this.onChange.bind(this,'passValue') }/>
			<i onClick={this.codeReset.bind(this,'passValue')} style={{display:!this.state.pass&&'none'}}></i></div>
		<div>
			<p style={{top:this.state.checkpass&&'10px',fontSize:this.state.checkpass&&'12px'}}>确认密码</p>
			<input  value={this.state.checkpassValue} onClick={this.changeStatus.bind(this,'checkpass')} onChange={this.onChange.bind(this,'checkpassValue')}/>
			<i onClick={this.codeReset.bind(this,'checkpassValue')} style={{display:!this.state.checkpass&&'none'}}></i>
		</div>
		<p onClick={this.reg.bind(this)} style={{background:( this.state.regstatus)?'#000':'#999'}}>同意条款并注册</p>
		<p>___</p>
		<p>阅读<span>《丝芙兰用户协议》</span></p>
		</div>
	}
}
export default Reg;