import React from 'react';
import '../../styles/footer.less'
import {NavLink}from'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../styles/common/animate.css'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
export function Footer(){
    return <ReactCSSTransitionGroup
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={2500}
          transitionLeaveTimeout={1500}
          transitionName="animated"
  ><div key="fo" className="footer animated slideInUp">
    <NavLink  to="/home" activeClassName="active"><FontAwesomeIcon icon="home" />首页</NavLink>
    <NavLink to="/sort" activeClassName="active"><FontAwesomeIcon icon="list-ul" />分类</NavLink>
    <NavLink to="/prefer" activeClassName="active"><FontAwesomeIcon icon="gift" />优惠</NavLink>
    <NavLink to="/cart" activeClassName="active"><FontAwesomeIcon icon="shopping-cart" />购物车</NavLink>
    <NavLink to="/my" activeClassName="active"><FontAwesomeIcon icon="user" />我的</NavLink>
    </div>
    </ReactCSSTransitionGroup>
}