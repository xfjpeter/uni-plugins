<template>
	<view>
     <v-tabs :tabs="tabs" v-model="current" auto :scroll="false"></v-tabs>
	</view>
</template>

<script>
import vTab from '@/components/v-tabs1/v-tabs.vue'
export default {
  components:{
    vTab
  },
  data() {
    return {
      current: 0,
      tabs: []
    }
  },
  created() {
    setTimeout(() => {
      this.tabs = ['新闻', '体育']
      // this.current = 0
    }, 2000)
  }
}
</script>

<style lang="scss">

</style>
