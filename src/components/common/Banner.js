import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import '../../styles/banner.less'
import 'swiper/dist/js/swiper.min.js'
import {Header} from'./Header'
class Banner extends Component{
	constructor(props){
		super();
		this.state={
			scroTop:props
		}
	}
	render(){
		let isshow=this.props.top;
		return <div className="slide" style={{position:(isshow>50)?'':'relative'}}>
		<Header posi={isshow>50?'fixed':'absolute'}></Header>
		<div className="swiper-container" >
    <div className="swiper-wrapper">
        <div className="swiper-slide"><img src="https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_ptr_20181122.jpg"/></div>
        <div className="swiper-slide"><img src="https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_xmaswithmybff_20181115.jpg"/></div>
        <div className="swiper-slide"><img src="https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_bobbi_20181122.jpg"/></div>
    </div>
    {/*如果需要分页器*/ }
    <div className="swiper-pagination"></div>
</div>
</div>
	}
	componentDidMount(){
		var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      bulletActiveClass: 'active-white',
      bulletClass : 'white-square'
    },
  })    
	}
}
export default Banner;