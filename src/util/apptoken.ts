import { ref, onBeforeMount } from 'vue';
import AppFn from './concatApp';
declare const window: Window & { WebViewJavascriptBridge: any };
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import { Toast } from 'vant';
export default function () {
    const app_token = ref('');
    const $store = useStore();
    const $route = useRoute()

    onBeforeMount(() => {
        if ($route.query.ut) {
            app_token.value = $route.query.ut as any;
            $store.app_token = app_token.value;
            return
        }
        app_token.value = $store.app_token;
        setTimeout(() => {
            if (!$store.app_token || $store.app_token === '') {
                if (typeof (AppFn.getToken()) == 'object' || !app_token.value || app_token.value == '') {
                    app_token.value = '';
                } else {
                    app_token.value = AppFn.getToken() as any;
                }
            }
        }, 100)
    })
    function getToken(isForce = true) {
        return new Promise(resolve => {
            if (!app_token.value || app_token.value === '' || typeof (app_token.value) == 'object') {
                if (AppFn.isAndroidFn()) {
                    if (isForce) {
                        window.WebViewJavascriptBridge.callHandler('NBDBridge', { operate: 'login', isForce: true }, function (d: any) {
                            app_token.value = d;
                            $store.app_token = d;
                            resolve(d);
                        });
                    }
                } else {
                    AppFn.callhandler('NBDBridge', { operate: 'login', isForce: true }, function (d: any) {
                        app_token.value = d;
                        $store.app_token = d;
                        resolve(d);
                    });
                }
            }
        })
    }
    return {
        getToken, app_token
    }
}
