import "@/assets/font-roboto.css";
import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#ff8000',
                secondary: '#ffc107',
                accent: '#ffeb3b',
                error: '#f44336',
            },
            dark: {
                primary: '#ff8000',
                secondary: '#ffc107',
                accent: '#ffeb3b',
                error: '#f44336',
            },
        },
    }
});
