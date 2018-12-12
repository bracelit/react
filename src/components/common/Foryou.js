import React,{Component} from 'react'
import '../../styles/Foryou.less'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class  Foryou extends Component{
	constructor(){
		super();
		this.state={
			list:[],
			imgshow:true,
			imgUrl:['https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_seasonalselection_20181127.jpg',
			'https://ssl2.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_quicklook_20181129.jpg',
			'https://ssl3.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_bestfriend_20181121.jpg',
			'https://ssl4.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_ranking_20181127.jpg',
			'https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_whatsnew_20181130.jpg',
			'https://ssl1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2018/11/banner/m_superbrand1-1_20181129.png'
			]
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
	return 	(<div className="foryou">
	<p style={{display:'flex',justifyContent:'space-between',fontSize:'20px',lineHeight:'50px'}}><span>为你而选</span><a><FontAwesomeIcon icon="ellipsis-h" /></a></p>
	 <ul>{
	 	list.map((item,key)=>{
	 		return <li key={item[0]}>
	 		<img style={{display:(this.state.imgshow)?'block':'none'}}  src="https://m.sephora.cn/soa/bundle/loading_nonbg.gif"/>
	 		<img src={item[10]} onLoad={this.imgonload.bind(this)}  style={{display:(this.state.imgshow)?'none':'block'}}/>
	  		<p>{item[11]}</p>
			<p>{item[1]}</p>
			<p>￥{item[6].toFixed(2)}</p>
	 	</li>
	 	})
	 	}
	 	</ul>
	</div>)
	}
}
export default Foryou;