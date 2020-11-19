import axios from 'axios'

const state = {
    isLoggedIn: null,
    isRegistered: null,
    existingSubscriptions: [],
    userData: null,
    customerSearched: null,
    groupDetails: null,
    companyProfile: null,
    shopStatus: null,
    managerProfile: null,
    isManagerUpdated: null,
    pendingActions: null,
    actionDetails: null,
    isActionUpdated: null,
    isCompanyProfileUpdated: null,
    isNewGroupRequest: null
}

const getters = {
    getLoggedIn: state => state.isLoggedIn,
    getRegistered: state => state.isRegistered,
    getLoggedUserData: state => state.userData,
    getExistingSubscriptions: state => state.existingSubscriptions,
    getCustomerSearched: state => state.customerSearched,
    getGroupDetails: state => state.groupDetails,
    getCompanyProfile: state => state.companyProfile,
    getShopStatus: state => state.shopStatus,
    getManagerProfile: state => state.managerProfile,
    getManagerUpdated: state => state.isManagerUpdated,
    getPendingActions: state => state.pendingActions,
    getActionDetails: state => state.actionDetails,
    getActionUpdated: state => state.isActionUpdated,
    getCompanyProfileUpdated: state => state.isCompanyProfileUpdated,
    getNewGroupRequest: state => state.isNewGroupRequest
}

const actions = {

    // LOGIN USER
    loginUser({commit}, payload) {
        commit('setLoggedIn', null)
        console.log(payload)
        axios.post(baseURL + 'login', payload).then(res => {
            console.log(res)
            if(res.status == 200) {
                const data = res.data
                if(data.includes(":")) {
                    const userId = data.split(':')[0]
                    const shopId = data.split(':')[1]

                    const user = {
                        id: userId,
                        shop: shopId
                    }

                    commit('setLoggedIn', user)
                }
                else {
                    commit('setLoggedIn', 0)
                }
            }
            else {
                commit('setLoggedIn', 0)
            }
        }).catch(err => {
            commit('setLoggedIn', 'error')
        })
    },

    // Set Profile
    setLoginProfile({commit,dispatch}, payload) {
        axios.post(baseURL+'setprofile/'+payload+'/20').then(result => {
            //console.log('Set Profile')
            //console.log(result)
            dispatch('fetchUserData', payload)
        })
    },

    // Get User Data after Login
    fetchUserData({commit}, payload) {
        commit('setUserData', null)
        axios.get(baseURL+'getuserdata/'+payload+'/20').then(result => {
            //console.log('Get User Data')
            //console.log(result)
            commit('setUserData', result.data)
        })
    },

    // List Existing Subscriptions
    listOfExistingSubscription({commit}) {
        commit('setExistingSubscriptions', null)
        axios.get(baseURL+'getallwithoutautorization/12').then(result => {
            commit('setExistingSubscriptions', result.data.List)
        }).catch(err => {
            commit('setExistingSubscriptions', null)
        })
    },

    // REGISTER NEW USER
    registerNewUser({commit}, payload) {
        commit('setRegistered', null)
        axios.post(baseURL+'createaccount', payload).then(result => {
            if(result.status == 200) {
                commit('setRegistered', 'success')
            }
            else {
                commit('setRegistered', 'failed')
            }
        }).catch(err => commit('setRegistered', 'failed'))
    },

    // Recover password
    recoverPassword({commit}, payload) {
        axios.post(baseURL+'recoverpassword', payload).then(result => {
            console.log(result)
        })
    },

    // ADVANCE SEARCH (Customer Search)
    customerSearch({commit}, payload) {
        commit('setSearch', null)
        axios.post(baseURL+'search/'+payload.id, payload.data).then(result => {
            if(result.status == 200){
                commit('setSearch', result.data.Results)
            }
            else {
                commit('setSearch', 0)
            }
        }).catch(() => commit('setSearch', 0))
    },

    sendNewGroupRequest({commit}, payload) {
        commit('setNewGroupRequest', null)
        axios.post(baseURL+'create/'+payload.id+'/14', payload).then(result => {
            if(result.status == 200) {
                commit('setNewGroupRequest', 'success')
            }
            else {
                commit('setNewGroupRequest', 'failed')
            }
        }).catch(err => commit('setNewGroupRequest', 'failed'))
    },

    // Customer Group Details
    customerGroupDetails({commit}, payload) {
        commit('setCustomerGroupDetails', null)
        axios.get(baseURL+'get/'+payload.id+'/20/'+payload.groupId).then(result => {
            if(result.status == 200) {
                commit('setCustomerGroupDetails', result.data)
            }
            else {
                commit('setCustomerGroupDetails', 'failed')
            }
        }).catch(() => commit('setCustomerGroupDetails', 'failed'))
    },

    // GET COMPANY PROFILE
    fetchCompanyProfile({commit}, payload) {
        commit('setCompanyProfile', null)
        axios.get(baseURL+'get/'+payload.id+'/2/'+payload.company).then(result => {
            if(result.status == 200) {
                commit('setCompanyProfile', result.data)
            }
        })
    },

    // UPDATE SHOP Status
    updateShopStatus({commit}, payload) {
        commit('setShopStatus', null)
        axios.post(baseURL+'changeshopclosure/'+payload.id+'/'+payload.shop).then(result => {
            if(result.status == 200) {
                commit('setShopStatus', 'success')
            }
            else {
                commit('setShopStatus', 'failed')
            }
        }).catch(() => commit('setShopStatus', 'failed'))
    },

    // GET MANAGER PROFILE
    fetchManagerProfile({commit}, payload) {
        commit('setManagerProfile', null)
        axios.get(baseURL+'getall/'+payload.id+'/1').then(result => {
            if(result.status == 200) {
                commit('setManagerProfile', result.data.List)
            }
        })
    },

    // UPDATE MANAGER PROFILE
    updateManagerProfile({commit}, payload) {
        commit('setManagerUpdated', null)
        axios.post(baseURL+'update/'+payload.id+'/1/'+payload.Id, payload).then(result => {
            if(result.status == 200) {
                commit('setManagerUpdated', 'success')
            }
            else {
                commit('setManagerUpdated', 'failed')
            }
        }).catch(() => commit('setManagerUpdated', 'failed'))
    },

    // FETCH PENDING ACTIONS
    fetchPendingActions({commit}, payload) {
        commit('setPendingActions', null)
        axios.get(baseURL+'getall/'+payload.id+'/14').then(result => {
            if(result.status == 200) {
                commit('setPendingActions', result.data.List)
            }
        })
    },

    // FETCH ACTION DETAILS
    fetchActionDetails({commit}, payload) {
        commit('setActionDetails', null)
        axios.get(baseURL+'get/'+payload.id+'/14/'+payload.Id).then(result => {
            if(result.status == 200) {
                commit('setActionDetails', result.data)
                console.log(result)
            }
        })
    },

    // UPDATE PENDING ACTION
    updateActionDetails({commit}, payload) {
        commit('setActionUpdated', null)
        axios.post(baseURL+'update/'+payload.id+'/14/'+payload.Id, payload).then(result => {
            if(result.status == 200) {
                commit('setActionUpdated', 'success')
            }
            else {
                commit('setActionUpdated', 'failed')
            }
        }).catch(() => commit('setActionUpdated', 'failed'))
    },

    // UPDATE COMPANY PROFILE
    updateCompanyProfile({commit}, payload) {
        commit('setCompanyProfileUpdated', null)
        axios.post(baseURL+'update/'+payload.id+'/2/'+payload.Id, payload).then(result => {
            if(result.status == 200) {
                commit('setCompanyProfileUpdated', 'success')
            }
            else {
                commit('setCompanyProfileUpdated', 'failed')
            }
        }).catch(() => commit('setCompanyProfileUpdated', 'failed'))
    },
}

