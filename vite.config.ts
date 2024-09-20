import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*'],
      copyDtsFiles: true,
    })
  ],
  build: {
    // 输出文件夹
    outDir: 'dist',
    lib: {
      // 源码的入口文件
      entry: path.resolve(__dirname, 'src/store/index.ts'),
      // 名称
      name: 'ask-godown',
      // 文件名称
      fileName: 'ask-godown',
      // 打包格式
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // 排除不相关的依赖
      external: ['react', 'react-dom'],
    },
  },
})

