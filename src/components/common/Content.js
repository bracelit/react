import React,{Component}from'react'
import Axios from'axios'
class Content extends Component{
	componentWillMount(){
		Axios.post('https://recommender.predict.emarsys.cn/merchants/18BC49C88D345FEB/?pv=1914241868&xp=1&f=f%3APERSONAL_MOBILE_HOME%2Cl%3A18%2Co%3A0&cp=1&vi=281ADAA4D3D4C9F6&p=5743%7C1543194588')
		.then((data)=>{
			console.log(data)
		}).catch((err)=>{
			console.log(err)
		})
	}
}
export default Content;