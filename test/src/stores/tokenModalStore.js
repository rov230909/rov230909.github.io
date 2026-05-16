import { defineStore } from 'pinia'

export const useTokenModalStore = defineStore('tokenModal', {
  state: () => ({
    visible: false,
    tokenData: {
      name: '--',
      uid: '--',
      region: '--',
      tokenType: 'TOKEN',
      token: ''
    }
  }),
  actions: {
    show(data) {
      this.tokenData = { ...this.tokenData, ...data }
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
})