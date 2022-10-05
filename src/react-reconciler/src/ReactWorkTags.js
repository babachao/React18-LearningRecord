// 工作标识
// 每种虚拟DOM都会对应自己的fiber tag类型
export const HostRoot = 3; // 根fiber的tag类型
export const HostComponent = 1; // 组件fiber的tag类型
export const HostText = 6; // 文本fiber的tag类型