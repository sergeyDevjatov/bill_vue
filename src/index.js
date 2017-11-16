import 'bootstrap';
import Vue from 'vue';
import clickOutside from './VClickOutsideEvent.js';
import './../style/index.scss';
import Bill from './Bill.vue';

Vue.directive('click-outside', clickOutside);

new Vue({
    el: '#app',
    components: {Bill}
});