import axios from 'axios'

const state = {
    team: [],
    isMemberDeleted: null,
    isMemberAdded: null,
    isMemberUpdated: null,
    customerGroupList: null,
    isGrroupDeleted: null
}

const getters = {
    getTeam: state => state.team,
    getMemberDeleted: state => state.isMemberDeleted,
    getMemberAdded: state => state.isMemberAdded,
    getMemberUpdated: state => state.isMemberUpdated,
    getCustomerGroupList: state => state.customerGroupList,
    getGroupDeleted: state => state.isGrroupDeleted
}

const actions = {
    // Fetch Team
    fetchTeam({commit}, payload) {
        commit('setTeam', null)
        axios.get(baseURL+'getall/'+payload.id+'/15').then(result => {
            if(result.status == 200) {
                commit('setTeam', result.data.List)
            }
        })
    },

    // DELETE A MEMBER
    deleteTeamMember({commit, dispatch}, payload) {
        commit('setMemberDeleted', null)
        axios.post(baseURL+'delete/'+payload.id+'/15/'+payload.Id).then(result => {
            if(result.status == 200) {
                commit('setMemberDeleted', 'success')
                dispatch('fetchTeam', payload)
            }
            else {
                commit('setMemberDeleted', 'failed')
            }
        }).catch(() => commit('setMemberDeleted', 'failed'))
    },

    // ADD A MEMBER
    addTeamMember({commit, dispatch}, payload) {
        commit('setTeamMemberAdded', null)
        axios.post(baseURL+'create/'+payload.id+'/15', payload).then(result => {
            if(result.status == 200) {
                dispatch('fetchTeam', payload)
                commit('setTeamMemberAdded', 'success')
            }
            else {
                commit('setTeamMemberAdded', 'failed')
            }
        }).catch(() => commit('setTeamMemberAdded', 'failed'))
    },

    // UPDATE A TEAM MEMBER
    updateTeamMember({commit, dispatch}, payload) {
        commit('setTeamMemberUpdated', null)
        const pay = {
            id: payload.id,
            Id: payload.Id
        }
        delete payload.id
        
        axios.post(baseURL+'update/'+pay.id+'/15/'+pay.Id, payload).then(result => {
            console.log(result)
            if(result.status == 200) {
                dispatch('fetchTeam', pay)
                commit('setTeamMemberUpdated', 'success')
            }
            else {
                commit('setTeamMemberUpdated', 'failed')
            }
        }).catch(() => commit('setTeamMemberUpdated', 'failed'))
    },

    // FETCH CUSTOMER GROUPS
    fetchListOfCustomerGroups({commit}, payload) {
        commit('setGroupList', null)
        axios.get(baseURL+'getall/'+payload.id+'/46').then(result => {
            if(result.status == 200) {
                commit('setGroupList', result.data.List)
            }
        })
    },

    // Delete Customer Group
    deleteCustomerGroup({commit, dispatch}, payload) {
        commit('deleteGroup', null)
        axios.post(baseURL+'delete/'+payload.id+'/46/'+payload.groupId).then(result => {
            if(result.status == 200) {
                commit('deleteGroup', 'success')
                dispatch('fetchListOfCustomerGroups', payload)
            }
            else {
                commit('deleteGroup', 'failed')
            }
        })
    }
}

const mutations = {
    setTeam: (state, payload) => state.team = payload,
    setMemberDeleted: (state, payload) => state.isMemberDeleted = payload,
    setTeamMemberAdded: (state, payload) => state.isMemberAdded = payload,
    setTeamMemberUpdated: (state, payload) => state.isMemberUpdated = payload,
    setGroupList: (state, payload) => state.customerGroupList = payload,
    deleteGroup: (state, payload) => state.isGrroupDeleted = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}