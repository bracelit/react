import React,{Component} from 'react'
import Banner from'../common/Banner'
import '../../styles/home.less'
import Advert from'../common/Advert'
import {Footer} from'../common/Footer'
import Goods from'../common/Goods'
import Goodmore from'../common/Goodmore'
import Foryou from'../common/Foryou'
import {BackTop} from '../common/BackTop'
class Home extends Component{
	constructor(){
		super();
		this.state={
			scroTop:'',
			advertStatus:true,
			data:[
			{
				src:"https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/sale.png",
				text:"畅销榜单"
			},
			{	src:"https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/office.png",
				text:"本周特惠"
			},
			{
				src:"https://ssl3.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/daily.png",
				text:"每日惊喜"
			},
			{
				src:"https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/new.png",
				text:"精品速递"
			},
			{
				src:"https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/gift.png",
				text:"礼物套装"
			},
			{
				src:"https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/all_brand.png",
				text:"全部品牌"
			},
			{
				src:"https://ssl3.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/06/banner/exclusive.png",
				text:"独家发售"
			},
			{
				src:"https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/beautifuls.png",
				text:"美丽课堂"
			},
			{
				src:"https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/meeting.png",
				text:"会员中心"
			},
			{
				src:"https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2017/07/banner/all.png",
				text:"更多"
			}
			]
		}
		this.render=this.render.bind(this);
		this.watchScroll=this.watchScroll.bind(this)
		this.advert=this.advert.bind(this)
	}
	watchScroll(){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		 this.setState({
		 	scroTop:scrollTop,
		 })
	}
	advert(hide){
		this.setState({
			advertStatus:hide
		})
	}
	componentDidMount(){
		addEventListener('scroll',this.watchScroll,false);
	}
	componentWillUnMount(){
		removeEventListener('scroll',this.watchScroll);
	}
	render(){
		let {data}=this.state;
		let top=this.state.scroTop;
		return (<div>
		{top<=50&&this.state.advertStatus?(<Advert advert={this.advert}></Advert>):''}
		<Banner top={top}></Banner>
		<div className="main">
		<div className="sortList">
		{
		 data.map((item,idx)=><a key={item.text}><img src={item.src}/>
		<p>{item.text}</p></a>)
		}
		</div>
		<Goods></Goods>
		{top>1550?(<Goodmore></Goodmore>):''}
		{top>2700?(<Foryou></Foryou>):''}
		</div>
		<Footer></Footer>
		<BackTop top={top}></BackTop>
		</div>
		)
	}
	
}
export default Home;