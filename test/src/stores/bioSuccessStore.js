import { defineStore } from 'pinia'

export const useBioSuccessStore = defineStore('bioSuccess', {
  state: () => ({
    visible: false,
    bioData: {
      name: '--',
      uid: '--',
      bioHtml: ''
    }
  }),
  actions: {
    show(data) {
      this.bioData = { ...this.bioData, ...data }
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
})