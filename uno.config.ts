import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */}),
    presetWind3(),
    // ...custom presets
  ],
  rules: [
    ['grid-cols-config', { 'grid-template-columns': '1fr min-content 1fr' }],
  ],
})
