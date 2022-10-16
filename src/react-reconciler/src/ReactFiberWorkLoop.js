import { scheduleCallback } from 'scheduler';
import { createWorkInProgress } from './ReactFiber';
import { beginWork } from './ReactFiberBeginWork';

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


function prepareFreshStack(root) {
  // 根据老Fiber创建一个新的Fiber，并执行工作, root.current表示老的根Fiber
  workInProgress = createWorkInProgress(root.current, null);
  console.log('-----workInProgress',workInProgress);
}


/**
 * @description: 开始构建Fiber树, 先构建HostRootFiber
 * @param {*} root
 * @return {*}
 * @author: huchao
 */
function renderRootSync(root) {
    // 1、准备一个新鲜的一个栈
    prepareFreshStack(root)
    // 2、先做同步的工作循环
    workLookSync()

}

/**
 * @description: 工作循环（同步）
 * @author: huchao
 */
function workLookSync() {
  // 如果有需要执行的任务，则进来while
  // workInProgress: 表示的是新的Fiber的
  while (workInProgress !== null) {
    // perform: 执行
    // 执行我们的工作单元
    performUnitOfWork(workInProgress);
  }
  
}

/**
 * @description: 执行工作单元
 * @param {*} unitOfWork 表示的是新的Fiber，通过createWorkInProgress()创建的
 * @return {*}
 * @author: huchao
 */
function performUnitOfWork(unitOfWork) {
  // unitOfWork：代表新的firber
  // unitOfWork.alternate： 而新Fiber的alternate指向的是老的friber
  // current：获取新fiber对应的老fiber -> 即页面中已经展示的fiber
  const current = unitOfWork.alternate;
  // 1、完成当前fiber的子ifiber链表构建后
  const next = beginWork(current, unitOfWork);
  // 2、将等待生效的变成给已经生效，则代表unitOfWork的pendingProps已经使用过了
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  // 3、next为null，表示已经没有子节点了，beginWork()中当前的fiber已经完成了
  if(next === null) {
    workInProgress = null; // TODO 暂时为null
    // completeUnitOfWork(unitOfWork);
  }
  else{ // 4、如果有子节点，就让子节点成为下一个工作单元
    workInProgress = next;
  }
}