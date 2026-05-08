# Documentation Policy

本文档定义运行态文档和归档文档的边界，配合 `ops/governor-check.sh` 的 line / size budget 使用。

## Runtime Docs

运行态文档用于每轮快速决策，只保留当前状态、当前决策、仍被自动化引用的锚点和下一步候选。

受预算约束的 runtime docs：

- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/SELF_PLAYTEST.md`
- `docs/RETROSPECTIVE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/CONTENT_ARC.md`
- `docs/RESEARCH.md`
- `docs/RELEASE_LOG.md`

这些文件不应继续累积完整历史流水。新增长记录时，先归档，再在 runtime doc 中写一段高信号摘要和归档路径。

## Runtime Budgets

`ops/governor-check.sh` 同时检查行数和文件大小，避免用超长单行绕过预算。

| File | Max Lines | Max Bytes |
|---|---:|---:|
| `docs/DECISION.md` | 180 | 12000 |
| `docs/GOVERNOR_STATE.md` | 160 | 12000 |
| `docs/SELF_PLAYTEST.md` | 220 | 14000 |
| `docs/RETROSPECTIVE.md` | 240 | 14000 |
| `docs/HARNESS_CHANGELOG.md` | 280 | 16000 |
| `docs/CONTENT_ARC.md` | 220 | 14000 |
| `docs/RESEARCH.md` | 320 | 16000 |
| `docs/RELEASE_LOG.md` | 220 | 16000 |

## Archive Docs

历史细节、长证据、旧 self-playtest、旧 research、旧 changelog 和长 retrospective 应进入 `docs/archive/`。

归档要求：

- 归档路径必须按日期或主题命名。
- 归档内容可以长，但不能成为当前 cycle 的必读入口。
- Runtime doc 必须指向对应归档路径。

## Decision Anchors

`docs/DECISION.md` 必须保留仍被 `docs/ISSUE_LEDGER.md` 引用的 `DECISION:YYYY-MM-DD-slug` 锚点。归档旧细节时不能删除这些可校验锚点，除非 issue ledger 同步更新为不再引用。

## Release Log

`docs/RELEASE_LOG.md` 可以保留较长发布流水，但仍受预算约束。超过预算时，应把旧条目移入 release archive，并保留当前版本、最近发布和 issue evidence 所需摘要。

## Rule

如果 `./ops/governor-check.sh` 报告 runtime doc 超预算，不要提高预算绕过；先归档旧细节，再压缩当前文档。预算调整只能作为显式 harness decision 处理，并说明为什么压缩不能解决。
