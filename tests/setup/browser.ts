import { config } from 'vitest-browser-vue'
import { i18n } from '@/i18n'
import './browser.css'

// todos los render montan con i18n, como en la app
config.global.plugins = [i18n]
