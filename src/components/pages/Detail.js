import React,{Component}from'react';
import axios from'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, WhiteSpace ,List} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import '../../styles/detail.less';
import Foryou from '../common/Foryou';
import {cart} from '../../actions';
import {connect} from 'react-redux';
const Item = List.Item;
const Brief = Item.Brief;
class Detail extends Component{
	constructor(){
		super();
		this.state={
			data:[],
			tabs :[
  { title: '商品' },
  { title: '详情' },
  { title: '评价' },
],
results:{},
		}
	}
	componentWillMount(){
let id=this.props.match.params.id;
if(id){
	axios.get('https://api.sephora.cn/v1/product/sku/optionalSkuSpec?skuId=&channel=MOBILE&isPromotion=true',{params:{
   	productId:id
   }}).then((res)=>{
   	if(res.status==200){
   			this.setState({
   				results:res.data.results
   			})
   	}
   }).catch((err)=>{
   	console.log(err)
   })
}
	}
	goback(){
		window.history.go(-1);
	}
	gotocart(){
		this.props.history.push('/cart');
	}
	addToCart(val){
		console.log(val.shareDto.imageUrl);
		let count=1;
		let goods={imgurl:val.shareDto.imageUrl,title:val.productCN,subtitle:val.productEN,price:val.currentSkuOfferPrice,qty:'',status:false,proId:val.productId};
		let has = this.props.cartlist.filter(item=>{
            return item.proId==goods.proId
        });
        if(has.length){
            // 存在
            
            count++;
            this.props.changeQty(goods.proId,count);
        }else{
            goods.qty = 1;
            this.props.addToCart(goods);
        }
	}
	renderTabBar(props) {
  return (<Sticky>

  </Sticky>);
}
	render(){
		let status=false;
		let tag=false;
		if(this.state.results.productCN){
			if(this.state.results.tagsList[0]){
				tag=true;
			}
			status=true;
			}
		return (<div className="detail">
			<div className="top">
				<div className="left"><FontAwesomeIcon onClick={this.goback.bind(this)} icon="arrow-left"/>
				</div><div className="right"><FontAwesomeIcon onClick={this.goback.bind(this)} icon="ellipsis-h"/></div>
		  	</div>
    <StickyContainer>
      <Tabs tabs={this.state.tabs}
        initalPage={'t2'}
      >
        <div className="detailgood" style={{ display: 'block', alignItems: 'center', justifyContent: 'center'}}>
          <img className="imgs" src={status?this.state.results.shareDto.imageUrl:''}/>
          <p>{this.state.results.productCN} </p>
          <p>{this.state.results.productEN}</p>
          <p>{status?this.state.results.shareDto.text:''}</p>
          <p><span>￥{this.state.results.currentSkuOfferPrice}</span><span>{tag?this.state.results.tagsList[0].tagValue:'新品'}</span></p>
         	 <List className="my-list">
         	 <WhiteSpace />
       			 <Item arrow="horizontal" multipleLine onClick={() => {}}>
         		 促销详情
       			 </Item>
        		<Item
        	  arrow="horizontal"
         		 multipleLine
         		 onClick={() => {}}
          		platform="android"
      			  >
         		请选择 &nbsp;其他
        		</Item>
        		<Item
          	arrow="horizontal"
         	 thumb={require('../../img/guer.png')}
        	  multipleLine
         	 onClick={() => {}}
       		 >
         	 娇兰 
        	</Item>
  				</List>
  			<Foryou />
        </div>
        <div className="subdetail" style={{ display: 'block',height:'250px',alignItems: 'center', justifyContent: 'center' }}>
         详情
        </div>
        <div className="discuss" style={{ display: 'block',height:'300px', alignItems: 'center', justifyContent: 'center'}}>
          评价
        </div>
      </Tabs>
    </StickyContainer>
    					<ul className="cart">
    					<li onClick={this.gotocart.bind(this)}>
    						<p><FontAwesomeIcon icon="shopping-cart"/></p>
                            <p>购物车</p>
						</li>
    						<li>
    						<p><FontAwesomeIcon icon="headset"/></p>
    						 <p>在线客服</p>
    						</li><li onClick={this.addToCart.bind(this,this.state.results)}>加入购物车</li><li>立即购买</li>
						</ul>
		  	</div>)
	}
}
let mapStateToProps=state=>({cartlist:state.cartReducer.goodslist});
let mapDispatchToProps = dispatch=>{
    return {
        // 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            dispatch(tabbar(status));
        },
        addToCart(goods){
            dispatch(cart.add(goods))
        },
        changeQty(proId,qty){
            dispatch(cart.change(proId,qty))
        }
    }
}
Detail= connect(mapStateToProps,mapDispatchToProps)(Detail);
export default Detail;