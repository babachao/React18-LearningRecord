
import { createFiberRoot } from './ReactFiberRoot' // 创建一个Fiber的根节点

/**
 * @description: 创建一个容器
 * @param {*} containerInfo 容器信息
 */
export function createContainer(containerInfo){
  return createFiberRoot(containerInfo);
}