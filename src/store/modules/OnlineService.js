import axios from 'axios'

const state = {
    isServiceCreated: null,
    isServiceDeleted: null,
    isServiceUpdated: null,
    onlineServices: [],
    serviceDetails: null,
    defaultPhotos: null

}

const getters = {
    getServiceCreated: state => state.isServiceCreated,
    getOnlineServices: state => state.onlineServices,
    getServiceDeleted: state => state.isServiceDeleted,
    getServiceUpdated: state => state.isServiceUpdated,
    getServiceDetails: state => state.serviceDetails,
    getDefaultPhotos: state => state.defaultPhotos
}

const actions = {
    // CREATE NEW SERVICE
    createService({commit, dispatch}, payload) {
        commit('setServiceCreated', null)
        axios.post(baseURL+'create/'+payload.id+'/4', payload).then(result => {
            if(result.status == 200) {
                commit('setServiceCreated', 'success')
                dispatch('fetchServices', payload)
            }
            else {
                commit('setServiceCreated', 'failed')
            }
        }).catch(err => commit('setServiceCreated', 'failed'))
    },

    // UPDATE A SERVICE
    updateService({commit}, payload) {
        commit('setServiceUpdated', null)
        axios.post(baseURL+'update/'+payload.id+'/4/'+payload.Id, payload).then(result => {
            if(result.status == 200) {
                commit('setServiceUpdated', 'success')
            }
            else {
                commit('setServiceUpdated', 'failed')
            }
        }).catch(() => commit('setServiceUpdated', 'failed'))
    },

    // FETCH SERVICES

    fetchServices({commit}, payload) {
        commit('setServices', null)
        axios.get(baseURL+'getall/'+payload.id+'/4').then(result => {
            if(result.status == 200) {
                commit('setServices', result.data.List)
            }
        })
    },

    // DELETE SERVICE
    deleteService({commit, dispatch}, payload) {
        commit('setServiceDeleted', null)
        axios.post(baseURL+'delete/'+payload.id+'/4/'+payload.Id).then(result => {
            if(result.status == 200) {
                commit('setServiceDeleted', 'success')
                dispatch('fetchServices', payload)
            }
            else {
                commit('setServiceDeleted', 'failed')
            }
        }).catch(() => commit('setServiceDeleted', 'failed'))
    },

    // SERVICE DETAILS
    fetchServiceDetails({commit}, payload) {
        commit('setServiceDetails', null)
        axios.get(baseURL+'get/'+payload.id+'/4/'+payload.productId).then(result => {
            if(result.status == 200) {
                console.log(result.data)
                commit('setServiceDetails', result.data)
            }
        })
    },

    // FETCH SERVICE IMAGES BASED ON CATEGORY
    fetchDefaultImages({commit}, payload) {
        commit('setDefaultImages', null)
        axios.get(baseURL+'productdefaultimages/'+payload.id+'/'+payload.Id).then(result => {
            if(result.status == 200) {
                commit('setDefaultImages', result.data)
            }
        })
    }
}

const mutations = {
    setServiceCreated: (state, payload) => state.isServiceCreated = payload,
    setServiceDeleted: (state, payload) => state.isServiceDeleted = payload,
    setServiceUpdated: (state, payload) => state.isServiceUpdated = payload,
    setServices: (state, payload) => state.onlineServices = payload,
    setServiceDetails: (state, payload) => state.serviceDetails = payload,
    setDefaultImages: (state, payload) => state.defaultPhotos = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}