<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import './static/css/index.scss';
onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');//123
});
</script>

<style>
</style>
