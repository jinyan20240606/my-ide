<template>
  <div ref="codeEditBox" class="codeEditBox" :class="hightChange && 'codeEditBox1'" />
</template>
<script lang="ts">
import {
  defineComponent, onBeforeUnmount, onMounted, ref, watch,
} from 'vue'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'
import { language as sqlLanguage } from 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
import { language as yamlLanguage } from 'monaco-editor/esm/vs/basic-languages/yaml/yaml.js';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
import { editorProps } from './monacoEditorType'

export default defineComponent({
  name: 'MonacoEditor',
  props: editorProps,
  emits: ['update:modelValue', 'change', 'editor-mounted'],
  setup(props, { emit }) {
    (self as any).MonacoEnvironment = {
      // 处理代码补全的单独worker线程功能
      getWorker(_: string, label: string) {
        console.log('getWorker-----26---', label, _)
        if (label === 'json') {
          return new JsonWorker()
        }
        if (['css', 'scss', 'less'].includes(label)) {
          return new CssWorker()
        }
        if (['html', 'handlebars', 'razor'].includes(label)) {
          return new HtmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
          return new TsWorker()
        }
        return new EditorWorker()
      },
    }
    let editor: any
    const codeEditBox = ref()

    const init = () => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        // 语义检查
        noSemanticValidation: false,
        // 语法检查
        noSyntaxValidation: false,
      })
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        // 目标js版本
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
      })
      // 注册sql代码补全的功能，包默认自带jscsshtmljson的worker线程，其他语言的代码补全需要自行调api注册
      monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems() {
          const suggestions: any = [];
          // 这个keywords就是sql.js文件中有的
          sqlLanguage.keywords.forEach((item: any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: item,
            });
          })
          sqlLanguage.operators.forEach((item: any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: item,
            });
          })
          sqlLanguage.builtinFunctions.forEach((item: any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: item,
            });
          })
          sqlLanguage.builtinVariables.forEach((item: any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: item,
            });
          })
          return {
            // 最后要返回一个数组
            suggestions,
          };
        },
      })
      monaco.languages.registerCompletionItemProvider('yaml', {
        provideCompletionItems() {
          const suggestions: any = [];
          // 这个keywords就是python.js文件中有的
          yamlLanguage.keywords.forEach((item: any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: item,
            });
          })
          return {
            // 最后要返回一个数组
            suggestions,
          };
        },
      })

      editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        readOnly: props.readOnly,
        theme: props.theme,
        ...props.options,
      })

      // 监听值的变化
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue() // 给父组件实时返回最新文本
        emit('update:modelValue', value)
        emit('change', value)
      })

      emit('editor-mounted', editor)
    }
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editor) {
          const value = editor.getValue()
          if (newValue !== value) {
            editor.setValue(newValue)
          }
        }
      },
    )

    watch(
      () => props.options,
      (newValue) => {
        editor.updateOptions(newValue)
      },
      { deep: true },
    )
    watch(
      () => props.readOnly,
      () => {
        console.log('props.readOnly', props.readOnly)
        editor.updateOptions({ readOnly: props.readOnly })
      },
      { deep: true },
    )

    watch(
      () => props.language,
      (newValue) => {
        monaco.editor.setModelLanguage(editor.getModel()!, newValue)
      },
    )

    onBeforeUnmount(() => {
      editor.dispose()
    })

    onMounted(() => {
      init()
    })

    return { codeEditBox }
  },
})
</script>
<style scoped>
.codeEditBox {
  width: 100%;
  flex: 1;
  min-height: 100px;
  min-height: 500px;
  overflow-y: auto;
}

.codeEditBox1 {
  height: calc(100% - 323px);
}
</style>
