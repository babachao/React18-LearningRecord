import { scheduleCallback } from 'scheduler';

let workInProgress= null; // 表示正在进行的一个工作

/**
 * @method schedeleUpdateOnFiber 调度更新一个Fiber
 * @description: 计划更新root。1、源码中此处有一个调度任务的功能
 * @return {*}
 * @author: huchao
 */
export function schedeleUpdateOnFiber(root){
  // 确保调度执行root上的更新
  ensureRootIsScheduled(root);
}

/**
 * @description: 确保root要执行更新
 * @author: huchao
 */
function ensureRootIsScheduled(root){
  scheduleCallback(performConcurrentWorkOnRoot.bind(null, root));
}

/**
 * @description: 不断的执行更新，1、根据虚拟DOM构建fiber树 2、构建完之后创建真实的DOM节点 3、还要把真是的DOM节点插入容器
 * @param {*} root
 * @author: huchao
 */
function performConcurrentWorkOnRoot(root) {
    console.log('------performConcurrentWorkOnRoot',root)
    // 第一次肯定是以同步的方式渲染根节点，初次渲染的时候，不管在并发模式下还是异步模式下，都是同步的
    // 因为初次渲染要保证页面顺利加载出来，不能太卡
    renderRootSync(root);
}

function renderRootSync(root) {
    // 开始构建Fiber树
}