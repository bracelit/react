// 关于购物车的actions creater
import * as cart from './cartActions';//{add,remove,change}//所有export组合成obj

export function tabbar(status){
    return {
        type:'CHANGE_TABBAR_STATUS',
        payload:status
    }
}

export {cart};