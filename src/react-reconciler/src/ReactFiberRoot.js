
// Fiber的根节点类
function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo;
}

// 创建一个Fiber的根节点
export function createFiberRoot(containerInfo){
  // Fiber的根节点
  const root = new FiberRootNode(containerInfo);
  return root;
}