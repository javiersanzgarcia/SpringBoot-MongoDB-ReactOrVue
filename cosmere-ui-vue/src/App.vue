<template>
    <div id="app">
        <CrudApp />
    </div>
</template>

<script>
import CrudApp from './components/CrudApp.vue';

export default {
    name: 'App',
    components: {
        CrudApp
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
