# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## TODO

- [ok] js的语法语义检查，在来回切换页面js编辑器时，会重复诊断上次的内容，会有bug
  - 原因：每次打开相同js页面编辑器时都会create，由于全局配置的js语言诊断，会存储之前的内容导致报重复定义错误
  - 解决：不同页面切换打开js编辑器时，上次组件页面销毁时，调用this.editordispose()，即可销毁上次的编辑器实例