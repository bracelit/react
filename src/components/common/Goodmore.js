import React,{Component} from 'react'
import '../../styles/goodmore.less'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../styles/common/animate.css'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class  Goodmore extends Component{
	constructor(){
		super();
		this.state={
			imgshow:true,
			list:[],
			imgUrl:['https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_skinfloor_20181129.jpg',
			'https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_mufloor_20181129.gif',
			'https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_toolfloor_20181129.jpg',
			'https://ssl3.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_manfloor_20181129.jpg',
			'https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_whatsnew_20181130.jpg',
			'https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_superbrand1-1_20181129.png'
			],
			sorts:['护肤','香水','工具']
		}
	}
	componentWillMount(){
		let arr=[];
		axios.get('/api/merchants/18BC49C88D345FEB/?pv=1914241868&xp=1&f=f%3APERSONAL_MOBILE_HOME%2Cl%3A18%2Co%3A0&cp=1&vi=281ADAA4D3D4C9F6&p=5743%7C1543194588')
		.then((res)=>{
			for(let key in res.data.products){
				arr.push(res.data.products[key])
			}
			this.setState({
				list:arr
			})
		}).catch((err)=>{
			console.log(err)
		})
		
	}
	imgonload(){
			setTimeout(()=>{
				this.setState({
				imgshow:false
			})
			},1000)
	}
	render(){
		let {list}=this.state;
		//这里拿到的数据都是对象，需要深拷贝和一系列处理
		let gooditem=[];
		let qty=4;
		let j=1;
		for(let i=0;i<3;i++){
		gooditem.push( 
		<div key={'div'+j++} className="goodmore"><div className="title">
		<p><span>{this.state.sorts[i]}</span><a><FontAwesomeIcon icon="ellipsis-h" /></a></p>
		<ReactCSSTransitionGroup
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={2500}
          transitionLeaveTimeout={1500}
          transitionName="animated"
  >
		<img key={'img'+j++} className="animated slideInLeft" src={this.state.imgUrl[i]}/>
		</ReactCSSTransitionGroup>
		</div>
		<div className="goodlist">
		{list.slice(i*qty,i*qty+1).map((item)=>{
		return <ul key={'ul'+j++}><li>
	 	<img src={item[10]}/>
		<p>{item[11]}</p>
		<p>{item[1]}</p>
		<p>{item[6].toFixed(2)}</p>
		</li>
		</ul>
		})}
	 <ul>{
	 	list.slice(i*qty+1,i*qty+5).map((item,key)=>{
	 		return <li key={item[0]}>
	 		<img style={{display:(this.state.imgshow)?'block':'none'}}  src="https://m.sephora.cn/soa/bundle/loading_nonbg.gif"/>
	 		<img src={item[10]} onLoad={this.imgonload.bind(this)}  style={{display:(this.state.imgshow)?'none':'block'}}/>
	 		<p>{item[11]}</p>
	  		<p>{item[1]}</p>
	 		<p>￥{item[6].toFixed(2)}~￥{(item[6]+100).toFixed(2)}</p>
	 	</li>
	 	})
	 	}
	 	</ul>
	 	</div>
	</div>)
		}
	return gooditem
	}
}
export default Goodmore;