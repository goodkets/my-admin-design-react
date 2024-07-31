import react from '@vitejs/plugin-react'
import viteESLintPlugin from 'vite-plugin-eslint'
import { loadEnv } from 'vite'
import { wrapperEnv } from './scripts/utils'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import type { ConfigEnv, UserConfig } from 'vite'

export default ({command,mode}: ConfigEnv): UserConfig =>{
  // 获取项目根目录的绝对路径
  const root = process.cwd()
  // 判断当前命令是否为构建命令
  const isBuild = command === 'build'
  // 根据模式加载环境变量
  const env = loadEnv(mode, root)
  const viteEnv: any = wrapperEnv(env)
  const { VITE_PORT, VITE_DROP_CONSOLE } = viteEnv
  return {
    // 路径配置--重写
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    base:'/',
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: false,
      // proxy: {// 代理配置
      //   '/api': {
      //     target: 'http://localhost:3000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    plugins: [
      react(),
      viteESLintPlugin({
        // 开发阶段因为 ESLint 的错误, 不再会打断开发
        failOnError: false
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: './mock',
        ignore: /^_/,
        localEnabled: !isBuild,
        prodEnabled: isBuild,
      }),
    ],
    optimizeDeps: {
      include: ['antd'],
      exclude: []
    },
    // build: {  打包配置，如果需要上线就要配置，不上线就不管他
    //   target: 'es2015',
    //   cssTarget: 'chrome86',
    //   minify: 'terser',
    //   terserOptions: {
    //     compress: {
    //       keep_infinity: true,
    //       // used to delete console and debugger in production environment
    //       drop_console: VITE_DROP_CONSOLE
    //     }
    //   },
    //   chunkSizeWarningLimit: 2000
    // },
  }
}
