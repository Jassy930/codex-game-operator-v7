# Governor State

## Selected Mode

RELEASE_INFRA

## Reason

当前没有开放 GitHub Issues。Pages workflow 每次部署仍出现 Node.js 20 deprecation annotation；GitHub Actions 已提供更新的 Pages action 版本，应维护发布基础设施。

## Allowed Actions

- 更新 GitHub Pages workflow。
- 使用当前 action release 版本。
- 运行本地测试和构建。
- 推送后确认 Pages workflow。

## Forbidden Actions

- 不改玩法代码。
- 不新增部署平台。
- 不降低测试或构建门槛。
- 不回复 issue。

## Exit Criteria

- Pages workflow 使用更新的 actions 版本。
- 本地测试和构建通过。
- 推送后 Pages workflow 成功。
- 治理检查通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。本轮只允许发布基础设施维护。

## Last Updated

2026-05-06: RELEASE_INFRA GitHub Pages actions 已升级；`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 均通过，等待推送后确认 workflow。
