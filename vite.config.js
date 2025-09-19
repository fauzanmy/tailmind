import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteHTMLIncludes from '@kingkongdevs/vite-plugin-html-includes';
import { resolve } from "path";

export default defineConfig({
    plugins: [
        tailwindcss(),
        viteHTMLIncludes({
            componentDir: '/components/',
        }),
    ],
    base: '/',
    build: {
        cssMinify: false,
        rollupOptions: {
            main: resolve(__dirname, "index.html"),
            main: resolve(__dirname, "post.html"),
            main: resolve(__dirname, "about.html"),
        }
    }
});