// 此处后面会实现一个实现优先队列
/**
 * @description: 调度的回调函数
 * @param {*} callback
 * @author: huchao
 */
export function scheduleCallback(callback){
  requestIdleCallback(callback)
}