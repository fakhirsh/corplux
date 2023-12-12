import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/corplux',
  plugins: 
  [
    react(),
    glsl()
  ],
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
  //   }
  // }
})
