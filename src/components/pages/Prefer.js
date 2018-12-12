import React,{Component} from'react'
import Advert from '../common/Advert'
import '../../styles/prefer.less'
import SortHeader from '../common/SortHeader'
import Foryou from '../common/Foryou'
import {BackTop} from '../common/BackTop'
class  Prefer extends Component{
	constructor(){
		super();
		this.state={
			scroTop:'',
			advertStatus:true
		}
		this.advert=this.advert.bind(this);
		this.watchScroll=this.watchScroll.bind(this);
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
	render(){
	let top=this.state.scroTop;
	return <div className="prefer">
	{top<50&&this.state.advertStatus?(<Advert advert={this.advert}></Advert>):(<SortHeader />)}
	<div className="imglist">
	<img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_01.jpg"/>
	<img src="https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_02.jpg"/>
	<img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_03.jpg"/>
	<img src="https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_04.jpg"/>
	<img src="https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_05.jpg"/>
	<img src="https://ssl3.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_06.jpg"/>
	<img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_07.jpg"/>
	<img src="https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_08.jpg"/>
	<Foryou />
	<img src="https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/ws20181128/images/ws20181128_10.jpg"/>
	</div>
	<BackTop top={top} />
	</div>
	}
}
export default Prefer;