import React,{Component} from 'react';
import '../../styles/goodlist.less'
import {Route}from'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
class  GoodList extends Component{
	constructor(){
		super();
		this.state={
			list:[]
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
	render(){
		let {list}=this.state;
		let qty=3;
		let gooditem=[];
		let j=1;
		for(let i=0;i<6;i++){
	gooditem.push(list.slice(i*qty,i*3+qty).map((item)=>{
	 
	return  <div key={'good'+j++}>
		<p className="top"><span>文字</span><a> <FontAwesomeIcon icon="chevron-right"/></a></p>
		<ul>
			<li><img src={item[10]}/><p>{item[1]}</p></li>
			<li><img src={item[10]}/><p>{item[1]}</p></li>
			<li><img src={item[10]}/><p>{item[1]}</p></li>
		</ul>
	</div>
		})	)
	}
	return <div className="goodlist">
	<img style={{width:'100%',display:'block'}} src="https://ssl2.sephorastatic.cn/wcsfrontend/campaign/toplist/mobile/m_navigation_makeup_20181025.jpg" />
	{gooditem}
	</div>
	}
}
export default GoodList;