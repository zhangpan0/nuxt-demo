import Vue from 'vue'
import * as commonUI from '@/components/component.js'

Object.keys(commonUI).forEach(key => {
  Vue.component(key,commonUI[key])
})