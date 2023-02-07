
export default ({
    namespaced: true,
    state: {
        isCollapse: false
    },
    getters: {
    },
    mutations: {
        CollapseChage(state: { isCollapse: boolean }, type: boolean) {
            state.isCollapse = type
        }
    },
    actions: {
        async isCollapseChange(ctx: { commit: (arg0: string, arg1: boolean) => void }, type: boolean) {
            ctx.commit('CollapseChage', type)
        }
    }
})
