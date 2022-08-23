import { createApp } from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import VueLazyload from 'vue-lazyload'

import { VueMasonryPlugin } from "vue-masonry";

import components from '@/components/ui/index'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(VueLazyload)
    .use(VueMasonryPlugin)
    .use(store)
    .use(router)
    .mount('#app')
