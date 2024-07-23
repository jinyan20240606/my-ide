<script setup lang="ts">
import { onMounted } from 'vue'
import { useMonacoEditor } from './hooks/useMonacoEditor'
const { monacoRef, initMonaco } = useMonacoEditor()

onMounted(async () => {
  await initMonaco()
  console.log(monacoRef.value, '8----', document.getElementById('container'))
  const wrapper = document.getElementById('container')
  monacoRef.value.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    // 语义检查
    noSemanticValidation: false,
    // 语法检查
    noSyntaxValidation: false,
  })
  monacoRef.value.languages.typescript.javascriptDefaults.setCompilerOptions({
    // 目标js版本
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    // 允许非ts文件
    allowNonTsExtensions: true,
  })

  let uri = monacoRef.value.Uri.parse(`file:///main.ts`);
  console.log(uri, '24------')
  const model1 = monacoRef.value.editor.createModel(
    ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    'javascript',
    uri // 用于模拟文件路径，非必需
  );

  let obj1 = {
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
  }
  // model1.updateOptions()
  monacoRef.value.editor.create(wrapper, {
    model: model1,
    ...obj1
  });


  let uri2 = monacoRef.value.Uri.parse(`file:///main2.ts`);
  console.log(model1, '24------')
  const model2 = monacoRef.value.editor.createModel(
    ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    'javascript',
    uri2 // 用于模拟文件路径，非必需
  );
  const wrapper2 = document.getElementById('container2')
  monacoRef.value.editor.create(wrapper2, {
    model: model2,
    ...obj1   
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
