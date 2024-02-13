import request from "../../utils/request"
import router from "../../router"
// import { message } from "ant-design-vue";

const state = {
    step: {
        payAccount: "cg30w",
        receiverAccount: {
            type: "alipay",
            number: "123456"
        }
    }
}

const actions = {
    async submitStepForm({ commit }, { payload }) {
        await request({
            url: "/api/form",
            method: "post",
            data: payload
        });
        commit("saveStepFormData", payload);
        router.push("/form/step-form/result");
    }
}

const mutations = {
    saveStepFormData(state, { payload }) {
        state.step = {
            ...state.step,
            ...payload
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}