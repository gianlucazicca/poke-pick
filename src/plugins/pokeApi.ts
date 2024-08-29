import {MainClient} from 'pokenode-ts';

const pokeApiClient = new MainClient();

declare module "#app" {
    interface NuxtApp {
        $pokeApiClient: typeof pokeApiClient;
    }
}
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.provide('pokeApiClient', pokeApiClient as typeof pokeApiClient);
    nuxtApp.provide('pokeApiClient', pokeApiClient as typeof pokeApiClient);
})
