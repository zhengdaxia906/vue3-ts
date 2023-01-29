type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string //字段识别
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[] // select
  otherOptions?: any //特殊属性
  isHidden?: boolean
}
export interface LyFormConfig {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
