import React,{Component} from 'react';
import '../../styles/backtop.less';
import '../../styles/common/animate.css'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
export  function BackTop(props){
	let isshow=props.top<50?true:false;
	function back(){
		document.documentElement.scrollTop=0;
	}
	return <ReactCSSTransitionGroup
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={2500}
          transitionLeaveTimeout={1500}
          transitionName="animated"
  >
	<div onClick={back} className="backtop animated fadeIn" style={{display:(isshow&&'none')}}>
	<img src="https://s1.sephorastatic.cn/wcsfrontend/campaign/mobile_img/2016/09/newarrival0909/images/topGO2.png"/>
	</div>
	</ReactCSSTransitionGroup>
}
