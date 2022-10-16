import logger from "shared/logger";
import { HostRoot, HostComponent, HostText } from "./ReactWorkTags";

/**
 * @description: 更新【根节点】的方法。HostRoot：类型为3，表示的是根节点
 * @param {*} current  老的fiber
 * @param {*} workInProgress 新的fiber
 * @author: huchao
 */
function updateHostRoot(current, workInProgress) {
  // 1、需要知道它的子虚拟DOM（知道它儿子的虚拟DOM信息），它被存放在更新队列中
  // processUpdateQueue(workInProgress); // workInProgress.memoizedState = { element }
  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element; // 新的虚拟DOM
  // 协调子节点， DOM-DIFF算法在此方法中
  // reconcileChildren(current, workInProgress, nextChildren)
   // 第一次挂载，child肯定是为空的
  return workInProgress.child; // {tag: 5, type: 'h1' }
}

/**
 * @description: 更新【原生节点】的方法。HostComponent：类型为1，表示的是原生节点
 * @param {*} current  老的fiber
 * @param {*} workInProgress 新的fiber
 * @author: huchao
 */
 function updateHostComponent(current, workInProgress) {

}


/**
 * @description: 目标是：根据虚拟DOM构建新的fiber链表， 拿到child和sibling
 * @param {*} current  老的fiber
 * @param {*} workInProgress 新的fiber
 * @author: huchao
 */
export function beginWork(current, workInProgress){
  logger('beginWork', workInProgress)
  // 用新fiber的tag判断类型
  switch (workInProgress.tag) {
      case HostRoot:
        return updateHostRoot(current, workInProgress);
      case HostComponent:
        return updateHostComponent(current, workInProgress);
        // HostText类型为6，表示的是文本节点，文本节点是肯定不存在子节点的，所以return null;
      case HostText:
        return null;
      default:
        return null;
  }
}