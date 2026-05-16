import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    visible: false,
    message: ''
  }),
  actions: {
    show(msg) {
      this.message = msg
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 3000)
    }
  }
})