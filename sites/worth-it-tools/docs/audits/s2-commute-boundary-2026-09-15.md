---
date: 2026-09-15
status: PASS_LOCAL
site: worthcalc.win
scope: en/zh commute-cost
---

# S2 通勤計算邊界測試

測試集中在共用純函式 `src/lib/commuteMath.mjs`，由英文與繁體中文通勤頁共同使用。輸入集合包含空值、空字串、0、負數、`NaN`、`Infinity` 與 `1e300`；所有結果都必須是有限且非負數，避免 UI 出現 `NaN`／`Infinity` 或因超大值掛住。

## 實際命令與結果

```text
npm.cmd run test:commute

✔ finiteNonNegative normalizes malformed and negative browser values
✔ driving rates cover imperial, metric fuel, EV, and zero efficiency
✔ mode breakdowns always return finite outputs at boundaries
✔ RTO annual comparison is zero for remote baseline and finite for seven days
✔ mile and kilometer distance rates preserve a round trip
ℹ tests 5
ℹ pass 5
ℹ fail 0
```

## 反向閘門

暫時把超大值上限斷言由 `<= 1e9` 改成 `<= 1`，同一命令實際以 exit 1 失敗；還原斷言後再次執行，以 exit 0、5/5 通過。這確認測試閘門在斷言被破壞時會阻止通過，且工作樹已還原為正確版本。

## 覆蓋範圍

- 單位：英里／加侖／MPG 與公里／公升／L/100 km。
- 動力：直接每距離成本、燃油與 EV kWh/100 distance。
- 方式：汽車／EV、機車、大眾運輸、叫車與單車；保留停車、過路費、月票、車資、單車成本與時間價值。
- 輸出：每趟、每天、每月、每年、每英里／公里，以及每週進辦公室天數相對完全遠距的 RTO 年增成本。
