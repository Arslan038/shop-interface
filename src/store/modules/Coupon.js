import axios from 'axios'

const state = {
    isCouponCreated: null,
    services: [],
    coupons: [],
    isCouponDeleted: null,
    couponDetails: null,
    isCouponUpdated: null
}

const getters = {
    getCouponCreated: state => state.isCouponCreated,
    getServices: state => state.services,
    getCoupons: state => state.coupons,
    getCouponDeleted: state => state.isCouponDeleted,
    getCouponDetails: state => state.couponDetails,
    getCouponUpdated: state => state.isCouponUpdated
}

const actions = {
    // Create New Coupon
    createCoupon({commit}, payload) {
        commit('setCouponCreated', null)
        axios.post(baseURL+'create/'+payload.id+'/7', payload.data).then(result => {
            console.log(result)
            if(result.status == 200) {
                commit('setCouponCreated', 'success')
            }
            else {
                commit('setCouponCreated', 'failed')
            }
        }).catch(err => commit('setCouponCreated', 'success'))
    },

    // Fetch List of Existing Services
    fetchListOfExistingServices({commit}, payload) {
        commit('setListOfServices', null)
        axios.get(baseURL+'getall/'+payload.id+'/4').then(result => {
            if(result.status == 200) {
                commit('setListOfServices', result.data.List)
            }
        })
    },

    // FETCH CREATED COUPONS
    fetchCoupons({commit}, payload) {
        commit('setCoupons', null)
        axios.get(baseURL+'getall/'+payload.id+'/7').then(result => {
            if(result.status == 200) {
                commit('setCoupons', result.data.List)
            }
        })
    },


    // DELETE COUPON
    deleteCoupon({commit, dispatch}, payload) {
        commit('setCouponDeleted', null)
        axios.post(baseURL+'changestatus/'+payload.id+'/7/'+payload.couponId+'/4').then(result => {
            if(result.status == 200) {
                commit('setCouponDeleted', 'success')
                dispatch('fetchCoupons', payload)
            }
            else {
                commit('setCouponDeleted', 'failed')
            }
        })
    },

    // COUPON DETAILS
    couponDetails({commit}, payload) {
        commit('setCouponDetails', null)
        axios.get(baseURL+'get/'+payload.id+'/7/'+payload.couponId).then(result => {
            if(result.status == 200) {
                commit('setCouponDetails', result.data)
            }
        })
    },

    //UPDATE COUPON
    updateCoupon({commit}, payload) {
        commit('setCouponUpdated', null)
        axios.post(baseURL+'update/'+payload.id+'/7/'+payload.couponId, payload.data).then(result => {
            if(result.status == 200) {
                commit('setCouponUpdated', 'success')
            }
            else {
                commit('setCouponUpdated', 'failed')
            }
        }).catch(() => commit('setCouponUpdated', 'failed'))
    }
}

const mutations = {
    setCouponCreated: (state, payload) => state.isCouponCreated = payload,
    setListOfServices: (state, payload) => state.services = payload,
    setCoupons: (state, payload) => state.coupons = payload,
    setCouponDeleted: (state, payload) => state.isCouponDeleted = payload,
    setCouponDetails: (state, payload) => state.couponDetails = payload,
    setCouponUpdated: (state, payload) => state.isCouponUpdated = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}