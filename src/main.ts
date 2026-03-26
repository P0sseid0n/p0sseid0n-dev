import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'

import '@fontsource/space-grotesk'

import './main.css'

export const createApp = ViteSSG(App)
