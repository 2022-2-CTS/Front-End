<template>
    <div class="info-title">
      해운대구
      <div class="info-map-icon">
        <img :src="require('@/img/now_position_icon.svg')" style="width: 38px; height: 38px; padding-top: 5px;" />
      </div>
    </div>

    <div style="margin-bottom:20px">
      <label class="switch-button">
        <input type="checkbox"  @click="infoshare=!infoshare"/>
        <span class="onoff-switch"></span>
      </label>
        <span v-if="infoshare" class="switch-text">정보공유</span>
        <span v-if="!infoshare" class="switch-text">같이고고</span>
    </div>

  <div v-if="infoshare"><Infoshare/></div>
  <div v-else><InfoTogether/></div>
</template>

<script>
import Infoshare from './InfoShare.vue';
import InfoTogether from './InfoTogether.vue';

export default {
    name: 'info',
    data() {
        return {
            infoshare: true,
        }
    },
    components: {
        Infoshare: Infoshare,
        InfoTogether: InfoTogether,
    }
}
</script>

<style>

</style>