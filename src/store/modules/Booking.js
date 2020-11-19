import axios from 'axios'

const state = {
    bookings: [],
    bookingDetails: null,
    isBookingDeleted: null,
    isBookingUpdated: null,
}

const getters = {
    getBookings: state => state.bookings,
    getBookingDetails: state => state.bookingDetails,
    getBookingDeleted: state => state.isBookingDeleted,
    getBookingUpdated: state => state.isBookingUpdated
}

const actions = {
    // Fetch Bookings
    fetchBookings({commit}, payload) {
        commit('setBookings', null)
        axios.get(baseURL+'getall/'+payload.id+'/47').then(result => {
            if(result.status == 200) {
                commit('setBookings', result.data.List)
            }
        })
    },

    // Booking Details
    fetchBookingDetails({commit}, payload) {
        commit('setBookingDetails', null)
        axios.get(baseURL+'get/'+payload.id+'/47/'+payload.Id).then(result => {
            if(result.status == 200) {
                console.log(result.data)
                commit('setBookingDetails', result.data)
            }
        })
    },

    // Delete Booking
    deleteBooking({commit,dispatch},payload) {
        commit('setBookingDeleted', null)
        axios.post(baseURL+'delete/'+payload.id+'/47/'+payload.Id).then(result => {
            if(result.status == 200) {
                dispatch('fetchBookings', payload)
                commit('setBookingDeleted', 'success')
            }
            else {
                commit('setBookingDeleted', 'failed')
            }
        }).catch(() => commit('setBookingDeleted', 'failed'))
    },

    updateBooking({commit, dispatch}, payload) {
        console.log(payload)
        
        commit('setBookingUpdated', null)
        axios.post(baseURL+'update/'+payload.id+'/47/'+payload.Id, payload).then(result => {
            if(result.status == 200) {
                dispatch('fetchBookings', payload)
                commit('setBookingUpdated', 'success')
            }
            else {
                commit('setBookingUpdated', 'failed')
            }
        }).catch(() => commit('setBookingUpdated', 'failed'))
    }
}

const mutations = {
    setBookings: (state, payload) => state.bookings = payload,
    setBookingDetails: (state, payload) => state.bookingDetails = payload,
    setBookingDeleted: (state, payload) => state.isBookingDeleted = payload,
    setBookingUpdated: (state, payload) => state.isBookingUpdated = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}