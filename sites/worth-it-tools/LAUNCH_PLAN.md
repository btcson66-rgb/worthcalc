# WorthCalc 上架與變現計畫

## 網域建議（買網域時直接查這些，年費約 US$10）

優先順序由上而下（以可註冊性與品牌性排序，購買前請先查詢是否可註冊）：

1. `worthcalc.com` — 與站名一致，首選
2. `worthit.tools` — 語意最強，.tools 便宜且切題
3. `isitworth.money` / `worthcalc.app`
4. `suankanma.com`（算看嘛）— 台灣味備選
5. 避免連字號、避免 .xyz/.top（AdSense 審核觀感差）

註冊商建議：Cloudflare Registrar（成本價、無漲價陷阱）或 Porkbun。

## 上架步驟（買到網域後，照順序做）

1. GitHub 建 repo（或用現有 repo），推送本站
2. Cloudflare Pages 連結 repo：build command `npm run build`、output `dist`、環境變數 `SITE_URL=https://<你的網域>`
3. `site.config.ts` 的 `baseUrl` 改成正式網域、`contactEmail` 改成真實信箱
4. 綁定自訂網域到 Pages
5. GA4 建立資源 → 把 `PUBLIC_GA_ID` 設進 Cloudflare Pages 環境變數
6. Google Search Console 驗證網域 → 提交 `/sitemap-index.xml`
7. **先跑流量，再申請 AdSense**：建議站齡 4–8 週、日均 50+ 造訪再申請，通過率高很多
8. AdSense 通過後：`PUBLIC_ADSENSE_CLIENT` 設定 → rebuild → 開啟 `adsEnabled`

## 收益預期管理（誠實版）

- 第 1–2 個月：收錄期，幾乎零收入
- 第 3–6 個月：長尾關鍵字開始有排名，AdSense 審核通過，月收入 US$5–50 級距
- 6 個月後：若每月自然流量達 3–5 萬 PV（金融決策類 RPM 較高），月收入 US$100–500 可期
- 加速手段：每月新增 1–2 個工具＋1–2 篇文章；把工具分享到 Dcard（理財板）、PTT（CreditCard/MobileComm/home-sale 板）、Reddit（r/personalfinance 需遵守板規）

## 後續擴充工具候選（依搜尋需求排序）

- 新青安房貸試算（台灣獨佔缺口）
- TPASS 月票回本計算
- 勞退自提 6% 值不值得
- 手機資費 vs 預付卡比較
- Amazon Prime / Disney+ 各訂閱 worth-it 單頁（EN 長尾）
