# 內容庫（scheduled content library）

每日排程（fable-daily-content）從這裡取當天到期的文章上線。

## 規則

- 檔名格式：`YYYY-MM-DD__slug.zh.astro` 與 `YYYY-MM-DD__slug.en.astro`（成對，缺一不上線）。
  日期＝預定上線日（台北時間）。
- 檔案內容＝最終形態的文章頁，import 路徑按目的地寫
  （目的地 `src/pages/{zh,en}/slug.astro`，layout 為 `../../layouts/ArticleLayout.astro`）。
- 上線動作＝複製到 `src/pages/zh/slug.astro`、`src/pages/en/slug.astro` 後刪除庫存檔，
  經 branch → PR → merge 部署（老闆 2026-07-17 授權每日內容 PR 自動合併）。
- 本資料夾不在 `src/pages/` 內，Astro 不會建頁，未到期內容不會出現在站上。
- YMYL 紀律：純數學教育、零產品推薦、報酬率標明假設、結尾雙聲明。
