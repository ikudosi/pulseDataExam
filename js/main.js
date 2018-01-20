import Vue from 'vue';
import App from './components/App.vue';
import Vuex from 'vuex';
import store from './store';

new Vue({
    el: "#app",
    store: store,
    template: "<App/>",
    components: { App }
});