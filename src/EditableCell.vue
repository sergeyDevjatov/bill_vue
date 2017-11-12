<!--

Component provides cell, which can be an input or a plane text.

-->

<template>
    <td class="editableCell">
        <input v-if="editable"
               class="form-control" id="bill_name-input" ref="input"
               :type="type" :value="value" :placeholder="placeholder"
               @input="updateValue">
        <span v-else>{{value}}</span>
    </td>
</template>

<script>
    export default {
        props: {
            editable: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder:{
                type: String,
                default: ''
            },
            value: {}
        },
        methods: {
            updateValue (event){
                // support v-model for custom component
                this.$emit('input', event.target.value);
            },
        },
    }
</script>