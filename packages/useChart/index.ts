import * as echarts from 'echarts';
import { onBeforeUnmount, ref, markRaw } from 'vue';

/**
 * Description echarts hook
 * @param {any} domId:string
 * @returns {any}
 */
export const useChart = (domId: string): any => {
  const myChart = ref<echarts.ECharts | null>(null);
  const showChart = ref<boolean>(true);

  const chartListener = () => {
    if (showChart.value) {
      console.log('echarts hook: chart resize');
      myChart.value?.resize();
    }
  };

  const initChart = () => {
    const chartDom = document.getElementById(domId) as HTMLElement;
    myChart.value = markRaw(echarts.init(chartDom));
    window.addEventListener('resize', chartListener);
  };

  onBeforeUnmount(() => {
    window.removeEventListener('resize', chartListener);
    if (myChart.value != null) {
      myChart.value.clear();
      myChart.value.dispose();
      myChart.value = null;
    }
  });

  return { myChart, showChart, initChart, chartListener };
};
