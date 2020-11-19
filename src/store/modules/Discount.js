import axios from 'axios'

const state = {
    discountTypes: [],
    lisOfGroups: null,
    isDiscountCreated: null,
    discounts: null,
    isDiscountDeleted: null,
    discountDetails: null,
    isDiscountUpdated: null
}

const getters = {
    getListOfGroups: (state) => state.lisOfGroups,
    getDiscountCreated: state => state.isDiscountCreated,
    getDiscounts: state => state.discounts,
    getDiscountDeleted: state => state.isDiscountDeleted,
    getDiscountDetails: state => state.discountDetails,
    getDiscountUpdated: state => state.isDiscountUpdated
}

const actions = {
    // Fetch List Of Groups
    fetchListOfCustomerGroups({commit}, payload) {
        commit('setListOfCustomerGroups', null)
        axios.get(baseURL + "getall/"+payload.id+"/46").then(res => {
            commit('setListOfCustomerGroups', res.data.List)
        })
    },

    // Create New Discount
    createDiscount({commit}, payload) {
        commit('setNewDiscount', null)
        let id = payload.id
        delete payload.id
        axios.post(baseURL+'create/'+id+'/11', payload).then(result => {
            if(result.status == 200) {
                commit('setNewDiscount', 'success')
            }
            else {
                commit('setNewDiscount', 'failed')
            }
        }).catch(err => commit('setNewDiscount', 'failed'))
    },

    // Fetch Created Discounts
    fetchDiscounts({commit}, payload) {
        commit('setDiscounts', null)
        //commit('setDiscountLoading', true)
        axios.get(baseURL+'getall/'+payload.id+'/11').then(result => {
            if(result.status == 200) {
                if(result.data.List) {
                    commit('setDiscounts', result.data.List)
                   // commit('setDiscountLoading', false)
                }
            }
        }).catch(err => {
            //commit('setDiscountLoading', false)
            commit('setDiscounts', err.message)
        })
    },

    // Delete Discount
    deleteDiscount({commit, dispatch}, payload) {
        commit('setDiscountDeleted', null)
        axios.post(baseURL+'changestatus/'+payload.id+'/11/'+payload.discountId+'/4').then(result => {
            if(result.status == 200) {
                commit('setDiscountDeleted', 'success')
                dispatch('fetchDiscounts', payload)
            }
            else {
                commit('setDiscountDeleted', 'failed')
            }
        }).catch(err => commit('setDiscountDeleted', err.message))
    },

    // Discount Details
    fetchDiscountDetails({commit}, payload) {
        commit('setDiscountDetails', null)
        axios.get(baseURL+'get/'+payload.id+'/11/'+payload.discountId).then(result => {
            if(result.status == 200) {
                commit('setDiscountDetails', result.data)
            }
        })
    },

    updateDiscount({commit}, payload) {
        console.log(payload)
        commit('setDiscountUpdated', null)
        axios.post(baseURL+'update/'+payload.id+'/11/'+payload.discountId, payload).then(result => {
            if(result.status == 200) {
                commit('setDiscountUpdated', 'success')
            }
            else {
                commit('setDiscountUpdated', 'failed')
            }
        }).catch(err => commit('setDiscountUpdated', 'failed'))
    }
}

const mutations = {
    setListOfCustomerGroups: (state, payload) => state.lisOfGroups = payload,
    setNewDiscount: (state, payload) => state.isDiscountCreated = payload,
    setDiscounts: (state, payload) => state.discounts = payload,
    setDiscountDeleted: (state, payload) => state.isDiscountDeleted = payload,
    setDiscountDetails: (state, payload) => state.discountDetails = payload,
    setDiscountUpdated: (state, payload) => state.isDiscountUpdated = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}