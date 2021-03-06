const { resolve } = require('path')
// import htmlPurge from 'vite-plugin-html-purgecss'
import htmlImages from './vite-plugin-html-images/dist/index.js'
// import { createHtmlPlugin } from 'vite-plugin-html'

export default {
    root: "src",
    plugins: [
        // htmlPurge({
        //     content: ["**/*.html", "**/*.js"]
        // }),
        htmlImages({
            tempDirname: '.tempimages',
        }),
        // createHtmlPlugin({
        //     minify: true,
        // }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                not_found: resolve(__dirname, 'src/404.html'),
            }
        }
    },
}