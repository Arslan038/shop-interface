import axios from 'axios'

const state = {
    notifications: [],
    isNotificationCreated: null,
    isNotificationDeleted: null,
    notificationDetails: null,
    isNotificationUpdated: null
}

const getters = {
    getNotificationCreated: state => state.isNotificationCreated,
    getNotifications: state => state.notifications,
    getNotificationDeleted: state => state.isNotificationDeleted,
    getNotificationDetails: state => state.notificationDetails,
    getNotificationUpdated: state => state.isNotificationUpdated
}

const actions = {

    // CREATE NEW NOTIFICATION

    createNotification({commit}, payload) {
        commit('setNotificationCreated', null)
        axios.post(baseURL+'create/'+payload.id+'/5', payload.data).then(result => {
            console.log(result)
            if(result.status == 200) {
                commit('setNotificationCreated', 'success')
            }
            else {
                commit('setNotificationCreated', 'failed')
            }
            console.log(result.data)
        }).catch(err => commit('setNotificationCreated', 'failed'))
    },

    // FETCH ALL NOTIFICATIONS

    fetchNotifications({commit}, payload) {
        commit('setNotifications', null)
        axios.get(baseURL+'getall/'+payload.id+'/5').then(result => {
            if(result.status == 200) {
                commit('setNotifications', result.data.List)
            }
        })
    },

    // Delete Notification
    deleteNotification({commit, dispatch}, payload) {
        commit('setNotificationDeleted', null)
        axios.post(baseURL+'changestatus/'+payload.id+'/5/'+payload.Id+'/4').then(result => {
            if(result.status == 200) {
                commit('setNotificationDeleted', 'success')
                dispatch('fetchNotifications', payload)
            }
            else {
                commit('setNotificationDeleted', 'failed')
            }
        }).catch(err => commit('setNotificationDeleted', err.message))
    },

    // FETCH NOTIFICATION DETAILS
    fetchNotificationDetails({commit}, payload) {
        commit('setNotificationDetails', null)
        axios.get(baseURL+'get/'+payload.id+'/5/'+payload.Id).then(result => {
            if(result.status == 200) {
                commit('setNotificationDetails', result.data)
            }
        })
    },

    // UPDATE NOTIFICATION
    updateNotification({commit, dispatch}, payload) {
        commit('setNotificationUpdated', null)
        axios.post(baseURL+'update/'+payload.id+'/5/'+payload.Id, payload.data).then(result => {
            if(result.status == 200) {
                commit('setNotificationUpdated', 'success')
                dispatch('fetchNotifications', payload)
            }
        })
    }
}

const mutations = {
    setNotificationCreated: (state, payload) => state.isNotificationCreated = payload,
    setNotifications: (state, payload) => state.notifications = payload,
    setNotificationDeleted: (state, payload) => state.isNotificationDeleted = payload,
    setNotificationDetails: (state, payload) => state.notificationDetails = payload,
    setNotificationUpdated: (state, payload) => state.isNotificationUpdated = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}