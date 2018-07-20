<template>
	<div class="wrapper">
    <va-navibar></va-navibar>
    <va-slider :slideMenuItems="slideMenuItems"></va-slider>
    <va-content-wrap></va-content-wrap>
    <Modal></Modal>
  </div>
</template>
<script>
import VANaviBar from '../common/NaviBar.vue'
import VASlider from '../common/Slider.vue'
import VAContentWrap from '../common/ContentWrap.vue'
import Modal from '../../components/Modal.vue'
import slideMenuItems from '../../lib/slideMenuItems.js'

export default {
  data () {
    return {
      slideMenuItems: slideMenuItems
    }
  },
  created () {
  },
  components: {
    'va-navibar': VANaviBar,
    'va-slider': VASlider,
    'va-content-wrap': VAContentWrap,
    Modal
  }
}
</script>
