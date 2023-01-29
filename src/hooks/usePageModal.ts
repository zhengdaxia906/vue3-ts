import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CbType = (item?: any) => void

export function usePageModal(addCb?: CbType, editCb?: CbType) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleAddClick = () => {
    defaultInfo.value = {}
    console.log(pageModalRef.value)
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    addCb && addCb()
  }
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [pageModalRef, defaultInfo, handleAddClick, handleEditClick]
}
