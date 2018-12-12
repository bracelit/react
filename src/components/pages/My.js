import React,{Component} from'react';
import '../../styles/my.less';
import {NoticeBar ,List} from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Item = List.Item;
import 'antd-mobile/dist/antd-mobile.css';
import Foryou from '../common/Foryou';
import {Footer} from '../common/Footer';
class My extends Component{
	constructor(){
		super();
		this.state={
			user:''
		}
	}
	componentDidMount(){
	let	users=window.localStorage.getItem('user');
	console.log(users)
	if(users){
		this.setState({user:users});
		this.refs.login.innerText='退出';
	}else{
		this.refs.login.innerText='登录';
		this.setState({user:'您还没有登录'});
		
	}
	}
	loginout(){
		if(this.refs.login.innerText=='退出'){
		window.localStorage.removeItem('user');
		this.props.history.push('/home')
		}else{
			this.props.history.push('/Login')
		}
	}
	render(){
		return <div className="my">
		<div><p>我的丝芙兰</p><span onClick={this.loginout.bind(this)} ref="login">退出</span></div>
		<div><p><img src={require('../../img/userImg.png')}/></p><p>{this.state.user}</p></div>
		<div><ul><li><p>200</p><p>会员积分</p></li><li><p>需补全</p><p>个人信息</p></li><li><p>0张</p><p>优惠卷</p></li></ul>
		</div>
			 	<NoticeBar mode="link" onClick={() => alert('1')}>
     		补全个人信息即可获得一张满388减50元优惠卷
    			</NoticeBar>
    	<NoticeBar mode="link" action={<span>查看详细</span>}>
             粉卡会员
        </NoticeBar>
        <div className="message"> <Item arrow="horizontal" extra={'所有订单'}>我的订单</Item>
        <ul><li><FontAwesomeIcon icon='credit-card'/><span>待支付</span></li>
        <li><FontAwesomeIcon icon='clock'/><span>处理中</span></li>
        <li><FontAwesomeIcon icon='truck'/><span>运输中</span></li>
        <li><FontAwesomeIcon icon='calendar-check'/><span>已完成</span></li>
        <li><FontAwesomeIcon icon='gift'/><span>积分兑礼</span></li>
		</ul>
		<ul>
				<li><FontAwesomeIcon icon='map-marker-alt'/><span>处理中</span></li>
				<li><FontAwesomeIcon icon='headset'/><span>处理中</span></li>
				<li><FontAwesomeIcon icon='question'/><span>处理中</span></li>
		</ul>
		<div className="guest"><div></div><p><span> <FontAwesomeIcon icon='heart'/>猜你喜欢</span></p></div>
    	</div>
    	<div className="like"><Foryou></Foryou></div>
    	<Footer />
		</div>
	}
}
export default My;