# Asset Workflow

## 目的

确保游戏需要视觉素材时，operator 会显式评估 `imagegen`，并把素材选择纳入 North Star、复杂度预算和发布检查。

资产不是装饰任务。只有当素材能改善前 60 秒清晰度、成长反馈、回访体验或当前 roadmap 目标时，才允许进入实现。

## 适用范围

本工作流适用于：

- 背景图、插图、纹理、sprite、物品图、升级图标等 raster asset。
- 用于页面、游戏 UI、发布说明或 playtest 邀请的真实视觉素材。
- 需要生成、编辑或派生图片的游戏体验改动。

不适用于：

- 纯文字、布局、CSS 状态、进度条或数值反馈。
- 已有设计系统里的简单图标。优先使用现有图标库或 CSS。
- 只为了“更丰富”而添加的装饰图。

## 决策闸门

任何涉及游戏视觉表现的决策，必须先回答：

1. 这个素材解决哪个玩家问题？
2. 它是否支持 `docs/NORTH_STAR.md` 或当前 roadmap milestone？
3. 它会不会增加首屏噪音、复杂 lore 或额外面板？
4. 是否应使用 `imagegen` 生成 raster asset？
5. 如果不使用 `imagegen`，理由是什么？

结论必须记录到 `docs/DECISION.md`。如果素材来自真实玩家反馈，还必须先经过 `docs/SIGNAL_ROUTING.md`、`docs/ISSUE_LEDGER.md` 和 `docs/FEEDBACK_CLUSTERS.md`。

## imagegen 使用规则

当需要新的 raster asset 时，默认先考虑 `imagegen`。

允许使用：

- 游戏背景、资源/建筑/升级插图、sprite、纹理、透明背景 cutout。
- 用于解释当前核心循环的视觉反馈。
- 用于公开预览或 playtest 的少量主视觉。

禁止使用：

- 生成不符合当前玩法阶段的复杂世界观或大量内容。
- 用图片替代本应清晰的 UI 文案、数值或交互。
- 为了迎合单个 issue 生成大量素材。
- 生成、提交或暗示真实玩家、真实指标、授权品牌或私密数据。

可以不使用 `imagegen` 的情况：

- 素材应是标准 UI 图标，且现有图标库已经覆盖。
- 视觉可以用 CSS、文本或现有组件更清楚地表达。
- 当前模式禁止新增视觉复杂度。
- 素材没有明确决策来源。

## 资产规格

实现前必须写清楚：

- 用途：素材会出现在哪里，服务哪个玩家理解问题。
- 尺寸：目标宽高、响应式约束和是否需要透明背景。
- 风格：与现有界面一致的色彩、密度和情绪。
- 状态：是否需要 hover、disabled、active、升级前后等状态。
- 文件位置：游戏内素材放在 `src/assets/`；文档素材放在 `docs/assets/`。
- 命名：使用小写短横线，例如 `auto-collector-idle.png`。

## 实施流程

```text
发现视觉素材需求
→ 检查 North Star / roadmap / feedback 来源
→ 在 DECISION 中记录素材理由
→ 判断 imagegen / 现有图标 / CSS / 不做
→ 生成或准备素材
→ 接入 UI
→ 验证桌面和移动视口
→ 更新 RELEASE_LOG
```

## 验证要求

提交前必须检查：

- 素材在桌面和移动视口都能加载。
- 图片不会遮挡文字、按钮、进度条或反馈入口。
- 图片文件大小与用途相称。
- alt 文本、aria label 或等价语义已经处理。
- 没有引入外部追踪、远程热链、私密数据或不明授权来源。
- `bun test`、`bun run test`、`bun run build` 和 `./ops/governor-check.sh` 通过。

## Review Checklist

Product Reviewer:

- 素材是否改善前 60 秒清晰度、成长反馈或当前 roadmap milestone？
- 是否避免把图片当作新增玩法或复杂 lore？

Governor Reviewer:

- 是否记录到 `docs/DECISION.md`？
- 如果不使用 `imagegen`，是否记录了理由？
- 是否违反 `docs/COMPLEXITY_BUDGET.md`？

Engineering Reviewer:

- 素材是否有稳定尺寸和响应式约束？
- 是否避免远程热链和不明授权来源？
- 构建后素材路径是否正确？

Release Reviewer:

- `docs/RELEASE_LOG.md` 是否记录素材变化？
- 公开预览是否能正确加载素材？
