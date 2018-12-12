import React,{Component} from 'react'
import '../../styles/advert.less'
class Advert extends Component{
	constructor(props){
		super();
		this.state={
			status:true
		}
	}
	hide(){
		this.setState({
			status:false
		})
		this.props.advert(false)
	}
	render(){ return <div className="advert" style={{display:(this.state.status?'':'none')}}>
	 <a onClick={this.hide.bind(this)}></a>
	 <img src="https://m.sephora.cn/soa/images/app_download.jpg"/>
	</div>
}
}
export default Advert;