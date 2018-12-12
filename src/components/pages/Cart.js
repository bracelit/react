import React,{Component} from'react';
import {Footer} from '../common/Footer';
import {NoticeBar ,List,Checkbox} from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {cart as cartAction} from '../../actions';
import {connect} from 'react-redux';
const Item = List.Item;
import 'antd-mobile/dist/antd-mobile.css';
import '../../styles/cart.less';
class Cart extends Component{
	constructor(){
		super();
		this.state={
			data:[]
		}
	}
	goback(){
		window.history.go(-1);
	}
	componentWillMount(){
		this.setState({
			data:[...this.props.goodslist]
		})
	}
	reduce(){
		console.log('-')
	}
	add(){
		console.log('+')
	}
	render(){
	return <div className="cart">
	<div><span onClick={this.goback.bind(this)}><FontAwesomeIcon icon="arrow-left"/></span><p>购物车</p></div>
	<div className="cartlist">
	{
		this.state.data.map((item)=>{
			return (<div key={item.proId}>
			<ul>
			<li><Checkbox/></li>
			<li><img src={item.imgurl}/></li>
			<li>
				<p>{item.title}</p>
				<p>{item.subtitle}</p>
				<p>￥{item.price} <span onClick={this.reduce.bind(this)}>-</span><input value={item.qty}/><span onClick={this.add.bind(this)}>+</span></p>
				<p>编辑<FontAwesomeIcon icon="chevron-right"/></p>
			</li>
			</ul>
			
		</div>)
		})
	}
	</div>
	<Footer></Footer>
	</div>
	}
}
let mapStateToProps = state=>{
	return {
		goodslist:state.cartReducer.goodslist
	}
}
let mapDispatchToProps = dispatch=>{
	return {
		remove(proId){
			dispatch(cartAction.remove(proId))
		},
		changeQty(proId,qty){
			console.log(proId,qty)
			dispatch(cartAction.change(proId,qty))
		}
	}
}
Cart = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default Cart;