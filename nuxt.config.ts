// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    srcDir: 'src/',
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
    eslint: {
        config: {
            standalone: false,
        },
    },
    tailwindcss: {
        cssPath: ['~~src/assets/css/main.scss', {injectPosition: "first"}],
        configPath: '~~/config/tailwind.config',

    },
})
