
import { createHostRootFiber } from './ReactFiber'
import { initialUpdateQueue } from './ReactFiberClassUpdateQueue';

/**
 * @description: 创建Fiber的根节点类的方法
 */
function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo;
}

/**
 * @description: 创建一个Fiber的根节点
 * @param {*} containerInfo 容器的信息 -> 根节点
 */
export function createFiberRoot(containerInfo){
  // Fiber的根节点
  const root = new FiberRootNode(containerInfo);
  // HostRoot指的就是根节点div#root
  const uninitializedFiber = createHostRootFiber();
  /**
   * 1、current代表当前节点对应的fiber
   * 2、根容器的current指向当前的根fiber
   * 3、指的是当前根容器它正在显示的，或者说已经渲染好的fiber树
   * */ 
  root.current = uninitializedFiber;
  // 根fiber的stateNode，也就是真是dom节点指向FiberRootNode
  uninitializedFiber.stateNode = root;
  initialUpdateQueue(uninitializedFiber)
  return root;
}