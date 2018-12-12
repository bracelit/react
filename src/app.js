import React from 'react'
import {render} from'react-dom'
import App from './components/App';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './styles/common/base.css'
import './styles/base.less';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faHeart,faHeadset,faQuestion,faMapMarkerAlt,faClock,faCreditCard,faListUl,faHome,faGift,faShoppingCart,faUser,faSearch,faEllipsisH,faArrowLeft,faChevronRight,faCalendarCheck,faTruck} from '@fortawesome/free-solid-svg-icons'
library.add(faCheck,faHeart,faHeadset,faQuestion,faMapMarkerAlt,faClock,faCreditCard,faListUl,faHome,faGift,faShoppingCart,faUser,faSearch,faEllipsisH,faArrowLeft,faChevronRight,faCalendarCheck,faTruck)
render(
	 <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>, 
	document.getElementById('app')
)
