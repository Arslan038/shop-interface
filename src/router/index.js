import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccountCreation from '../views/AccountCreation.vue'
import ManagerAccount from '../views/ManagerAccount.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import CompanyAccountCreation from '../views/CompanyAccountCreation.vue'
import Dashboard from '../views/Dashboard.vue'
import NewDiscount from '../views/NewDiscount.vue'
import NewCoupon from '../views/NewCoupon.vue'
import CouponValidity from '../views/CouponValidity.vue'
import NewNotification from '../views/NewNotification.vue'
import NotificationValidity from '../views/NotificationValidity.vue'
import CustomerSearch from '../views/CustomerSearch.vue'
import CurrentActions from '../views/CurrentActions.vue'
import MyDiscounts from '../views/MyDiscounts.vue'
import MyDiscountDetails from '../views/MyDiscountDetails.vue'
import MyCoupons from '../views/MyCoupons.vue'
import MyCouponDetails from '../views/MyCouponDetails.vue'
import MyNotifications from '../views/MyNotifications.vue'
import MyNotificationDetails from '../views/MyNotificationDetails.vue'
import CustomerGroup from '../views/CustomerGroup.vue'
import OnlineServices from '../views/OnlineServices.vue'
import MyServiceDetails from '../views/MyServiceDetails.vue'
import Bookings from '../views/Bookings.vue'
import History from '../views/History.vue'
import Membership from '../views/MyMembership.vue'
import Team from '../views/MyTeam.vue'
import SpecialOffers from '../views/SpecialOffers.vue'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-account',
    name: 'AccountCreation',
    component: AccountCreation
  },
  {
    path: '/manager-account',
    name: 'ManagerAccount',
    component: ManagerAccount,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/company-account-creation',
    name: 'CompanyAccountCreation',
    component: CompanyAccountCreation
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new-discount',
    name: 'NewDiscount',
    component: NewDiscount,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new-coupon',
    name: 'NewCoupon',
    component: NewCoupon,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new-notification',
    name: 'NewNotification',
    component: NewNotification,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/customer-search',
    name: 'CustomerSearch',
    component: CustomerSearch,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/current-actions',
    name: 'CurrentActions',
    component: CurrentActions,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-discounts',
    name: 'MyDiscounts',
    component: MyDiscounts,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-coupons',
    name: 'MyCoupons',
    component: MyCoupons,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-discount/:id',
    name: 'MyDiscountDetails',
    component: MyDiscountDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-coupon/:id',
    name: 'MyCouponDetails',
    component: MyCouponDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-notifications',
    name: 'MyNotifications',
    component: MyNotifications,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-notification/:id',
    name: 'MyNotificationDetails',
    component: MyNotificationDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/customer-group',
    name: 'CustomerGroup',
    component: CustomerGroup,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/online-services',
    name: 'OnlineServices',
    component: OnlineServices,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/service/:id',
    name: 'MyServiceDetails',
    component: MyServiceDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bookings',
    name: 'Bookings',
    component: Bookings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/membership',
    name: 'Membership',
    component: Membership,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team',
    name: 'MyTeam',
    component: Team,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/special-offers',
    name: 'SpecialOffers',
    component: SpecialOffers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
