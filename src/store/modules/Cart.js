import axios from 'axios'

const state = {
    cart: null,
    isItemDeleted: null
}

const getters = {
    getCart: state => state.cart,
    getItemDeleted: state => state.isItemDeleted
}

const actions = {
    fetchCart({commit}, payload) {
        commit('setCart', null)
        axios.get(baseURL+'getcart/'+payload.id).then(result => {
            if(result.status == 200) {
                commit('setCart', result.data)
            }
        })
    },

    // DELETE ITEM FROM CART
    deleteCartItem({commit, dispatch}, payload) {
        console.log(payload)
        commit('setItemDeleted', null)
        axios.post(baseURL+'delete/'+payload.id+'/'+payload.type+'/'+payload.Id).then(result => {
            if(result.status == 200) {
                console.log(result)
                dispatch('fetchCart', payload)
                commit('setItemDeleted', 'success')
            }
            else {
                commit('setItemDeleted', 'failed')
            }
        }).catch(() => commit('setItemDeleted', 'failed'))
    }
}

const mutations = {
    setCart: (state, payload) => state.cart = payload,
    setItemDeleted: (state, payload) => state.isItemDeleted = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}