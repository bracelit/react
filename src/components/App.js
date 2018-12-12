import React,{Component} from 'react';
import Home from './pages/Home';
import {Route,Switch,Redirect,withRouter} from'react-router-dom';
import Sort from'./pages/Sort';
import Prefer from './pages/Prefer'
import My from './pages/My';
import Cart from'./pages/Cart';
import Login from './pages/Login';
import Reg from './pages/Reg';
import {Results} from './pages/Results';
import detail from './pages/Detail';
import axios from 'axios';
axios.defaults.baseURL='http://localhost:3000';
class App extends Component{
	render(){
		return <div className="container">
		<Switch>
		<Route path="/home" component={Home}/>
		<Route path="/sort" component={Sort}/>
		<Route path="/Login" component={Login}/>
		<Route path="/result" component={Results}/>
		<Route path="/Reg" component={Reg}/>
		<Route path="/prefer" component={Prefer}/>
		<Route path="/cart" component={Cart}/>
		<Route path="/my" component={My}/>
		<Route path="/detail/:id" component={detail}/>
		<Redirect from="/" to="/home" exact/>
		<Redirect to="/404"/>
		</Switch>
		</div>
	}
}
App=withRouter(App)
export default App;
