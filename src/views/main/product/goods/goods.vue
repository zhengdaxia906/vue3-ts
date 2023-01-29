<template>
  <div class="goods">
    <page-content :tableConfig="tableConfig" pageName="goods">
      <template v-slot:image="{ row }">
        <el-image
          style="width: 100px; height: 100px"
          :src="row.imgUrl"
          :zoom-rate="1.2"
          :preview-src-list="[row.imgUrl]"
          :initial-index="4"
          fit="cover"
        />
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { tableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
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
