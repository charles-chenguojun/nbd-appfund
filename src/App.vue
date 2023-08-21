<template>
    <router-view class="router-view" v-slot="{ Component }">
        <transition :name="transitionName">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script lang="ts" setup>
    import { ref, watch } from "vue";
    import { useRoute } from "vue-router";
    const route = useRoute();
    const transitionName = ref("slide-none");

    watch(
        () => route.meta.tree,
        (newPath: any, oldPath: any) => {
            if (newPath && oldPath) {
                if (newPath > oldPath) {
                    transitionName.value = "slide-right";
                } else if (newPath < oldPath) {
                    transitionName.value = "slide-left";
                } else {
                    transitionName.value = "slide-none";
                }
            }
        },
        { immediate: true },
    );
</script>
<style lang="scss">
    html {
        font-size: calc(100vw / 10);
    }

    body {
        -webkit-text-size-adjust: 100% !important;
    }

    body {
        width: 750px;
        overflow-x: hidden;
        margin: auto !important;
        overflow-y: scroll !important;
        height: 100vh;
        -webkit-overflow-scrolling: touch;

        .explain-guzhi {
            .van-dialog__message {
                text-align: justify;
            }
        }
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        // text-align: center;
        color: #2c3e50;
        width: 750px;
        overflow-x: hidden;
        margin: auto;
        overflow-y: scroll !important;
        height: 100vh;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
