<script setup lang="ts">
import { ref } from "vue";
import monacoEditor from "./monacoEditor.vue";
const value = ref("const a = 1");
const language = ref("javascript");
const hightChange = ref<any>(false);
const editorMounted = (editor: any) => {
  console.log("editor实例加载完成", editor);
};

const onChange = (value: any) => {
  console.log("onchange--value", value);
};
</script>

<template>
  <h1>-----editor---</h1>
  <div class="editor-wrap">
    <monacoEditor
      v-model="value"
      :language="language"
      :hight-change="hightChange"
      :read-only="tablist?.length === 0"
      width="100%"
      height="100%"
      @editor-mounted="editorMounted"
      @change="onChange"
      theme="vs-dark"
    />
  </div>
</template>

<style scoped>
.editor-wrap {
  width: 1000px;
  min-height: 500px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
