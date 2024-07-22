<script setup lang="ts">
import { onMounted } from 'vue'
import { useMonacoEditor } from './hooks/useMonacoEditor'
const { monacoRef, initMonaco } = useMonacoEditor()

onMounted(async()=>{
	await initMonaco()
  console.log(monacoRef.value, '8----', document.getElementById('container'))
  const wrapper = document.getElementById('container')
  monacoRef.value.editor.create(wrapper, {
  	value: "function hello() {\n\talert('Hello world!');\n}",
  	language: 'javascript',
    theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
    fontSize: 20,
    autoIndent: 'full',
    formatOnType: true,
    formatOnPaste: true,
    autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
    autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    automaticLayout: true, // 自动布局
    codeLens: true,
  });

  const wrapper2 = document.getElementById('container2')
  monacoRef.value.editor.create(wrapper2, {
  	value: "function hello() {\n\talert('Hello world!');\n}",
  	language: 'javascript',
    theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
    fontSize: 20,
    autoIndent: 'full',
    // formatOnType: true,
    // formatOnPaste: true
  });
})

</script>

<template>
  <h1>---meloader--editor---</h1>
  <div class="editor-wrap" id="container">

  </div>
  <div class="editor-wrap" id="container2">

</div>
</template>

<style scoped>
.editor-wrap {
  width: 1000px;
  min-height: 500px;
}
</style>
