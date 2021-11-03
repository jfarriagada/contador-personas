<template>
<div>
    <v-row justify="center" align="center">
        <v-col cols="10" md="4" lg="4">
            <v-icon
                class="justify-center"
                large
                color="secundary"
                style="font-size:15em;"
            >
                mdi-account-plus
            </v-icon>
            <form>
                <v-text-field
                v-model="credentials.username"
                :counter="40"
                label="Usuario"
                required
                ></v-text-field>
                <v-text-field
                v-model="credentials.password"
                label="Contraseña"
                required
                type="password"
                ></v-text-field>
                <v-btn
                color="primary"
                style="margin-top: 40px"
                block
                @click="Login(credentials)"
                >ENTRAR</v-btn
                >
            </form>
        </v-col>
    </v-row>
</div>
</template>

<script>
import { mapActions } from "vuex";


export default {
    name: "Home",
    data: () => ({
        credentials: {
            username: "clicker1.demo",
            password: "admin123",
            email: "clicker1.demo@iklab.cl"
        },
    }),

    methods: mapActions([
        'Login'
    ]),
};
</script>
