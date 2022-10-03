
import { createContainer } from 'react-reconciler/src/ReactFiberReconciler'

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

// 创建一个根，div#root。
// 简单来说FiberRootNode = containerInfo, 它的本质就是一个真是的容器DOM节点 -->指向div#root
export function createRoot(container) {
  const root = createContainer(container); // 创建容器
  return new ReactDOMRoot(root);
}