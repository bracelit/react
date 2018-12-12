import React,{Component} from 'react';
import '../../styles/sortheader.less'
import {NavLink,winthRouter}from'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../styles/common/animate.css'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class  SortHeader extends Component{
	constructor(){
		super();
		this.state={
			
		}
	}
	back(){
		window.history.go(-1)
	}
	render(){
	return (<ReactCSSTransitionGroup
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={2500}
          transitionLeaveTimeout={1500}
          transitionName="animated"
  >
	<div key="header" className="sortheader animated fadeIn">
	 <a onClick={this.back.bind(this)}><FontAwesomeIcon icon="arrow-left" /></a><p><FontAwesomeIcon icon="search" /><input type="text" /></p><NavLink to="/Login">登录</NavLink>
	</div>
	</ReactCSSTransitionGroup>
	)}
}
export default SortHeader;