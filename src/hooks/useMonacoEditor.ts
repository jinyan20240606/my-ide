// src\hooks\useMonacoEditor.ts
import loader from '@monaco-editor/loader'
// import * as monaco from 'monaco-editor';
import { ref } from 'vue'

const monacoRef = ref<any>(null)
loader.config({
  paths: {
    vs: 'https://unpkg.com/monaco-editor@0.50.0/min/vs'
  }
})

// loader.config({ monaco });
const monacoLoader = loader.init()

const initMonaco = () => {
  return new Promise<void>((resolve, reject) => {
    if (monacoRef.value) {
      resolve()
      return
    }
    monacoLoader
      .then((monacoInstance) => {
        monacoRef.value = monacoInstance
        resolve();
      })
      .catch((error) => {
        reject()
        if (error?.type !== 'cancelation') {
          console.error('Monaco initialization error:', error)
          
        }
      })
  })
}

export function useMonacoEditor() {
  return {
    initMonaco,
    monacoRef
  }
}
