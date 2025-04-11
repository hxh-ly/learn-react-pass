import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  css: {
    preprocessorOptions: {
      scss: {
  
      },
    },
    modules: {
      // generateScopedName: "guang_[name]_[local]_[hash:base64:5]" 
      generateScopedName:function (name,filename,css) {
        console.log(name,filename,css);
        return 'xxx'
      },
      getJSON:function (cssFileName,json,outputFileName) {
        console.log(cssFileName,json,outputFileName);
      },
      globalModulePaths: [/hxh/],
      localsConvention:'camelCase'
    }
  },
})
