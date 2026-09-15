# S4 五語系 about 行動版渲染驗收

- viewport：375 × 667，Playwright headless Chromium
- 外部網路：已封鎖；只檢查本次 dist 產物

| locale | HTTP | 作者方法論區塊 | 水平溢出 | 截圖 |
| --- | ---: | --- | --- | --- |
| en | 200 | PASS | PASS | [screenshot](./assets/s4-about-en-375.png) |
| zh | 200 | PASS | PASS | [screenshot](./assets/s4-about-zh-375.png) |
| es | 200 | PASS | PASS | [screenshot](./assets/s4-about-es-375.png) |
| fr | 200 | PASS | PASS | [screenshot](./assets/s4-about-fr-375.png) |
| de | 200 | PASS | PASS | [screenshot](./assets/s4-about-de-375.png) |

五語系區塊均成功渲染，且未發現水平溢出。
