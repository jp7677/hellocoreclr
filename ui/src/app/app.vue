<template>
    <div>
        <div class="modal-header">
            <h1 class="modal-title">Hello World</h1>
        </div>
        <p>
        <div class="container-fluid">
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
export default class App extends Vue {}
</script>
