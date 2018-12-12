import React,{Component} from 'react'
import {Switch,Redirect,winthRouter,Route,NavLink} from 'react-router-dom'
import {Footer} from'../common/Footer'
import SortHeader from'../common/SortHeader'
import '../../styles/sort.less'
import GoodList from '../common/GoodList'
class  Sort extends Component{
	constructor(){
		super();
		this.state={
			menu:[
			 {
			 	title:'护肤',
			 	path:'/skin'},
			 {
			 	title:'彩妆',
			 	path:'/cosmetics'
			 },
			 {
			 	title:'香水',
			 	path:'/perfume'
			 },
			 {
			 	title:'工具',
			 	path:'/tool'
			 },
			 {
			 	title:'男士护肤',
			 	path:'/manskin'
			 },
			 {
			 	title:'洗浴护体',
			 	path:'/wash'
			 },
			 {
			 	title:'美发护发',
			 	path:'/hair'
			 },
			 {
			 	title:'礼物套装',
			 	path:'/gift'
			 },
			 {
			 	title:'独家发售',
			 	path:'/sale'
			 },
			 {
			 	title:'美丽学院',
			 	path:'/beauty'
			 }
			],
			currentTab:0,
		}
	}
	componentWillMount(){
		 let hash = window.location.hash.slice(1);//#list
        //找出对应索引值,默认第一个
        let currentTab = 0;
        this.state.menu.some((item,idx)=>{
       if(hash=='/sort'){
        	currentTab=0;
        }else{
        	 currentTab = idx;
            return (hash.indexOf(item.path)>-1)
        }
           
        });

        this.setState({
            currentTab
        });
	}
	handlerhash(item,index){
	    let {match,history}=this.props;
		let url=match.path+item;
		history.push({pathname:url,state:{id:'000'}});
		this.setState({
			currentTab:index
		})
	}
	render(){
		let {match}=this.props;
		let idx=this.state.currentTab;
	return <div className="sort">
	    <SortHeader ></SortHeader>
	    <div className="menuLeft">
	    	<div>
	    	{
	    		this.state.menu.map((item,index)=>{
	    		 return	<a key={item.path} className={index==this.state.currentTab?'active':''} to={item.path+'id'} onClick={this.handlerhash.bind(this,item.path,index)}>{item.title}</a>
	    		})
	    	}
	    	</div>
	    </div>
	    <div className="menuList">
	    <GoodList></GoodList>
	    </div>
		<Footer></Footer>
		</div> 
	}
}
export default Sort;