/**
 * 并发更新，本来此方法要处理更新优先级问题
 * @description: 目前只实现向上找到根节点
 */

import { HostRoot } from "./ReactWorkTags";

export function markUpdateLaneFromFiberToRoot(sourceFiber){
    let node = sourceFiber; // 当前的fiber
    let parent = sourceFiber.return; // 当前节点的父节点，父fiber
    // 如果有父节点
    // 则让node = parent
    // parent = parent.return, 继续往上冒泡查找
    while (parent !== null) {
        node = parent;
        parent = parent.return;
    }
    // 一直找到parent为null 如果node为根节点，则返回根节点stateNode
    // node.tag => 当前节点的Fiber类型
    if (node.tag === HostRoot) {
      return node.stateNode
    }
    return null;
}