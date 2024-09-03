// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    srcDir: 'src/',
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/fonts'],
    eslint: {
        config: {
            standalone: false,
        },
    },
    app: {
        rootAttrs: {
            class: 'main'
        }
    },
    css: [
        '~/assets/css/main.css' // Adjust the path if necessary
    ],
    tailwindcss: {
        cssPath: ['~~src/assets/css/main.css', {injectPosition: "first"}],
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
    },
    fonts: {
        google: {
            id: ['DotGothic16']
        }
    }
})