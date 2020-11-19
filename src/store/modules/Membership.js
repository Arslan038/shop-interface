import axios from 'axios'

const state = {
    isRequestSent: null,
    specialOffers: [],
    isOfferAddedToCart: null,
}

const getters = {
    getRequestStatus: state => state.isRequestSent,
    getSpecialOffers: state => state.specialOffers,
    getOfferAddedToCart: state => state.isOfferAddedToCart
}

const actions = {
    // Send History Request
    sendRequest({commit}, payload) {
        let id = payload.id
        delete payload.id
        commit('setRequestStatus', null)
        axios.post(baseURL+'create/'+id+'/14', payload).then(result => {
            if(result.status == 200) {
                commit('setRequestStatus', 'success')
            }
            else {
                commit('setRequestStatus', 'failed')
            }
        }).catch(() => commit('setRequestStatus', 'failed'))
    },

    // Fetch Special Offers
    fetchSpecialOffers({commit}) {
        commit('setSpecialOffers', null)
        axios.get(baseURL+'getallwithoutautorization/10').then(result => {
            if(result.status == 200) {
                commit('setSpecialOffers', result.data.List)
            }
        })
    },

    // ADD OFFER TO CART
    addOfferToCart({commit}, payload) {
        commit('setOfferToCart', null)
        axios.post(baseURL+'create/'+payload.id+'/18', payload).then(result => {
            if(result.status == 200) {
                commit('setOfferToCart', 'success')
            }
            else {
                commit('setOfferToCart', 'failed')
            }
        }).catch(() => commit('setOfferToCart', 'failed'))
    },
}

const mutations = {
    setRequestStatus: (state, payload) => state.isRequestSent = payload,
    setSpecialOffers: (state, payload) => state.specialOffers = payload,
    setOfferToCart: (state, payload) => state.isOfferAddedToCart = payload

}

export default {
    state,
    getters,
    actions,
    mutations
}