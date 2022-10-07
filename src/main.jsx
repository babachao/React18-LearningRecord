// 入口文件
import { createRoot } from 'react-dom/client';
let element = (
  <h1 ref="h1">
    <p>可爱的</p>
    <span style={{ color: "#000" }}>羊巴鲁</span>
  </h1>
);
const root = createRoot(document.getElementById('root'));
// console.log(root);
root.render(element);