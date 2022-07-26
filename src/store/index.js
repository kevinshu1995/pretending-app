import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            now: 0,
        }
    },
    getters: {
        getNow(state) {
            return state.now
        },
    },
    mutations: {
        SET_CURRENT_TIME(state) {
            state.now = new Date()
        },
    },
    actions: {
        setCurrentTime(context) {
            context.commit('SET_CURRENT_TIME')
        },
    },
})

export default store