const mutations = {
    setLoggedIn: (state, payload) => {
        if(payload == null) {
            state.isLoggedIn = null
        }
        if(payload == 0 || payload == 'error') {
            state.isLoggedIn = 'no'
            if(localStorage.getItem('manicardsShop')) {
                localStorage.removeItem('manicardsShop')
            }
        }
        if(payload && payload != 0 && payload != 'error' && payload != null) {
            state.isLoggedIn = 'yes'
            localStorage.setItem('manicardsShop', JSON.stringify(payload))
        }
    },

    setExistingSubscriptions: (state, payload) => state.existingSubscriptions = payload,

    setRegistered: (state, payload) => state.isRegistered = payload,

    setUserData: (state, payload) => {
        localStorage.setItem('manicardsShopData', JSON.stringify(payload))
        state.userData = payload
    },

    setSearch: (state, payload) => state.customerSearched = payload,

    setCustomerGroupDetails: (state, payload) => state.groupDetails = payload,

    setCompanyProfile: (state, payload) => state.companyProfile = payload,

    setShopStatus: (state, payload) => state.shopStatus = payload,

    setManagerProfile: (state, payload) => state.managerProfile = payload,

    setManagerUpdated: (state, payload) => state.isManagerUpdated = payload,

    setPendingActions: (state, payload) => state.pendingActions = payload,

    setActionDetails: (state, payload) => state.actionDetails = payload,

    setActionUpdated: (state, payload) => state.isActionUpdated = payload,

    setCompanyProfileUpdated: (state, payload) => state.isCompanyProfileUpdated = payload,

    setNewGroupRequest: (state, payload) => state.isNewGroupRequest = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}