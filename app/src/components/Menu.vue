<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
                <p v-bind="props">
                    =
                </p>
            </template>

            <v-card min-width="300">
                <v-list>
                    <v-list-item :title="username" subtitle="Founder of Vuetify">
                        <template v-slot:append>
                            <v-btn variant="text" :class="fav ? 'text-red' : ''" icon="mdi-heart"
                                @click="fav = !fav"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item>
                        <v-switch v-model="hints" color="purple" label="Enable hints" hide-details></v-switch>
                    </v-list-item>

                    <v-list-item>
                        <button @click="logoutDef">Logout</button>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>
  

<script>
import { ref, computed } from 'vue';
import store from '../app/store';

export default {
    setup() {
        const fav = ref(true);
        const menu = ref(false);
        const message = ref(false);
        const hints = ref(true);

        const logoutDef = () => {
            store.dispatch("logout");
        };

        const username = computed(() => store.getters.getUsername);

        return {
            fav,
            menu,
            message,
            hints,
            username,
            logoutDef
        };
    }
};
</script>
