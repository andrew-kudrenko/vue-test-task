import { createApp } from 'vue';
import { config } from 'dotenv';
import App from '@/components/app/App.vue';
import router from './router';
import store from './store';

config();

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
