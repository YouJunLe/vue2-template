<template>
  <div class="about charts">
    <Chart01 />
    <EChart02 />
    <EChart03 />
    <EChart04 />
  </div>
</template>
<script>
import Chart01 from '../components/EChart01.vue'
import EChart02 from '../components/EChart02.vue'
import EChart03 from '../components/EChart03.vue'
import EChart04 from '../components/EFChart04.vue'
export default {
  components: {
    Chart01,
    EChart02,
    EChart03,
    EChart04
  }
}
</script>

<style>
.about {
  width: 100%;
  height: calc(100% - 142px);
}
.charts {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 300px 300px;
  grid-auto-rows: 300px;
  grid-auto-columns: 33.33%;
}
</style>