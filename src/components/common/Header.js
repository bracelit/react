import React from 'react';
import '../../styles/header.less'
import {NavLink}from'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../styles/common/animate.css'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
export function Header(props){
	let fix=props.posi;
	return <ReactCSSTransitionGroup
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={2500}
          transitionLeaveTimeout={1500}
          transitionName="animated"
  >
	<div key="he" className="header animated fadeIn" style={{position:fix,background:(fix=="fixed")?"#fff":""}}>
	   <p><a></a><img src="https://ssl1.sephorastatic.cn/wcsfrontend/brand/sephoracollection/sephoracollection_144X60.png"/><NavLink to="/login">登录</NavLink></p>
	   <p><FontAwesomeIcon icon="search" /><input type="text" /></p>
	</div>
	</ReactCSSTransitionGroup>
}
