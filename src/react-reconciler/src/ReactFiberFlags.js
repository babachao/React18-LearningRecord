// 在React，DIFF时，用到的二进制判断使用
export const NoFlags = 0b00000000000000000000000000; // 没有任何操作 ==> 0
export const Placement = 0b00000000000000000000000010; // 有插入有更新 
export const Update = 0b00000000000000000000000100; // 有更新