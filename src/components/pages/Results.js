import React,{Component} from'react'
import {  Result, Icon } from 'antd-mobile';
import {NavLink} from 'react-router-dom';
import 'antd-mobile/dist/antd-mobile.css';
import '../../styles/result.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export function Results (){
	return <div className="result">
	<div><NavLink to="/home"><FontAwesomeIcon icon="arrow-left" /></NavLink><p>丝芙兰</p></div>
	<Result
    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
    title="注册成功"
    message="所提交内容已成功完成验证"
  />
</div>
}
