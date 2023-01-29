<template>
  <div class="menu">
    <page-content :tableConfig="tableConfig" pageName="menu"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { tableConfig } from './config/content.config'
export default defineComponent({
  name: 'menu',
  components: {
    PageContent
  },
  setup() {
    return {
      tableConfig
    }
  }
})
</script>

<style scoped></style>
