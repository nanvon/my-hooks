export interface DisabledTimeOptions {
  allowStartHour: number;
  allowStartMinute: number;
  allowEndHour: number;
  allowEndMinute: number;
}

/**
 * @description a-time-picker组件的disabled-hours和disabled-minutes配置hook
 * @param {any} options:DisabledTimeOptions
 * @returns {any}
 */
export const useDisabledHoursMinutes = (options: DisabledTimeOptions): any => {
  const disabledHours = () => {
    const hours: number[] = [];
    // 禁用允许开始小时之前的小时
    for (let i = 0; i < options.allowStartHour; i++) {
      hours.push(i);
    }
    // 禁用允许结束小时之后的小时
    for (let i = options.allowEndHour + 1; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  const disabledMinutes = (selectedHour: any) => {
    if (selectedHour === options.allowStartHour) {
      // 禁用允许开始小时的开始分钟之前的分钟
      const minutes: number[] = [];
      for (let i = 0; i < options.allowStartMinute; i++) {
        minutes.push(i);
      }
      return minutes;
    } else if (selectedHour === options.allowEndHour) {
      // 禁用结束小时的结束分钟之后的分钟
      const minutes: number[] = [];
      for (let i = options.allowEndMinute + 1; i < 60; i++) {
        minutes.push(i);
      }
      return minutes;
    } else if (selectedHour > options.allowStartHour && selectedHour < options.allowEndHour) {
      // 开始小时和结束小时直接的小时允许选择分钟
      return [];
    } else {
      // 其他小时禁用全部分钟
      const minutes: number[] = [];
      for (let i = 1; i < 60; i++) {
        minutes.push(i);
      }
      return minutes;
    }
  };

  return {
    disabledHours,
    disabledMinutes,
  };
};
