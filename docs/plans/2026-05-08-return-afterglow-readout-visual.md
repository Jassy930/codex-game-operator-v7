# 归航余辉读回视觉实现计划

目标：把 `归航余辉` 从普通提示行升级为 `共鸣矩阵` 内的结构化读回块。

架构：只修改 `App` 的现有 `hasActiveReturnAfterglow` 渲染分支和 CSS。复用现有状态：`returnAfterglowDust` 与 `returnAfterglowRebuildCount`，不新增状态字段、资源、图片或面板。

技术栈：React 19、TypeScript、Vite、Vitest、Bun、CSS。

---

## 任务 1：写失败测试

文件：`src/App.test.tsx`

步骤 1：新增断言

在 `explains afterglow when parked resonance can speed up the next loop` 测试中加入：

```ts
expect(html).toContain('class="return-afterglow-readout"');
expect(html).toContain("起步星尘");
expect(html).toContain("可重建");
```

步骤 2：验证红灯

运行：`bun test src/App.test.tsx`

预期：失败，因为当前余辉只是普通 `resonance-choice-hint` 段落。

## 任务 2：实现结构化读回

文件：`src/App.tsx`

步骤 1：替换普通段落

将 `hasActiveReturnAfterglow` 分支改为 `.return-afterglow-readout`，保留原说明句，并新增两个数据格。

步骤 2：运行聚焦测试

运行：`bun test src/App.test.tsx`

预期：通过。

## 任务 3：添加样式

文件：`src/styles.css`

步骤 1：增加读回样式

添加 `.return-afterglow-readout`、`.return-afterglow-stats` 和子元素样式，使用现有暖色和 8px radius。

步骤 2：验证构建

运行：`bun run build`

预期：通过。

## 任务 4：更新文档

文件：

- `docs/DECISION.md`
- `docs/RELEASE_LOG.md`

步骤 1：记录决策

记录本轮只增强视觉和交互读回，不改变公式或玩法边界。

步骤 2：记录发布说明

记录 `归航余辉` 读回块。

## 任务 5：完整验证

命令：

- `bun test`
- `bun run build`
- `./ops/governor-check.sh`
- `git diff --check`

预期：全部通过。
