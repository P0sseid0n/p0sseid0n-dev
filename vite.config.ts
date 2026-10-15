import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'

import githubPinned from './plugins/githubPinned.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Prefixo vazio para carregar também variáveis sem VITE_ (não vão para o client)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
      // Ícones viram componentes no build e o SVG sai direto no HTML
      Icons({
        compiler: 'vue3',
        scale: 1,
        // Todos os ícones são decorativos: o texto ao lado (ou sr-only) já dá o nome
        iconCustomizer(_collection, _icon, props) {
          props['aria-hidden'] = 'true'
        },
      }),
      githubPinned('P0sseid0n', env.GITHUB_TOKEN),
    ],
    // Expõe na rede local para testar em outros dispositivos (ex.: celular)
    server: { host: true },
    preview: { host: true },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
