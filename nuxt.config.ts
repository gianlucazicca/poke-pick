// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    srcDir: 'src/',
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    eslint: {
        config: {
            standalone: false,
        },
    },
    tailwindcss: {
        cssPath: ['~~src/assets/css/main.scss', {injectPosition: "first"}],
        configPath: '~~/config/tailwind.config',

    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: '~~src/components/ui'
    }
})