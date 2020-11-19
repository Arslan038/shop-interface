import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/User'
import Discount from './modules/Discount'
import Coupon from './modules/Coupon'
import Notification from './modules/Notification'
import OnlineService from './modules/OnlineService'
import Booking from './modules/Booking'
import Membership from './modules/Membership'
import Team from './modules/Team'
import Cart from './modules/Cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Discount,
    Coupon,
    Notification,
    OnlineService,
    Booking,
    Membership,
    Team,
    Cart
  }
})
