# 采集动机实施计划

> **给执行代理:** 必须按 `superpowers:executing-plans` 的任务顺序执行本计划。

**目标:** 通过最小 UI 文案和短暂反馈，让玩家在前 60 秒理解为什么要采集星尘。

**架构:** 改动限定在现有 React 首屏。复用 `event-stack` 显示短暂反馈，不新增机制、面板、资源、telemetry 上传或经济数值变化。

**技术栈:** React、TypeScript、Vite、Vitest、Bun。

---

### 任务 1：添加失败测试

**文件:**
- 修改：`src/App.test.tsx`

**步骤 1：写失败测试**

在首屏渲染测试中加入动机文案断言：

```ts
expect(html).toContain("星尘会变成自动采集器，让工坊持续产出");
```

增加采集反馈格式化测试：

```ts
expect(formatCollectFeedbackMessage(1)).toBe(
  "采集到 1 星尘：正在推进下一台自动采集器",
);
```

**步骤 2：验证测试失败**

运行：`bun test src/App.test.tsx`

预期：失败，因为 `formatCollectFeedbackMessage` 和动机文案尚不存在。

### 任务 2：实现最小 UI 变更

**文件:**
- 修改：`src/App.tsx`
- 修改：`src/styles.css`

**步骤 1：添加动机文案**

在 `resource-readout` 的每秒产出下方渲染一行短文案：

```tsx
<p className="motivation-copy">星尘会变成自动采集器，让工坊持续产出</p>
```

**步骤 2：添加采集反馈**

增加本地状态和计时器，结构与购买反馈保持一致：

```tsx
const [collectMessage, setCollectMessage] = useState("");
```

采集点击时显示：

```tsx
showCollectMessage(formatCollectFeedbackMessage(state.dustPerClick));
```

在 `event-stack` 中渲染：

```tsx
{collectMessage ? <p className="collect-feedback">{collectMessage}</p> : null}
```

**步骤 3：导出格式化函数**

```ts
export function formatCollectFeedbackMessage(dustPerClick: number): string {
  return `采集到 ${formatNumber(dustPerClick)} 星尘：正在推进下一台自动采集器`;
}
```

### 任务 3：验证并同步文档

**文件:**
- 修改：`docs/SELF_PLAYTEST.md`
- 修改：`docs/RELEASE_LOG.md`
- 修改：`docs/ISSUE_LEDGER.md`

**步骤 1：运行验证**

运行：

```bash
bun test
bun run test
bun run build
./ops/governor-check.sh
```

预期：全部通过。

**步骤 2：更新文档**

记录 self-playtest 后续检查和 release log 条目。回复 #1 后，把 `ISSUE_LEDGER.md` 更新为已回复并关联提交。
