import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedPatient: null,
        selectedPatientDiagnosis: []
    },

    mutations: {
        updateSelectedPatient (state, selectedPatient) {
            state.selectedPatient = selectedPatient;
        },
        updateSelectedPatientDiagnosis (state, newData) {
            state.selectedPatientDiagnosis = newData;
        }
    }
})