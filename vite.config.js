import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
  }


  if (command !== 'serve') {
    config.base = '/music/'
  }

  return config

})