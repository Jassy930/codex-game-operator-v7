# Decision

## Current Biggest Problem

v0.4 已把现有共鸣层延长到第二共鸣门槛、第 2 个现有节点选择、20 小时巡航读回和双节点组合读回。当前最大问题不是继续追加第三里程碑或新节点，而是让 `共鸣矩阵` 在 2/2 永久节点都已启动后明确说明当前版本共鸣目标已经完成，避免玩家把满进度误读成还有隐藏的第三共鸣门槛。

## Evidence

- 2026-05-08 self-playtest 复核第二共鸣全部消费后的矩阵进度行：阶段目标已经能读回 20 小时巡航和双节点组合，但 `共鸣矩阵` 仍显示“第二共鸣已领取 · 自动采集器 25/25，调校 15/15”。
- 已知状态：矩阵已经显示“共鸣选择：2/2 个永久节点已启动”，节点按钮也能显示两个已启动节点和第三个节点选择已满。
- Gap: 进度行没有明确说“当前版本共鸣目标已完成”；玩家可能继续寻找第三门槛、第三点共鸣或隐藏的下一个节点。
- Decision: 本轮记录 `DECISION:2026-05-08-v04-resonance-completion-readback`。当第二共鸣已领取且 2 个永久节点都已启动时，复用现有 `共鸣矩阵` 进度行显示“当前版本共鸣目标已完成 · 自动采集器 25/25，调校 15/15”。不新增第三共鸣门槛、新节点、新面板、存档字段或指标字段。
- 2026-05-08 self-playtest 复核双节点组合：远端 `gh issue list` 当前无法连接 `api.github.com`，`data/metrics/events.jsonl` 为 0 行，本轮不能把新真实反馈或指标作为依据。
- 已知状态：`20 小时巡航` 已能在 2 个现有永久节点都启动、当前买不起下一升级、且下一升级进度达到 90% 以上时读回两个节点效果和等待时间。
- Gap: 双节点读回目前只是“稳定回路放大自动采集，回访线圈放大离线收益”这类效果拼接；当玩家选择 `稳定回路 + 调校刻印` 或其他组合时，界面没有给这次 2/2 长期选择一个可记忆的组合身份。
- Decision: 本轮记录 `DECISION:2026-05-08-v04-dual-node-combo-readback`。在同一 `星尘引擎室` 阶段目标行中，为 2 个已启动永久节点补组合名，例如“采集调校组合 · 稳定回路放大自动采集，调校刻印提高调校价值”。不新增第三共鸣门槛、新节点、新面板、存档字段或指标字段。
- 2026-05-08 self-playtest 主动模拟：第二共鸣约第 60,928 秒达成并启动第 2 个现有节点；到第 72,000 秒时，状态为 25 台自动采集器、15 次调校、已启动 `稳定回路` + `回访线圈`、每秒 +13.75 星尘、当前约 163,313.6 星尘，距离下一次调校工具 168,667 星尘约 6 分钟。
- 已知状态：矩阵已显示“共鸣选择：2/2 个永久节点已启动”，较早的双节点等待状态也会显示两个节点价值和下一次升级等待时间。
- Gap: 接近 20 小时时，阶段目标仍显示普通“回访计划”，没有把这段状态标成 v0.4 的 20 小时巡航收口；玩家能看到下一次升级，但不够明确这是第二共鸣后的当前版本长线节奏。
- Decision: 本轮记录 `DECISION:2026-05-08-v04-twenty-hour-cruise-readback`。当 2 个现有永久节点都已启动、当前买不起下一升级、且下一升级进度达到 90% 以上时，复用同一 `星尘引擎室` 阶段目标行显示“20 小时巡航：稳定回路放大自动采集，回访线圈放大离线收益，约 6 分钟后可购买调校工具”。不新增第三共鸣门槛、新节点、面板、存档字段或指标字段。
- 2026-05-08 self-playtest 复核第二点共鸣消费完后的矩阵状态：已领取首个和第二共鸣，可用共鸣为 0，已启动 `稳定回路` + `回访线圈`。
- 已知状态：事件反馈会在启动第 2 个节点时显示“第 2 个共鸣节点启动：节点名 · 节点效果”；阶段目标会在双节点状态下显示两个节点共同作用和下一次升级等待时间。
- Gap: `共鸣矩阵` 的节点按钮会分别显示“已启动”和“共鸣选择已满”，但矩阵没有集中说明“2/2 个永久节点已启动”；这让 16-20 小时窗口的长期选择完成状态不够明确。
- Decision: 本轮记录 `DECISION:2026-05-08-v04-resonance-choice-cap-readback`。复用现有 `共鸣矩阵` 选择提示行，在启动 2 个现有永久节点后显示“共鸣选择：2/2 个永久节点已启动”；不新增第三共鸣门槛、新节点、面板、存档字段或指标字段。
- 2026-05-08 用户明确要求继续作为独立开发运营游戏，并提出“前期游戏内容不多需要积极做游戏玩法和内容的扩展，目标先做到20小时的游戏时间”。
- 当前 v0.3 约束已经收敛了首个共鸣闭环：首个共鸣门槛、领取、已领取状态、三选一说明、首个节点价值反馈和回访计划读回都已覆盖；继续只做 no-change 会卡在同一阶段。
- 主动模拟显示：每秒点击一次并优先购买当前更便宜升级，首个共鸣约第 13,513 秒达成；选择 `稳定回路` 后继续到 20 小时，约第 60,928 秒达到 25 台自动采集器和 15 次调校，20 小时时状态为 25 台自动采集器、15 次调校、每秒 +13.75 星尘。
- Decision: 本轮记录 `DECISION:2026-05-08-v04-second-resonance-milestone`。新增 v0.4 20-hour resonance budget，允许最多 2 个共鸣里程碑、最多启动现有 3 个节点中的 2 个；不新增资源、面板、节点、存档版本、指标字段、prestige、任务系统或多生产线。
- 第一版实现第二共鸣门槛 `25 台自动采集器 + 15 次调校`，奖励 1 点 `共鸣`；首个共鸣已领取后，矩阵进度行推进为“首个共鸣已领取 · 下一共鸣”；第二共鸣领取后提示选择第 2 个永久节点。
- 2026-05-08 self-playtest 构造状态：已领取首个和第二共鸣，已启动 `稳定回路` + `回访线圈`，25 台自动采集器、15 次调校、50,000 星尘、每秒 +13.75 星尘；下一次调校 168,667 星尘，下一台自动采集器 252,512 星尘。
- 本轮 `gh issue list --repo Jassy930/codex-game-operator-v7 --state open --limit 20 --json ...` 无法连接 `api.github.com`；`data/metrics/events.jsonl` 为 0 行，不能把真实反馈或指标作为本次改动依据。
- Gap: `共鸣矩阵` 已显示两个节点都“已启动”，但旧阶段目标仍只读取第一个节点，回访计划只说稳定回路，没说回访线圈会放大下一次离线收益。
- Decision: 本轮记录 `DECISION:2026-05-08-v04-dual-node-return-plan`。双节点状态下，复用同一 `星尘引擎室` 阶段目标行同时读回两个已启动节点价值，并继续显示下一次升级的大致等待时间；不新增第三共鸣门槛、新节点、面板、存档字段或指标字段。
- 2026-05-08 self-playtest 构造状态：已领取首个和第二共鸣，已启动 `稳定回路`，仍有 1 点未消费 `共鸣`，25 台自动采集器、15 次调校、50,000 星尘、每秒 +13.75 星尘；下一次调校 168,667 星尘，下一台自动采集器 252,512 星尘。
- Gap: `共鸣矩阵` 已提示“选择第 2 个永久节点，最多启动 2 个”，但旧阶段目标仍显示“回访计划：稳定回路正在放大自动采集，约 2.4 小时后可购买调校工具”，把玩家导向等待升级而不是消费当前可用共鸣。
- Decision: 本轮记录 `DECISION:2026-05-08-v04-second-node-choice-goal`。当 `星尘引擎室` 中有可用共鸣且仍可启动节点时，复用同一阶段目标行优先显示“共鸣目标：选择第 2 个永久节点，最多启动 2 个”；已消费第二节点后保留双节点回访计划读回。不新增第三共鸣门槛、新节点、面板、存档字段或指标字段。
- 2026-05-08 self-playtest 复核第二共鸣节点真正启动瞬间：已领取首个和第二共鸣，已启动 1 个现有节点，准备消耗第 2 点共鸣启动第 2 个现有节点。
- Gap: 旧事件反馈只显示“共鸣节点启动：节点名”，没有说明第二次长期选择新增的节点效果，削弱 16-20 小时窗口的 milestone payoff。
- Decision: 本轮记录 `DECISION:2026-05-08-v04-second-node-unlock-feedback`。复用现有事件反馈区，把第 2 个共鸣节点启动反馈改为“第 2 个共鸣节点启动：节点名 · 节点效果”；首个节点仍使用同一格式但不标第 2 个。不新增第三共鸣门槛、新节点、面板、存档字段或指标字段。
- 2026-05-08 本轮 `gh issue list --repo Jassy930/codex-game-operator-v7 --state open --limit 20 --json number,title,state,updatedAt,comments,labels,body` 成功返回 Issue #1/#2；两条 issue 仍为既有反馈，各 1 条已预算回复，`updatedAt` 均为 2026-05-07T09:39:29Z，没有新玩家补充。
- `./ops/collect-feedback.sh` 已刷新 `data/feedback/github-feedback.md`，只更新时间戳和同一批 Issue #1/#2 证据。
- `gh run list --repo Jassy930/codex-game-operator-v7 --limit 5` 成功返回最近 5 次 `Deploy Pages`，均为 `completed/success`；最新 run `25534948014` 对应 `412686e docs: record metrics duration release status`。
- `curl -I --max-time 20 https://jassy930.github.io/codex-game-operator-v7/` 返回 HTTP 200，`last-modified` 为 2026-05-08 03:27:14 GMT。
- 真实 headless Chrome 读回样本：页面标题为 `星尘工坊`，`window.stardustWorkshopMetricsSnapshot` 存在；点击 2 次后快照为 `clickCount=2`、`sessionDurationMs=null`、`activeSessionDurationMs=16870`、`historyLength=0`、`feedbackClickedCount=0`，证明上一轮派生活跃时长可以在运行页面中使用。
- Decision: 本轮记录 `DECISION:2026-05-08-operate-remote-and-metrics-readback-no-change`。远端反馈、部署和本地 metrics 读回都已恢复，但没有新反馈或新 self-playtest gap；不新增玩法、不扩 metrics 字段、不回复 Issue #1/#2。
- 2026-05-08 release recovery 已把本地 `7257098 docs: record wait time release status` 推送到 `origin/main`。
- 2026-05-08 本轮 `gh issue list --repo Jassy930/codex-game-operator-v7 --state open --limit 20 --json number,title,state,updatedAt,comments,labels` 仍无法连接 `api.github.com`，不能通过 CLI 刷新远端 issue 状态；GitHub connector 的 recent issues 结果显示 Issue #1/#2 仍只有各 1 条评论，没有新实质补充。
- `data/metrics/events.jsonl` 当前为 0 行；本轮输入优先级转向 local-only metrics 快照可用性。
- Gap: `window.stardustWorkshopMetricsSnapshot()` 返回 current/history/storage keys/feedback count，但活跃 session 在页面仍打开时 `current.sessionDurationMs` 为 `null`，operator 不能直接读回当前 self-playtest 持续时长。
- Decision: 本轮记录 `DECISION:2026-05-08-active-session-duration-snapshot`。在快照中增加派生字段 `activeSessionDurationMs`；它不写入 localStorage，不新增采集事件，不上传 telemetry，只用 `sessionStartedAt`、`sessionEndedAt`、`sessionDurationMs` 和快照生成时间计算读回值。
- 约束：不新增资源、节点、面板、按钮、存档字段、上传路径、外部 analytics、个人数据、玩法系统、prestige、任务系统或多生产线。
- 2026-05-08 本轮 `gh issue list --repo Jassy930/codex-game-operator-v7 --state open --limit 20 --json number,title,state,updatedAt,comments,labels` 仍无法连接 `api.github.com`，不能刷新远端 issue 状态。
- `data/feedback/github-feedback.md` 仍只有 2026-05-07 的 Issue #1/#2 快照和已回复记录，没有仓库内新玩家补充。
- 构造状态：已领取首个共鸣、已启动 `稳定回路`、工坊处于 `星尘引擎室`，当前 12,000 星尘低于下一次调校工具 28,922 星尘和下一台自动采集器 33,253 星尘，每秒产出为 9.68 星尘。
- Gap: 旧阶段目标显示“攒到 28,922 星尘再购买调校工具”，但没有说明按当前产出约 29 分钟后可购买，planning loop 仍不够直接。
- Decision: 本轮记录 `DECISION:2026-05-08-return-plan-wait-time-readback`。当首个共鸣节点已启动、没有可见离线收益、当前买不起下一升级且每秒产出可计算时，复用同一阶段目标行显示大致等待时间；无法计算时回退到目标成本文案。
- 约束：只改提示层；不新增资源、节点、面板、按钮、存档字段、指标字段、反馈渠道、prestige、任务系统或多生产线。
- 2026-05-08 本轮 `gh issue list --repo Jassy930/codex-game-operator-v7 --state open --limit 20 --json number,title,state,updatedAt,comments,labels` 仍无法连接 `api.github.com`，不能刷新远端 issue 状态。
- `data/feedback/github-feedback.md` 最近一次生成于 2026-05-07，仍只包含 Issue #1/#2 的旧信号和已回复记录，没有仓库内新反馈证据。
- `data/metrics/events.jsonl` 当前为 0 行；多轮自动化记录都显示没有可读取的浏览器 `localStorage` 共鸣指标样本。
- 现有 `docs/METRICS.md` 只给出三条分散的 localStorage console 读取命令；operator 无法一次性拿到当前 session、最近 session history、storage key 和 feedback click 计数。
- Decision: 本轮记录 `DECISION:2026-05-08-local-metrics-snapshot-readback`。新增一个只读本地快照 API，并挂到浏览器 `window.stardustWorkshopMetricsSnapshot()`；快照只汇总已有 local-only 指标，不新增采集字段、上传路径、外部 analytics、个人数据、UI 面板或玩法系统。
- 构造状态：已领取首个共鸣、已启动 `稳定回路`、工坊处于 `星尘引擎室`，当前 12,000 星尘低于下一次调校工具 28,922 星尘和下一台自动采集器 33,253 星尘。
- Gap: 旧阶段目标显示“稳定回路已启动，继续扩建自动采集器放大产出”，但没有把当前买不起升级时的等待目标读回出来。
- Decision: 本轮记录 `DECISION:2026-05-08-return-planning-readback-slice`。当首个共鸣节点已启动、没有可见离线收益、且当前买不起下一升级时，复用同一阶段目标行显示“回访计划”，说明已选节点正在产生的价值，以及下一步攒到哪项升级。
- 约束：只改提示层；不新增资源、节点、面板、按钮、存档字段、指标字段、反馈渠道、prestige、任务系统或多生产线。
- 8 小时主动模拟显示：首个共鸣约第 13513 秒触发，选择 `稳定回路` 后仍在第 16221、19211、23500、27792 秒出现升级；8 小时状态为 22 台自动采集器、14 次调校、每秒 +11.62 星尘。
- v0.3 第一版的已知闭环状态已经覆盖：共鸣可领取目标、选择前约束、选择后节点状态、已选节点后续目标、`回访线圈` 回访目标、`调校刻印` 调校反馈、`稳定回路` 自动采集反馈、首个共鸣已领取进度。
- CHI 2018 idle game taxonomy 指出 idle games 会把玩家从 playing 推向 planning；这支持下一步聚焦计划和等待，而不是新增更多即时按钮。
- CHI PLAY 2019 idle game 设计访谈把 active withdrawal 视为玩法本身；这支持把离开和回来后的状态读回做成产品方向。
- Neko Atsume 研究把 idle engagement 解释为跨 session 的 habit 和 checking frequency；这支持下一步改善回访计划感，而不是强迫长在线。
- Decision: 本轮记录 `DECISION:2026-05-08-return-planning-readback-research`。下一步候选是 `Return Planning Readback / 回访计划读回`，优先复用现有阶段目标或事件反馈区，不新增资源、节点、面板、存档字段、指标字段或反馈渠道。
- BOOTSTRAP commit `7b30c9d` added a playable local MVP.
- FEEDBACK_INFRA commit `8cf6f39` added an in-game feedback path.
- GitHub Pages workflow run `25421769909` completed successfully.
- `gh issue list --state open` returned no open issues on 2026-05-06.
- Prior self-playtest clarified upgrade cost wording.
- The screen still relies on the upgrade button and progress bar to imply the first objective.
- After cycle 2, the first objective is stated directly.
- `docs/RESEARCH.md` recommends early progress feedback before new mechanics.
- The UI shows current auto collector count, but not progress toward an early milestone.
- `docs/METRICS.md` lists desired session and first-upgrade metrics, but only feedback-click telemetry exists.
- A 60-second simulation with one click per second reaches 2 auto collectors at 23 seconds and 3 auto collectors at 39 seconds.
- `docs/NORTH_STAR.md` says the player should feel progress continues when they step away.
- `hydrateGameState` applies elapsed passive production, but the UI does not report the offline gain.
- `docs/METRICS.md` lists `offline_reward_claimed` as desired.
- The UI now shows offline gain, but `stardust-workshop-metrics-v1` does not record it.
- 每秒点击一次的 60 秒模拟会在第 10、23、39 秒买到自动采集器。
- 第 10 秒后，UI 仍然显示“目标：攒够星尘，购买第一个自动采集器”。
- 2026-05-06 研究记录显示，下一步应继续强化已有的货币、generator、production rate、cost 循环，而不是新增资源系统。
- 购买自动采集器是前 60 秒内最重要的状态变化，但当前反馈主要依赖数字变化和按钮状态变化。
- `docs/METRICS.md` 将 `save_loaded` 列为 desired metric。
- `hydrateGameStateWithReport` 能区分有效存档、缺失存档和无效存档后，`save_loaded` 可以保持 local-only 且不记录个人数据。
- 当前反馈入口打开 GitHub Issues 新标签页，App 只能知道玩家点击了反馈链接，不能知道玩家是否最终提交 issue。
- 为了保持 local-only 和隐私边界，不能用外部追踪或猜测方式伪造 `feedback_sent`。
- 公开预览 URL 已发布，但当前没有真实同意流程、analytics governance 或外部 SDK 审核。
- `docs/METRICS.md` 旧表述把 local-only 绑定到“尚未公开部署”，已经与当前状态不一致。
- `docs/FEEDBACK.md` 只记录了 GitHub Issues 裸链接，未说明 App 实际预填 label/title/body。
- `docs/ISSUE_LEDGER.md` 的说明仍是英文模板，不符合当前文档语言约束。
- 2026-05-06 研究记录显示：self-playtest 只能抓明显问题，公开 playtest/外部玩家反馈更适合发现隐藏问题。
- 外部研究建议早期反馈问题应保持窄范围，避免一次性征求过宽反馈。
- 当前 GitHub Issue 反馈正文仍偏泛，不能直接引导玩家报告“前 60 秒哪里不清楚”。
- `docs/METRICS.md` 的 storage key 和 metric key 需要保留英文标识，但说明文字可以中文化。
- `docs/SELF_PLAYTEST.md` 记录的是关键运营输入，应优先保持中文可读。
- `docs/ROADMAP.md` 是高层导航文档，应保持中文可读，同时保留 M0-M5 结构。
- 购买自动采集器后会插入短暂确认反馈。
- 当前首屏没有为离线收益或购买确认预留稳定消息区域。
- 进度条实际表达的是攒够下一次购买成本的百分比。
- 同一块区域已经同时显示目标文案和自动采集器里程碑。
- 最新 workflow run 仍显示 Node.js 20 deprecation annotation。
- GitHub API 返回的最新 action release 包括 `actions/checkout@v6.0.2`、`actions/configure-pages@v6.0.0`、`actions/upload-pages-artifact@v5.0.0`、`actions/deploy-pages@v5.0.0`。
- GitHub Pages workflow run `25430225912` completed successfully on 2026-05-06.
- `https://jassy930.github.io/codex-game-operator-v7/` returned HTTP 200 on 2026-05-06.
- `gh issue list --state open` returned no open issues on 2026-05-06 after the Pages workflow upgrade.
- 发布基础设施收尾后的 self-playtest 显示：前 60 秒的现有提示都围绕星尘、采集、自动采集器、购买进度、目标和里程碑。
- 同一首屏已经包含资源、事件区域、双动作、进度、目标、里程碑、统计和反馈入口，继续添加提示会增加 UI 噪音。
- GitHub issue form 支持 YAML 表单、输入类型、校验、默认标题和默认 labels。
- GitHub `issues/new` URL 支持 `template` 参数，并可预填 issue form 自定义字段。
- 可用性测试资料建议避免引导性问题、yes/no 问题和泄露完成路径的任务 wording。
- `.github/ISSUE_TEMPLATE/feedback.yml` 已聚焦前 60 秒阻塞点、玩家意图和发生步骤。
- `createFeedbackIssueUrl()` 已指向 `issues/new?template=feedback.yml`。
- issue form 后续 self-playtest 显示：反馈入口仍是底部单一链接，未点击时不打断采集、购买、进度或里程碑。
- Playtest 研究建议先定义目标玩家，用少量代表性玩家发现问题，并把邀请放在站外上下文，而不是打断游戏内核心循环。
- 独立游戏预发布实验常受参与者获取、偏差和资源限制影响，早期更依赖 qualitative data。
- README 已包含站外 playtest 邀请素材，指向公开预览和单一 GitHub Issue Form。
- `docs/FEEDBACK_CLUSTERS.md` 仍保留英文模板，而 M3 反馈处理依赖该文档。
- `docs/SIGNAL_ROUTING.md` 和 `docs/RESPONSE_BUDGET.md` 仍以英文为主，而 M3 反馈处理依赖这两份文档。
- `docs/FEEDBACK.md` 仍有英文小节名和字段标签。
- 当前经济模拟显示：每秒点击一次时，第 10、23、39 秒购买前三台自动采集器，第 60 秒下一台购买进度约 98%。
- `docs/METRICS.md` 记录过当前不保留历史 session 汇总。
- `recordSessionEnd` 已在浏览器 `pagehide` 时调用，可以在同一 localStorage 边界内保存最近 session 汇总。
- Issue #1 反馈：“我不知道为何要采集？采集能为我带来什么？如何提高采集给我带来的兴奋点？”
- 当前 UI 已显示星尘、采集、自动采集器、购买进度、目标、里程碑和反馈入口。
- 当前 UI 没有直接说明星尘的用途链路：采集星尘 → 购买自动采集器 → 获得持续生产。
- 当前首屏复杂度接近预算，不应通过新资源、新奖励系统或新面板解决该问题。
- 2026-05-07 review finding: `ops/governor-check.sh` 只检查治理文件存在，不能验证 ledger、cluster、decision、release log 和 response budget 证据链。
- 2026-05-07 review finding: `ops/collect-feedback.sh` 只抓 issue 列表，缺少 body、comments 和 ledger draft，无法支撑可审计路由。
- 2026-05-07 review finding: `docs/ISSUE_LEDGER.md` 允许模糊 decision 和 commit/release 文本，后续 issue 回复可能绕过证据要求。
- 新增脚本测试先证明以上缺口存在：缺聚类、缺 release evidence 和缺正文评论证据时，旧脚本不会失败。
- 2026-05-07 follow-up: 真实运行 `ops/collect-feedback.sh` 后发现默认 `gh issue view --comments` 输出仍缺少 issue 原始正文，只包含评论渲染。
- 显式 `gh issue view --json ... --template ...` 后，`data/feedback/github-feedback.md` 同时包含 Issue #1 的原始正文和回复评论。
- 2026-05-07 self-playtest 显示 Issue #1 采集动机缺口已由动机文案和短暂采集反馈覆盖，本轮不应继续叠加提示。
- `docs/IDEA_PARKING_LOT.md` 记录了 “Soft Automation” 候选。
- `docs/COMPLEXITY_BUDGET.md` 允许最多 3 种 upgrade types，但仍要求 primary resource 维持 1、visible panels 最多 4。
- 研究资料支持在 idle game 早期逐步加入升级和自动化选择，而不是过早增加第二资源或 prestige。
- 2026-05-07 soft automation 60 秒模拟显示：自动采集器仍在第 10、23、39 秒购入，第 55 秒才购买第 1 个调校工具。
- 用户指出当前游戏生成机制似乎不会使用 `imagegen` 来生成需要的图片。
- 现有 `docs/HARNESS.md`、`docs/REVIEW_PROTOCOL.md` 和 `ops/governor-check.sh` 都没有资产工作流入口。
- 资产生成必须受 North Star、复杂度预算和 review protocol 约束，不能变成无边界装饰生产。
- `docs/ASSET_WORKFLOW.md` 已建立素材决策闸门，要求在需要图片时显式评估 `imagegen`。
- 当前没有新 issue 或玩家补充指向视觉素材缺口。
- 当前 `src/` 没有 `src/assets/`；新增首个 asset 会改变纯 UI 原型的复杂度边界。
- 最新 self-playtest 记录显示动作区已有三个按钮，后续应优先避免扩张首屏控件。
- `docs/ROADMAP.md` 仍只列 M0-M5 方向，没有显示当前状态、已完成阶段和下一道闸门。
- `docs/RETROSPECTIVE.md` 已记录 Soft Automation 与 Asset Workflow 收口，说明当前应回到等待反馈、self-playtest 或 research，而不是继续加系统。
- `docs/COMPLEXITY_BUDGET.md` 要求 first 60 seconds text 低于 300 中文字符，upgrade types 最多 3。
- 当前首屏初始状态约 101 个中文字符，购买第一台自动采集器后约 102 个；短暂反馈出现时最高约 118 个。
- 当前 primary resource 为 1，secondary resources 为 0，upgrade types 为 2，visible panels 未增加。
- `.action-row` 已有 `flex-wrap: wrap`，`@media (max-width: 560px)` 会将 action row 改为纵向排列。
- 按钮没有 `white-space: nowrap`，长文案可以自然换行。
- `src/metrics.ts` 已提供 `stardust-workshop-metrics-v1` 和 `stardust-workshop-metrics-history-v1`。
- `src/metrics.test.ts` 已覆盖 session start/end、click count、upgrade purchase、first upgrade time、save load、offline reward 和最近 10 条 session history。
- `docs/METRICS.md` 记录了 key 和指标含义，但没有记录浏览器控制台查看方式。
- Issue #2 反馈：“只能玩前60秒，然后就无聊了”，并表示“我想有更丰富的游戏内容”。
- 当前游戏已有单资源、自动采集器和调校工具，upgrade types 为 2，复杂度预算最多为 3。
- `docs/COMPLEXITY_BUDGET.md` 仍禁止第二资源和新增面板。
- `docs/SIGNAL_ROUTING.md` 要求 issue 必须先进入 ledger、cluster 和 decision，不能直接修改 roadmap 或实现功能。
- Issue #2 目标提示发布后，首屏可见中文字符计数为初始 107、已有自动采集器后 115、已有调校后 108，仍低于 300 中文字符预算。
- self-playtest 发现极小离线收益会被格式化为“离线获得 0 星尘”。
- 60-300 秒模拟显示升级事件出现在第 10、23、39、55、76、100、126、160、194、238、290 秒。
- 第 300 秒状态为 7 台自动采集器、调校等级 4、每秒 +1.96 星尘，距离下一次升级约 47 秒。
- `src/App.tsx` 只在 `offlineDust >= 0.1` 时展示离线收益并调用 `recordOfflineRewardClaimed`。
- `docs/METRICS.md` 尚未说明 `offline_reward_claimed` 的 `0.1` 星尘展示阈值。
- 2026-05-07 research 显示，idle/incremental 后续内容应逐步引入优化挑战和长期目标，但当前本地 300 秒模拟没有显示明显停滞。
- `docs/COMPLEXITY_BUDGET.md` 仍将 upgrade types 限制为最多 3，且禁止第二资源和新面板。
- Issue #1 的前 60 秒采集动机问题已发布修复并回复一次，后续无新补充。
- Issue #2 的 post-60s engagement 问题已发布目标提示最小切片并回复一次，后续无新补充。
- 多轮 self-playtest 记录显示 60-300 秒内升级事件持续出现：第 10、23、39、55、76、100、126、160、194、238、290 秒。
- 用户明确同意进入下一步；这应更新阶段焦点，而不是直接授权新系统。
- 用户强调不要卡在一个阶段太长时间。
- 用户明确要求“使用imggen图像优化一下现在的画面表现”。
- `docs/ASSET_WORKFLOW.md` 允许游戏背景、资源/建筑/升级插图、纹理、透明背景 cutout 等 raster asset，前提是改善当前体验且不增加噪音或额外面板。
- 生成资产派生为项目内 WebP 文件 `src/assets/stardust-workshop-bg.webp`，不是远程热链；原始 PNG 生成图保留在 `/Users/jassy/.codex/generated_images/...`。
- 2026-05-07 3-5 分钟模拟显示，第 180 秒已有调校等级 2，第 240 秒已有调校等级 3，第 300 秒已有调校等级 4。
- 现有目标提示会说“扩建或调校”，但主屏统计仍显示恒定的“点击收益 1”，没有展示调校倍率。
- 同一统计格可替换为调校倍率，不新增面板、按钮、资源、升级类型或指标字段。
- 用户指出现在玩法仍然干枯太少，随后确认“现在进入3-15分钟版本吧”。
- `docs/COMPLEXITY_BUDGET.md` 原本只有 First Public Version Budget，无法表达 v0.2 内容扩展边界。
- `docs/META_GOVERNANCE.md` 允许在强摩擦或重复失败模式出现时修改 governance docs，但必须证明不削弱 North Star、issue routing、response budget、complexity budget 和 review protocol。
- 用户继续确认“好的继续”，表示可以基于 v0.2 预算推进内容扩展。
- `docs/COMPLEXITY_BUDGET.md` v0.2 允许 `Stage milestone / workshop phase` 和 `Delayed unlock copy`。
- 当前可用状态变量已有 `autoCollectors` 和 `autoCollectorEfficiencyLevel`，足以推导工坊阶段，不需要新增资源、按钮、面板或存档字段。
- Roadmap 要求 v0.2 后续实现必须从内容弧线、真实反馈、self-playtest gap 或 local-only metrics 出发。
- 工坊阶段和物件插图落地后，目标提示已经会说“扩建或调校”，但进度条仍固定计算下一台自动采集器。
- 3-15 分钟阶段内调校工具可能比下一台自动采集器更近；固定自动采集器进度会削弱“扩建或调校”的可验证性。
- 工坊阶段已经显示阶段名、说明和下一阶段条件，但阶段变化只在静态阶段行里体现。
- 购买第 3 台自动采集器会从 `火花工作台` 进入 `星尘小间`；这正是 3-15 分钟内容弧线里的阶段完成时刻。
- 现有 purchase message 区域已经用于非打断式购买反馈，可以复用来显示阶段完成，不需要新增面板、资源、按钮、存档字段或指标字段。
- `docs/CONTENT_ARC.md` 已把 15-60 分钟和首次回访列为后续时间窗。
- `星尘引擎室` 的旧后续文案是“v0.2 阶段目标已达成：继续观察 15 分钟后的回访节奏”，这更适合文档，不适合玩家界面。
- 游戏已有离线收益提示，因此 `星尘引擎室` 后的最小玩家目标可以指向首次回访，而不需要新增系统。
- 2026-05-07 review finding: `.github/ISSUE_TEMPLATE/feedback.yml` 声明 `labels: [feedback]`，但 `gh label list` 没有 `feedback`，Issue #1/#2 的 labels 为空。
- 2026-05-07 review finding: `ops/create-pages-workflow.sh` 会生成 `.github/workflows/pages.yml`，使用旧 Pages actions，并包含 `bun test || true`。
- 2026-05-07 review finding: `docs/RETROSPECTIVE.md` 最后一次 retrospective 对应 `e269f5e`，之后到 `2f4a4c4` 已有 11 个 commit。
- 2026-05-07 review finding: `docs/GOVERNOR_STATE.md` 未记录 `2f4a4c4`、Pages run `25487424830`、公开预览 HTTP 200 和 clean worktree。
- `gh label create feedback` 已创建远端 label，Issue #1/#2 已回填 `feedback` label，`./ops/collect-feedback.sh` 刷新后 `Feedback Issues` 分区能列出两条 issue。
- 2026-05-07 3-15 分钟模拟显示升级事件持续出现：第 348、427、502、606、724、862、1050 秒仍有自动采集器或调校升级。
- 第 606 秒达到 10 台自动采集器和 5 次调校，进入 `星尘引擎室`，证明当前 3-15 分钟不是升级停滞问题。
- 阶段条件仍缺少当前进度：`火花工作台`、`星尘小间` 和 `稳定工坊` 只描述下一阶段门槛，没有把当前自动采集器数量或调校次数写进同一行。
- 2026-05-07 15-60 分钟模拟显示：第 15/30/60 分钟分别达到 11/13/15 台自动采集器，调校 6/8/9。
- `星尘引擎室` 达成后仍在第 724、862、1050、1232、1488、1771、2113、2569、3031 秒出现升级。
- 60 分钟状态离开 30 分钟后会获得约 10260 星尘离线收益，高于 `0.1` 展示阈值。
- 现有 `星尘引擎室` 长期目标已经指向“离开一会儿再回来，查看引擎室积累的离线星尘”。
- 当前没有新玩家补充、真实 localStorage session history 读数或 research-backed 决策支持新增第三或第四种升级。
- 2026-05-07 首次回访后模拟显示：60 分钟状态离线 30 分钟后，回访首屏约有 14072 星尘，足够立刻购买第 16 台自动采集器和第 10 次调校。
- 此时阶段目标仍显示“离开一会儿再回来”，与玩家已经完成的回访动作重复。
- 首次回访后连续购买第 16 台自动采集器和第 10 次调校后，剩余约 4734 星尘，每秒 +6.4 星尘。
- 同一状态下下一台自动采集器需要 6569 星尘，下一次调校需要 8927 星尘，当前没有可立即购买的升级。
- 离线收益提示仍可见时，旧回访目标仍会提示“花掉离线星尘”，但玩家已经无法继续消费到下一次升级。
- 2026-05-07 下一阶段内容研究显示：idle game 需要在简单核心循环后逐步引入 meta loop，但当前 active loop 不能退化成“回访、花钱、离开”。
- 类型资料显示 achievements / milestone systems 常用于提供结构和方向；prestige 通常适合进度变慢后的长期 reset loop。
- 当前 `docs/COMPLEXITY_BUDGET.md` v0.2 允许阶段里程碑和延后解锁文案，但仍禁止第二资源、prestige、任务系统和新增多面板管理界面。
- 现有状态变量 `autoCollectors`、`autoCollectorEfficiencyLevel`、`dustPerSecond` 和工坊阶段足以派生下一阶段目标，不需要先引入新存档字段。
- 用户明确反馈不希望只增加里程碑，而是希望更丰富的玩法。
- v0.2 预算已经不能承载真实第二资源和选择面板，需要版本化为 v0.3，而不是临时绕过复杂度预算。
- `docs/plans/2026-05-07-resonance-system-design.md` 设计了第二资源 `共鸣`、一个 `共鸣矩阵` 面板、v2 存档迁移和 local-only 共鸣指标。
- 2026-05-07 v0.3 self-playtest 显示：60 秒状态仍在 `星尘小间`，`共鸣矩阵` 不会干扰前 60 秒。
- 构造首次共鸣已消耗的存档后，旧 UI 中已选节点和未选节点都只是 disabled 按钮与普通描述，不能明确表达三选一已经完成。
- 构造首次共鸣已领取但未消费的存档后，旧 UI 只显示 `可用共鸣：1` 和三个节点按钮，没有说明 v0.3 本轮只能启动 1 个永久节点。
- 2026-05-07 共鸣门槛模拟显示：每秒点击一次并优先购买当前更便宜升级时，约第 13513 秒达到 20 台自动采集器和 12 次调校。
- 首个共鸣门槛达成时 UI 已显示 `领取共鸣 +1`，但阶段目标仍可能显示“长期目标：离开一会儿再回来，查看引擎室积累的离线星尘”。
- 首个共鸣节点启动后，`共鸣矩阵` 已能说明“已启动”和“本轮已选择其他节点”，但阶段目标仍回到普通回访目标，没有解释已选永久节点接下来如何影响玩家行动。
- 当玩家选择 `回访线圈` 并真正回访看到离线收益时，旧目标行优先显示通用“花掉离线星尘”，没有把本次离线收益与已启动节点的 +10% 价值连接起来。
- 当玩家选择 `调校刻印` 并继续购买调校工具时，有效倍率已经包含节点加成，但旧购买反馈仍显示普通“调校完成：自动采集效率”，没有把这次提升归因到已启动节点。
- 当玩家选择 `稳定回路` 并继续购买自动采集器时，每秒星尘已经包含节点加成，但旧购买反馈仍显示普通“自动采集器启动”，没有把这次产出提升归因到已启动节点。

## Current Decision

Decision Anchor: `DECISION:2026-05-08-v04-resonance-completion-readback`

复核 v0.4 第二共鸣全部消费后的矩阵状态：当玩家启动 2 个现有永久节点后，同一 `共鸣矩阵` 进度行会显示“当前版本共鸣目标已完成”，再保留 25/25 自动采集器和 15/15 调校进度。该切片只改提示层，不新增资源、面板、节点、升级类型、存档版本、指标字段、反馈渠道、第三共鸣门槛、prestige、任务系统或多生产线。

## Implementation Record

2026-05-08 V04_RESONANCE_COMPLETION_READBACK 已执行：

- 新增第二共鸣全部消费后的渲染测试，覆盖 `共鸣矩阵` 进度行的当前版本完成读回。
- 在现有 `共鸣矩阵` 进度行中，把 2/2 永久节点已启动后的文案从“第二共鸣已领取”切换为“当前版本共鸣目标已完成”。
- 保留 25/25 自动采集器、15/15 调校进度、2/2 选择上限、双节点组合读回和 20 小时巡航读回。
- 不新增第三共鸣门槛、新节点、新面板、存档字段、指标字段、prestige、任务系统或多生产线。

2026-05-08 V04_DUAL_NODE_COMBO_READBACK 已执行：

- 新增双节点组合读回渲染测试，覆盖 `稳定回路 + 调校刻印` 接近 20 小时时的目标行。
- 在现有 `回访计划 / 20 小时巡航` 文案中加入组合名：`采集回访组合`、`采集调校组合`、`回访调校组合`。
- 保留原有两个节点效果和下一次升级等待时间。
- 不新增第三共鸣门槛、新节点、新面板、存档字段、指标字段、prestige、任务系统或多生产线。

2026-05-08 V04_SECOND_NODE_CHOICE_GOAL 已执行：

- 新增第二共鸣已领取但未消费的渲染测试。
- 更新阶段目标优先级，让可用共鸣选择先于等待升级的回访计划。
- 保留第二节点已消费后的双节点回访计划读回。
- 不新增第三共鸣门槛、新节点、新面板、存档字段、指标字段、prestige、任务系统或多生产线。

2026-05-08 V04_DUAL_NODE_RETURN_PLAN 已执行：

- 新增第二次共鸣选择已消费后的渲染测试。
- 更新回访计划读回，让两个已启动共鸣节点一起出现在现有 `星尘引擎室` 阶段目标行。
- 保留单节点读回行为不变。
- 不新增第三共鸣门槛、新节点、新面板、存档字段、指标字段、prestige、任务系统或多生产线。

2026-05-06 BOOTSTRAP executed:

- Added Bun-managed React + TypeScript + Vite project files.
- Added tests runnable through both `bun test` and `bun run test`.
- Implemented one-resource star dust loop: click to earn, buy auto collector, passive production, versioned save/load.
- Added a minimal Chinese UI with visible first upgrade goal and local auto-save.

2026-05-07 v0.3 RESONANCE_SYSTEM executed:

- Added save version 2 with `resonance`, `earnedResonanceMilestones` and `unlockedResonanceNodes`, while migrating v1 saves with safe defaults.
- Added the first resonance milestone: 20 auto collectors and 12 tuning levels grant 1 `共鸣` once.
- Added one gated `共鸣矩阵` panel after `星尘引擎室`, with three permanent node choices and a v0.3 cap of one unlocked node.
- Implemented all three node effects: `稳定回路` increases passive production, `回访线圈` increases offline rewards, and `调校刻印` increases effective tuning multiplier.
- Added local-only resonance metrics for resonance earned count, node unlock count and first resonance time.
- Did not add prestige, task system, extra panels, external analytics or telemetry upload.

2026-05-07 RESONANCE_CHOICE_STATE_COPY executed:

- Added explicit post-choice copy in the existing `共鸣矩阵` node descriptions.
- The selected node now reads as already active; the other two nodes explain that the single v0.3 choice has already been used.
- Added a rendering test for a spent first-resonance save state.
- Did not change resonance math, node effects, save shape, metrics or panel count.

2026-05-07 RESONANCE_CHOICE_BEFORE_SPEND executed:

- Added a pre-choice hint in the existing `共鸣矩阵` panel when the player has unspent resonance and no unlocked node.
- The hint explains that v0.3 allows one permanent node choice this round before the player clicks a node.
- Added a rendering test for a claimed-but-unspent first-resonance save state.
- Did not change resonance math, node effects, save shape, metrics, panel count or resource count.

2026-05-07 RESONANCE_CLAIM_GOAL executed:

- Added a stage-goal override when the first resonance milestone is claimable in `星尘引擎室`.
- The stage goal now points to claiming the first resonance before choosing one permanent node.
- Added a rendering test for a ready-but-unclaimed first-resonance save state.
- Did not change resonance math, node effects, save shape, metrics, panel count or resource count.

2026-05-08 RESONANCE_NODE_FOLLOWUP_GOAL executed:

- Added selected-node follow-up goals in the existing `星尘引擎室` stage target line.
- `稳定回路` now points players toward expanding auto collectors, `回访线圈` toward return/offline value, and `调校刻印` toward more tuning.
- Added a rendering test for the selected `稳定回路` state after first resonance is spent.
- Did not change resonance math, node effects, save shape, metrics, panel count or resource count.

2026-05-08 RETURN_COIL_OFFLINE_GOAL executed:

- Added a `回访线圈`-specific offline return goal in the existing `星尘引擎室` stage target line.
- When visible offline rewards are present after selecting `回访线圈`, the goal now credits the node before pointing players back to spending the return gains.
- Added a rendering test for a return-coil save state with visible offline rewards.
- Did not change resonance math, node effects, save shape, metrics, panel count or resource count.

2026-05-08 TUNING_ENGRAVING_FEEDBACK executed:

- Added a `调校刻印`-specific tuning purchase message in the existing event feedback area.
- When the node is active, tuning purchases now show the effective tuning multiplier as resonance-powered feedback.
- Added a behavior test for the tuning-engraving purchase confirmation.
- Did not change resonance math, node effects, save shape, metrics, panel count or resource count.

2026-05-08 STABLE_CIRCUIT_FEEDBACK executed:

- Added a `稳定回路`-specific auto collector purchase message in the existing event feedback area.
- When the node is active, auto collector purchases now show resonance-powered passive production feedback.
- Added a behavior test for the stable-circuit purchase confirmation.
- Did not change resonance math, node effects, save shape, metrics, panel count or resource count.

2026-05-08 RETURN_PLAN_WAIT_TIME_READBACK executed:

- Added approximate wait-time copy to the existing `回访计划读回` stage target when the next upgrade is not affordable and current dust per second is available.
- Example state now reads “约 29 分钟后可购买调校工具” instead of only “攒到 28,922 星尘”.
- Added a rendering regression test for the wait-time readback.
- Did not change resonance math, node effects, save shape, metrics, panel count or resource count.

2026-05-08 CLAIMED_RESONANCE_PROGRESS executed:

- Added claimed-milestone copy to the existing `共鸣矩阵` progress line.
- After the first resonance milestone has been claimed, the progress line reads `首个共鸣已领取` before the 20/20 and 12/12 progress values.
- Added a rendering test for the claimed-and-spent first resonance state.
- Did not change resonance math, node effects, save shape, metrics, panel count or resource count.

2026-05-08 RETURN_PLANNING_READBACK_RESEARCH executed:

- Researched idle / incremental game planning, active withdrawal and checking-frequency engagement after the v0.3 resonance closed loop.
- Selected `Return Planning Readback / 回访计划读回` as the next low-complexity candidate direction.
- The next candidate must reuse existing stage target or event feedback space and existing state only.
- Did not implement gameplay code, save migration, metric fields, new resources, new panels, additional resonance nodes, prestige, task systems or multi-line production.

2026-05-08 LOCAL_METRICS_SNAPSHOT_READBACK executed:

- Added a local-only `createLocalMetricsSnapshot(storage)` helper that returns current metrics, recent session history, storage keys and feedback click count in one object.
- Exposed the same readback in the browser as `window.stardustWorkshopMetricsSnapshot()` for operator self-playtest evidence capture.
- Added a metrics test for the snapshot path.
- Did not add metric fields, upload paths, external analytics, personal data, UI panels, save migration or gameplay systems.

2026-05-08 V04_SECOND_RESONANCE_MILESTONE executed:

- Added v0.4 20-hour resonance budget for a second milestone inside the existing resonance system.
- Added the second resonance milestone at 25 auto collectors and 15 tuning levels.
- Increased the resonance matrix cap from 1 to 2 unlocked nodes, using the existing three-node choice space.
- Updated the matrix progress and choice copy so the first claimed milestone leads into the next resonance target, and the second claimed milestone enables the second permanent node.
- Did not add resources, panels, new nodes, save versions, metric fields, prestige, task systems or production lines.

2026-05-06 FEEDBACK_INFRA selected:

- Add one primary feedback path through GitHub Issues.
- Add local-only telemetry for feedback clicks.
- Keep feedback as signal intake, not task intake.

2026-05-06 FEEDBACK_INFRA executed:

- Added a GitHub Issues feedback link to the game UI.
- Added local-only `feedback_clicked` queue under `stardust-workshop-feedback-events-v1`.
- Updated feedback and metrics docs without replying to or fabricating any feedback.

2026-05-06 RELEASE_INFRA selected:

- Add a GitHub Pages workflow that installs with Bun, runs tests, builds, uploads `dist`, and deploys Pages.
- Configure Vite base path for the repository Pages URL.
- Document the preview URL and push trigger.

2026-05-06 RELEASE_INFRA executed locally:

- Added `.github/workflows/deploy-pages.yml`.
- Configured Vite to use `/codex-game-operator-v7/` when `GITHUB_ACTIONS` is set.
- Documented the expected Pages URL in README.
- After remote dependency install stalled on the local mirror lockfile, pinned Bun/package versions, added workflow timeouts, and regenerated `bun.lock` against the public npm registry.
- After Pages configuration reported the site was not enabled, configured `actions/configure-pages` with `enablement: true`.
- Enabled GitHub Pages through the repository Pages API with `build_type=workflow`.
- Rerun `25421667150` completed successfully; `https://jassy930.github.io/codex-game-operator-v7/` returned HTTP 200.

2026-05-06 SELF_PLAYTEST selected:

- Evaluate the first 10/30/60 seconds.
- Focus on whether the first upgrade cost and next action are clear.
- Implement only a small copy/UI clarity fix if the gap is concrete.

2026-05-06 SELF_PLAYTEST result:

- Gap: the first upgrade button shows `10` without explicitly saying it is a star dust cost.
- Decision: update the button copy to include the purchase intent and cost unit.

2026-05-06 SELF_PLAYTEST cycle 2 selected:

- Gap: the first objective is still inferred from UI pieces instead of being stated directly.
- Decision: add a short first-goal sentence that names the goal without adding a mechanic.

2026-05-06 SELF_PLAYTEST cycle 2 result:

- Added one first-goal line: “目标：攒够星尘，购买第一个自动采集器”.
- No mechanics, resources, panels, or feedback replies were added.

2026-05-06 RESEARCH selected:

- Question: after a playable idle MVP with clear first goal, should the next iteration improve early progress feedback or add another mechanic?
- Output required: update `docs/RESEARCH.md` and record one decision here.

2026-05-06 RESEARCH result:

- Decision: improve early progress feedback before adding mechanics.
- Rationale: sources emphasize simple first objectives, visible production/cost balance, steady progression, and frequent feedback as idle-game fundamentals.

2026-05-06 SELF_PLAYTEST cycle 3 selected:

- Implement a UI-only milestone progress line for 0/2, 1/2, and 2/2 auto collectors.
- No milestone reward is allowed in this cycle.

2026-05-06 SELF_PLAYTEST cycle 3 result:

- Added a UI-only “里程碑：0 / 2 台自动采集器” line.
- The milestone has no reward and does not add a new system.

2026-05-06 METRICS_INFRA selected:

- Add local-only metrics under browser storage.
- Record session start, click count, upgrade purchase count, and first upgrade time.
- Forbid uploads, personal data, external SDKs, and gameplay changes.

2026-05-06 METRICS_INFRA result:

- Added `stardust-workshop-metrics-v1` local storage metrics.
- Recorded session start, click count, upgrade purchase count, and first upgrade time.
- Added tests for metric recording and malformed storage recovery.

2026-05-06 METRICS_INFRA correction:

- Corrected session metrics to reset when a new app session starts.
- Added a regression test so click and first-upgrade counters do not persist across sessions.

2026-05-06 METRICS_INFRA session duration:

- Added local `sessionEndedAt` and `sessionDurationMs` fields.
- Record session end on browser `pagehide`.
- Kept metrics local-only with no upload path.

2026-05-06 SELF_PLAYTEST cycle 4:

- Simulation: with one click per second, auto collectors are purchased at 10s, 23s, and 39s.
- Gap: `0 / 2` milestone becomes stale before the 60-second mark.
- Decision: make auto-collector milestone targets dynamic: 2, then 5, then rolling 5-step targets.

2026-05-06 SELF_PLAYTEST cycle 5 selected:

- Gap: offline progress exists mechanically but is invisible on return.
- Decision: expose the offline star dust gain as a small return message.

2026-05-06 SELF_PLAYTEST cycle 5 result:

- Added `hydrateGameStateWithReport` to report offline star dust gain.
- Added a small UI message when offline progress adds star dust.
- No new resource or reward system was added.

2026-05-06 METRICS_INFRA selected:

- Gap: `offline_reward_claimed` is desired but not recorded.
- Decision: when offline gain is positive, record local count and last offline dust amount.

2026-05-06 METRICS_INFRA result:

- Added local-only `offlineRewardClaimedCount`.
- Added local-only `lastOfflineRewardDust`.
- Recorded the metric only when the offline gain return message is shown.

2026-05-06 SELF_PLAYTEST cycle 6 selected:

- Gap: 购买第一台自动采集器后，目标提示仍然要求购买第一台自动采集器。
- Decision: 首次购买后，把目标提示切换为购买下一台自动采集器。

2026-05-06 SELF_PLAYTEST cycle 6 result:

- 基于自动采集器数量增加动态目标提示。
- 为新玩家保留初始首目标文案。
- 为已有 1 台自动采集器的存档增加渲染回归测试。

2026-05-06 RESEARCH result:

- 研究问题：前 60 秒清晰度基本稳定后，下一步应优先增强哪类低复杂度反馈。
- 决策：优先考虑购买自动采集器后的短暂确认反馈。
- 约束：不新增资源、奖励系统、弹窗教程或经济数值变化。

2026-05-06 SELF_PLAYTEST cycle 7 selected:

- Gap: 购买自动采集器后，UI 主要依赖数字变化表达升级成功。
- Decision: 增加一条短暂确认文案，说明自动采集器已启动且每秒星尘提升。

2026-05-06 SELF_PLAYTEST cycle 7 result:

- 购买自动采集器成功后显示“自动采集器启动：每秒星尘 +X”。
- 确认反馈会自动清除，不使用弹窗，也不改变经济数值。
- 为购买确认文案增加回归测试。

2026-05-06 METRICS_INFRA selected:

- Gap: `save_loaded` 是 desired metric，但本地 metrics 尚未记录有效存档加载。
- Decision: 只在有效版本化存档成功加载时记录 local-only `saveLoadedCount`。

2026-05-06 METRICS_INFRA result:

- `hydrateGameStateWithReport` 现在返回 `saveLoaded`。
- 新增 local-only `saveLoadedCount`。
- App 打开有效本地存档时记录一次 `saveLoadedCount`。

2026-05-06 METRICS_INFRA feedback boundary:

- Gap: `feedback_sent` 曾列为 desired metric，但当前反馈流只能确认 `feedback_clicked`。
- Decision: 将 `feedback_sent` 记录为 deferred metric，不用外部追踪或猜测方式实现。
- 约束：继续保持 metrics local-only、无上传、无个人数据、无外部 SDK。

2026-05-06 METRICS_INFRA public preview policy:

- Gap: `docs/METRICS.md` 仍暗示 local-only 只适用于未公开部署阶段。
- Decision: 公开预览阶段继续保持 telemetry local-only。
- 约束：上传、外部 SDK、个人数据或跨设备追踪必须另走治理决策。

2026-05-06 SIMPLIFY feedback docs:

- Gap: 反馈入口文档没有说明 App 预填的 label/title/body，issue ledger 说明仍是英文模板。
- Decision: 更新反馈文档和 issue ledger 说明，保持反馈路由清晰。
- 约束：不改变 App 行为，不新增反馈渠道，不回复或伪造 issue。

2026-05-06 RESEARCH no-feedback next step:

- 研究问题：公开预览已存在但没有真实反馈时，下一步应继续添加玩法，还是先降低获取真实反馈的成本。
- 决策：不新增玩法系统；下一步候选是让现有 GitHub Issue 反馈问题更聚焦前 60 秒清晰度。
- 约束：保持单一反馈渠道，不新增 SDK、上传、用户识别或强制弹窗。

2026-05-06 FEEDBACK_INFRA focused issue body:

- Gap: 反馈 Issue 正文仍偏泛，未直接询问前 60 秒哪里不清楚。
- Decision: 将预填正文聚焦到前 60 秒清晰度，并保留“当时想做什么”和“其他补充”。
- 约束：不新增反馈渠道，不上传 telemetry，不记录 `feedback_sent`。

2026-05-06 SIMPLIFY metrics doc language:

- Gap: `docs/METRICS.md` 说明文字仍混用英文。
- Decision: 中文化说明文字，保留 storage key 和 metric key 原文。
- 约束：不改变代码、指标结构、storage key 或隐私边界。

2026-05-06 SIMPLIFY self-playtest doc language:

- Gap: `docs/SELF_PLAYTEST.md` 说明文字仍混用英文。
- Decision: 中文化说明文字，保留已记录事实和 gap 的语义。
- 约束：不改写历史结论，不伪造真实玩家反馈，不改变代码。

2026-05-06 SIMPLIFY roadmap doc language:

- Gap: `docs/ROADMAP.md` 说明和条目仍以英文为主。
- Decision: 中文化说明文字，保留 M0-M5 里程碑结构。
- 约束：不新增里程碑，不把 roadmap 改成任务清单，不改变代码。

2026-05-06 SELF_PLAYTEST event slot:

- Gap: 购买确认反馈以条件渲染插入，会推动下方控件。
- Decision: 为离线收益和购买确认提供稳定的 `event-stack` 区域。
- 约束：UI-only，不新增面板、奖励、资源或反馈渠道。

2026-05-06 SELF_PLAYTEST purchase progress label:

- Gap: “下个目标”无法区分购买进度、目标文案和里程碑。
- Decision: 将进度条标签改为“购买进度”。
- 约束：只改文案，不改变数值、布局、经济或玩法。

2026-05-06 RELEASE_INFRA action upgrade:

- Gap: Pages workflow 仍出现 Node.js 20 deprecation annotation。
- Decision: 升级 checkout/configure-pages/upload-pages-artifact/deploy-pages 到 GitHub API 返回的当前 release。
- 约束：不降低测试、构建或部署门槛，不改变游戏代码。

2026-05-06 RELEASE_INFRA action upgrade result:

- Pages workflow run `25430225912` 成功。
- 公开预览返回 HTTP 200。
- 当前无开放 GitHub Issues。
- 下一步切换到 SELF_PLAYTEST，而不是继续改发布基础设施。

2026-05-06 SELF_PLAYTEST no-change result:

- 前 60 秒核心循环提示已覆盖当前阶段的主要问题。
- 继续添加首屏提示会增加复杂度，不一定提升真实玩家理解。
- 决策：本轮不改代码；后续优先寻找真实反馈或研究反馈转化/信息收敛问题。

2026-05-06 RESEARCH issue form signal quality:

- 研究问题：如何提高现有 GitHub Issue 反馈路径的信号质量，而不是新增渠道或追踪。
- 决策：下一步候选是单一 GitHub Issue Form，字段聚焦前 60 秒阻塞点和玩家意图。
- 约束：保留 local-only telemetry 边界；不记录 `feedback_sent`，不要求个人联系方式，不新增 SDK。

2026-05-06 FEEDBACK_INFRA issue form implementation:

- 新增 `.github/ISSUE_TEMPLATE/feedback.yml`。
- 游戏内反馈 URL 指向 `issues/new?template=feedback.yml`。
- 保留单一 GitHub Issues 渠道和 local-only `feedback_clicked`。
- 不新增个人信息字段、上传路径、analytics SDK 或 `feedback_sent`。

2026-05-06 SELF_PLAYTEST issue form no-change result:

- 反馈入口仍在底部，未新增首屏说明文字。
- GitHub Issue Form 只在玩家主动点击后出现。
- 决策：不继续修改游戏代码；等待真实反馈或新的研究问题。

2026-05-06 RESEARCH external playtest invitation:

- 研究问题：如何在不打扰首屏、不新增追踪或渠道的前提下邀请外部 playtest。
- 决策：下一步候选是站外 playtest 邀请素材，不是游戏内提示或新反馈渠道。
- 约束：反馈仍回到单一 GitHub Issue Form；不收集个人数据，不要求联系方式，不做量化结论。

2026-05-06 FEEDBACK_INFRA external playtest invitation:

- README 新增可复用的站外 playtest 邀请素材。
- 邀请只指向公开预览和单一 GitHub Issue Form。
- 文档明确：邀请素材不是玩家反馈，真实反馈仍需进入 issue ledger。

2026-05-06 SIMPLIFY feedback clusters doc:

- Gap: `docs/FEEDBACK_CLUSTERS.md` 仍保留英文说明和模板。
- Decision: 中文化反馈聚类说明和模板，保留字段语义。
- 约束：不新增真实反馈、聚类、渠道或产品任务。

2026-05-06 SIMPLIFY signal routing and response budget:

- Gap: `docs/SIGNAL_ROUTING.md` 和 `docs/RESPONSE_BUDGET.md` 仍以英文为主。
- Decision: 中文化两份反馈处理规则文档，保留路由和回复预算语义。
- 约束：不改变 issue routing、response budget、North Star 或反馈渠道。

2026-05-06 SIMPLIFY feedback doc language:

- Gap: `docs/FEEDBACK.md` 仍有英文小节名和字段标签。
- Decision: 中文化反馈入口文档剩余 UI 文档语言，保留反馈路径和隐私边界。
- 约束：不新增反馈渠道，不改变 metrics，不伪造真实反馈。

2026-05-06 SELF_PLAYTEST economy no-change result:

- 每秒点击一次并自动购买时，自动采集器在第 10、23、39 秒购入。
- 第 60 秒下一台购买进度约 98%，符合“再买一台已接近”的 North Star 感受。
- 决策：不调整经济数值，不新增系统，继续等待真实反馈或新的研究问题。

2026-05-06 METRICS_INFRA session history:

- Gap: 本地 metrics 不保留历史 session 汇总。
- Decision: 在 `stardust-workshop-metrics-history-v1` 中保留最近 10 个 session 汇总。
- 约束：local-only、无上传、无个人数据、无外部 SDK、无 UI 改动。

2026-05-07 OPERATE collect motivation:

- Decision Anchor: `DECISION:2026-05-07-operate-collect-motivation`
- Issue #1 已路由到 `first-60s-motivation` 聚类。
- Gap: 首屏说明了“怎么采集”和“怎么买”，但没有直接说明“为什么采集值得做”。
- Decision: 增加一条短文案说明星尘会转化为自动采集器和持续生产，并增强采集点击的短暂反馈。
- 约束：不新增资源、奖励系统、新面板、经济数值变化、上传 telemetry 或第二反馈渠道。

2026-05-07 META_IMPROVE feedback-loop automation:

- Decision Anchor: `DECISION:2026-05-07-meta-feedback-loop-automation`
- Gap: feedback loop 的关键闸门主要停留在文档层，脚本不能自动识别缺失聚类、缺失 decision 锚点、缺失 release evidence 或缺少 issue 正文证据。
- Decision: 为 ops 脚本添加回归测试，并收紧 `governor-check`、`collect-feedback` 和 ledger evidence format。
- 约束：只加强反馈闭环检查，不改变游戏玩法、不新增反馈渠道、不回复 issue、不削弱 response budget。

2026-05-07 META_IMPROVE collector JSON correction:

- Gap: `collect-feedback` 使用 `gh issue view --comments` 默认输出时，真实快照没有 issue 原始正文。
- Decision: 改用显式 `--json` 和 `--template` 输出 issue number/title/url/state/author/body/comments。
- 约束：不新增反馈渠道、不上传 telemetry、不改变 issue 回复策略。

2026-05-07 SELF_PLAYTEST collect motivation no-change:

- Gap check: Issue #1 指向的采集动机缺口已由动机文案和短暂采集反馈覆盖。
- Decision: 本轮不继续修改 UI、经济或玩法，避免重复处理同一 issue 和增加首屏噪音。
- 约束：等待新玩家信息或新的研究问题；不新增资源、奖励系统、面板或反馈渠道。

2026-05-07 RESEARCH soft automation:

- Decision Anchor: `DECISION:2026-05-07-research-soft-automation`
- Gap: 当前已有 “购买更多自动采集器” 一条升级路径，下一步需要一个低复杂度选择，不应引入第二资源或 prestige。
- Decision: 设计一个 `调校工具` 升级候选，使用星尘提升自动采集器效率，让玩家在数量和效率之间选择。
- 约束：本轮只做研究/设计；不实现代码、不新增面板、不新增资源、不改变 feedback flow。

2026-05-07 SELF_PLAYTEST soft automation implementation:

- Decision Anchor: `DECISION:2026-05-07-research-soft-automation`
- Implementation: 增加一个 `调校工具` upgrade type，使用星尘提升自动采集器效率。
- Complexity check: primary resource 仍为 1；upgrade types 从 1 增至 2；visible panels 不增加；feedback channels 不变。
- Economy check: 每秒点击一次并优先购买自动采集器时，调校工具在第 55 秒才出现，不破坏第一台自动采集器目标。
- 约束：不新增第二资源、prestige、多 generator 分类、任务系统、成就或新面板。

2026-05-07 SELF_PLAYTEST soft automation prerequisite copy:

- Gap: 0 台自动采集器时调校工具禁用，但显示成本会暗示攒够 25 星尘即可购买。
- Decision: 无自动采集器时显示“需要先购买自动采集器”，有自动采集器后显示效率提升和星尘成本。
- 约束：只改文案；不改变经济数值、资源、面板或反馈渠道。

2026-05-07 SELF_PLAYTEST post-soft-automation no-change:

- Gap check: 发布后复核显示，调校工具没有改变第 10、23、39 秒购买自动采集器的节奏，第 55 秒才成为第一项效率升级。
- Decision: 本轮不新增第三种升级、不调整调校工具成本、不增加首屏解释，等待真实玩家反馈或后续本地指标。
- 风险记录：购买调校工具后下一台自动采集器距离会回落；这是升级购买后的正常节奏变化，当前没有证据表明需要干预。
- 约束：不新增资源、面板、反馈渠道、analytics、prestige、任务系统或复杂 lore。

2026-05-07 META_IMPROVE asset workflow:

- Decision Anchor: `DECISION:2026-05-07-asset-workflow`
- Gap: harness 缺少资产工作流，未来需要图片时不会显式提示 `imagegen` 评估。
- Decision: 新增 `docs/ASSET_WORKFLOW.md`，并挂入 `docs/HARNESS.md`、`docs/REVIEW_PROTOCOL.md` 和 `ops/governor-check.sh`。
- 约束：本轮不生成图片、不改游戏、不新增视觉复杂度；只要求未来素材需求记录 `imagegen` 使用或不使用理由。

2026-05-07 RESEARCH asset no-change:

- Decision Anchor: `DECISION:2026-05-07-research-asset-no-change`
- Gap check: 当前没有真实反馈、self-playtest gap 或 roadmap requirement 要求图片素材。
- Decision: 本轮不生成图片、不新增 `src/assets/`、不改 UI；未来若出现视觉素材需求，按 `docs/ASSET_WORKFLOW.md` 先记录用途、尺寸、风格和 `imagegen` 决策。
- 约束：不新增装饰图、背景、复杂世界观、sprite set、远程图片或不明授权素材。

2026-05-07 RESEARCH roadmap position:

- Decision Anchor: `DECISION:2026-05-07-research-roadmap-position`
- Gap: roadmap 没有当前状态，容易让已完成阶段继续被当作待办。
- Decision: 在 `docs/ROADMAP.md` 增加当前状态和下一道闸门；M0-M3 已基本完成，M4/M5 持续进行。
- 约束：只更新路线图，不新增功能 backlog，不改变玩法、UI、经济、反馈渠道或部署流程。

2026-05-07 SELF_PLAYTEST text budget no-change:

- Decision Anchor: `DECISION:2026-05-07-self-playtest-text-budget`
- Gap check: Soft Automation 后首屏初始状态约 101 个中文字符，短暂反馈出现时最高约 118 个，低于 300 中文字符预算。
- Decision: 不进入 `SIMPLIFY`，不改 UI 文案，不新增解释；后续只在真实反馈或窄屏检查发现问题时收敛按钮文案。
- 约束：不新增第三种升级、第二资源、新面板、图片资产、反馈渠道或 telemetry。

2026-05-07 SELF_PLAYTEST action layout no-change:

- Decision Anchor: `DECISION:2026-05-07-self-playtest-action-layout`
- Gap check: `.action-row` 已支持换行，560px 以下纵向排列；按钮长文案未被 CSS 强制单行。
- Decision: 不改 CSS、不改按钮文案、不进入 `SIMPLIFY`；等待真实视觉证据或玩家反馈。
- 约束：不新增提示、按钮、面板、图片资产、反馈渠道或 telemetry。

2026-05-07 METRICS_INFRA local readback:

- Decision Anchor: `DECISION:2026-05-07-metrics-local-readback`
- Gap: metrics 已实现但缺少 operator 本地查看方式。
- Decision: 在 `docs/METRICS.md` 增加 localStorage 读取示例和解释边界。
- 约束：不新增上传、外部 SDK、个人数据、指标字段、UI 或玩法。

2026-05-07 OPERATE post-60s engagement:

- Decision Anchor: `DECISION:2026-05-07-operate-post-60s-engagement`
- Issue #2 已路由到 `post-60s-engagement` 聚类。
- Gap: 真实玩家觉得前 60 秒后变无聊，希望内容更丰富。
- Economy check: 当前模拟显示，第 55 秒购买第 1 个调校工具后，第 76 秒可购买第 4 台自动采集器，第 100 秒可购买第 2 次调校，第 126 秒和第 160 秒继续购买自动采集器。
- Decision: 先实现目标提示的最小 UI 文案切片，让 60 秒后已有的“扩建或调校”选择更明确；不把“更丰富内容”直接解释为第二资源、prestige、任务系统、多面板或复杂 lore。
- 约束：不改经济、不新增资源、不新增按钮、不新增面板、不新增 telemetry；如果发布后回复 Issue #2，必须引用 release evidence。

2026-05-07 SELF_PLAYTEST post-issue-2 text budget:

- Decision Anchor: `DECISION:2026-05-07-self-playtest-post-issue-2-budget`
- Gap check: Issue #2 目标提示发布后，首屏可见中文字符仍低于 300，动作区 CSS 仍支持换行和 560px 以下纵向排列。
- Bug: 极小离线收益会被格式化为“离线获得 0 星尘”。
- Decision: 不新增玩法、不进入 `SIMPLIFY`；只修复离线收益展示阈值，让低于 `0.1` 的离线收益不展示也不记录为已展示。
- 约束：不改变经济公式、不改变离线收益计算、不新增指标字段、不新增 UI 面板或反馈渠道。

2026-05-07 SELF_PLAYTEST 300s economy no-change:

- Decision Anchor: `DECISION:2026-05-07-self-playtest-300s-economy-no-change`
- Gap check: 60-300 秒模拟显示，升级事件持续出现，300 秒时最近升级只过去 10 秒，距离下一次升级约 47 秒。
- Decision: 本轮不新增玩法、不调经济、不进入 `SIMPLIFY`；继续等待真实玩家补充或新的可解释 gap。
- 约束：不新增第三种升级、第二资源、新面板、任务系统、prestige、图片资产、反馈渠道或 telemetry 上传。

2026-05-07 METRICS_INFRA offline threshold doc:

- Decision Anchor: `DECISION:2026-05-07-metrics-offline-threshold-doc`
- Gap: `offline_reward_claimed` 的实现已经使用 `0.1` 星尘展示阈值，但 metrics 文档没有说明该阈值。
- Decision: 更新 `docs/METRICS.md`，说明低于 `0.1` 星尘的离线收益不会展示，也不会记录为已展示。
- 约束：不改代码、不新增指标字段、不新增上传路径、不改变 localStorage key、不回复 issue。

2026-05-07 RESEARCH post-300s content:

- Decision Anchor: `DECISION:2026-05-07-research-post-300s-content`
- Question: 60-300 秒仍有稳定升级事件后，是否应该开始设计下一项玩法内容。
- Decision: 当前不实现第三种升级或新系统；只保留 future candidate：若后续出现明确 post-300s 停滞或新反馈，优先研究复用现有主屏的 milestone unlock preview。
- 约束：不新增资源、面板、prestige、任务系统、成就系统、图片资产、反馈渠道或 telemetry 上传。

2026-05-07 SELF_PLAYTEST stage shift:

- Decision Anchor: `DECISION:2026-05-07-stage-shift-3-5-minute`
- Trigger: 用户确认进入下一步。
- Decision: 当前阶段焦点切换为 3-5 分钟参与度；前 60 秒清晰度降级为回归护栏。
- Stage cadence: 同一阶段连续两轮 no-change 后，必须扩大时间窗、定义内容弧线或明确等待真实反馈。
- 约束：阶段切换不是新增系统授权；任何玩法实现仍需新的 `DECISION.md` 锚点、复杂度预算复核、测试和发布证据。

2026-05-07 SELF_PLAYTEST imagegen background:

- Decision Anchor: `DECISION:2026-05-07-asset-background-imagegen`
- User request: 使用 imagegen 优化当前画面表现。
- Asset: `src/assets/stardust-workshop-bg.webp`
- Decision: 使用 imagegen 生成一张无文字、无人物、低噪音的星尘工坊背景，压缩为 WebP 后通过 CSS 作为全屏背景接入；主游戏面板仍保持现有结构和白色可读背景。
- 约束：不新增玩法、资源、面板、按钮、复杂 lore、远程热链、analytics 或反馈渠道。

2026-05-07 SELF_PLAYTEST tuning visibility:

- Decision Anchor: `DECISION:2026-05-07-self-playtest-tuning-visibility`
- Gap check: 3-5 分钟模拟显示调校工具已经多次购买，但主屏统计仍显示恒定的“点击收益 1”，无法支撑“扩建或调校”的目标提示。
- Decision: 将同一统计格替换为“调校倍率”，显示当前 `autoCollectorEfficiencyMultiplier`。
- 约束：不新增升级类型、资源、面板、按钮、经济公式、指标字段、反馈渠道或 issue 回复。

2026-05-07 META_IMPROVE v0.2 complexity budget:

- Decision Anchor: `DECISION:2026-05-07-meta-v0-2-complexity-budget`
- Failure mode: First Public Version Budget 只适合 v0.1，无法约束用户确认的 3-15 分钟版本内容扩展。
- Decision: 保留 v0.1 预算，新增 v0.2 / 3-15 Minute Version Budget；v0.2 允许内容弧线、阶段里程碑/工坊阶段、延后解锁文案和第 4 种升级类型。
- 约束：进入 v0.2 不自动授权具体玩法；仍禁止第二资源、prestige、任务系统、复杂地图、多面板扩张、外部 analytics 或 issue 重复回复。

2026-05-07 OPERATE workshop stage:

- Decision Anchor: `DECISION:2026-05-07-operate-workshop-stage`
- Signal: 用户反馈当前玩法仍然干枯太少，并确认继续推进 v0.2。
- Decision: 用 `autoCollectors` 和 `autoCollectorEfficiencyLevel` 推导工坊阶段，展示阶段名、阶段说明和下一阶段条件。
- v0.2 budget use: 使用 `Stage milestone / workshop phase` 和 `Delayed unlock copy`，不使用第 4 种升级类型。
- v0.1 guardrail: 前 60 秒仍只有星尘、采集、自动采集器、调校工具和现有主屏；不新增第二资源、按钮、面板或反馈渠道。

2026-05-07 SELF_PLAYTEST item art imagegen:

- Decision Anchor: `DECISION:2026-05-07-asset-item-art-imagegen`
- User request: 用户选择方案 3，使用资源/升级插图优化当前画面表现。
- Asset: `src/assets/stardust-crystal.webp`、`src/assets/auto-collector.webp`、`src/assets/tuning-tool.webp`
- Decision: 使用 imagegen 生成 3 张一致风格的小型物件插图，分别锚定星尘、自动采集器和调校工具，并接入现有资源读数和升级按钮。
- v0.2 budget use: 只增强现有核心链路的可读性，不使用第 4 种升级类型，不增加 visible panel。
- 约束：不新增玩法、资源、按钮、面板、复杂 lore、远程热链、analytics、指标字段或反馈渠道。

2026-05-07 OPERATE next upgrade progress:

- Decision Anchor: `DECISION:2026-05-07-operate-next-upgrade-progress`
- Content arc: 新增 `docs/CONTENT_ARC.md`，定义 0-60 分钟、3-15 分钟、15-60 分钟和首次回访的低复杂度内容弧线。
- Decision: 将固定自动采集器进度改为“下一升级进度”，自动指向自动采集器和调校工具中当前成本更近的一项。
- v0.2 budget use: 使用 `Delayed unlock copy` 和现有 3-15 分钟内容弧线表达，不使用新的 upgrade type。
- v0.1 guardrail: 前 60 秒仍先指向第一台自动采集器；不新增第二资源、按钮、面板、存档字段、指标字段或反馈渠道。

2026-05-07 OPERATE stage completion feedback:

- Decision Anchor: `DECISION:2026-05-07-operate-stage-completion-feedback`
- Gap: 工坊阶段已经可见，但阶段跨越只静态显示在阶段行里，购买瞬间缺少阶段完成反馈。
- Decision: 购买自动采集器或调校工具后，如果购买前后的工坊阶段名不同，事件区显示“工坊升级：阶段名 · 阶段说明”；未跨阶段时保留原有购买反馈。
- v0.2 budget use: 使用 `Stage milestone / workshop phase`，不使用第 4 种升级类型。
- v0.1 guardrail: 前 60 秒仍只围绕星尘、采集、自动采集器、调校工具和现有事件反馈区；不新增资源、按钮、面板、存档字段、指标字段或反馈渠道。

2026-05-07 OPERATE stage unlock preview:

- Decision Anchor: `DECISION:2026-05-07-operate-stage-unlock-preview`
- Gap: 工坊阶段和阶段完成反馈已经可见，但“下一阶段”只说明达成条件，缺少下一层内容名称，3-15 分钟目标感仍偏机械。
- Decision: 将现有 `nextRequirement` 文案扩展为条件 + 下一阶段名称，例如“拥有 3 台自动采集器，开启星尘小间”。
- v0.2 budget use: 使用 `Delayed unlock copy`，复用现有阶段行，不使用第 4 种升级类型。
- v0.1 guardrail: 不新增资源、按钮、面板、存档字段、指标字段、反馈渠道或 issue 回复；前 60 秒只是多一个短阶段名预告。

2026-05-07 SELF_PLAYTEST engine room return goal:

- Decision Anchor: `DECISION:2026-05-07-self-playtest-engine-room-return-goal`
- Gap: `星尘引擎室` 达成后的旧文案是 operator 观察备注，不能作为玩家的 15-60 分钟 / 首次回访目标。
- Decision: 将最终阶段后续目标改为“长期目标：离开一会儿再回来，查看引擎室积累的离线星尘”。
- v0.2 budget use: 使用 `Delayed unlock copy` 和首次回访内容弧线，复用现有阶段行，不使用第 4 种升级类型。
- v0.1 guardrail: 前 60 秒目标、购买进度、阶段预告和事件反馈保持不变；不新增资源、按钮、面板、存档字段、指标字段、反馈渠道或 issue 回复。

## Input Source

User request: 玩法仍然干枯太少，需要丰富游戏内容；用户确认使用资源/升级插图优化画面表现；自动化继续要求作为独立开发人员持续丰富优化游戏内容。

## Linked Signals

- Issue #1 已修复并无新补充。
- Issue #2 已修复并无新补充。
- `docs/SELF_PLAYTEST.md` 的 60-300 秒模拟未显示明确停滞。
- 用户确认进入下一步。

## Not Doing

- No complex mechanics
- No prestige
- No multiple resources
- No heavy lore
- No issue-driven work yet
- No new gameplay mechanics during feedback infrastructure work
- No gameplay changes during release infrastructure work
- No new systems during self-playtest work
- No direct implementation during research work
- No new mechanic before early progress feedback is stronger

## Review Notes

BOOTSTRAP, FEEDBACK_INFRA, RELEASE_INFRA, SELF_PLAYTEST, and RESEARCH stayed inside `docs/COMPLEXITY_BUDGET.md` and did not use issue-driven input. The research decision keeps the next implementation focused on feedback and milestones instead of scope expansion.

## Maintenance Decision

Keep the v7.2 clean-room harness self-consistent before the first game bootstrap:

- Use `bun` for JS/TS automation.
- Keep runtime snapshot output out of Git history.
- Keep README setup instructions aligned with the GitHub repository.

2026-05-06 META_IMPROVE maintenance decision:

- Accept the anti-achievement clause in `prompts/goal.md` as a tightening clarification.
- Record it in `docs/HARNESS_CHANGELOG.md`.
- Do not weaken issue routing, response budget, complexity budget, review protocol, or North Star constraints.

2026-05-06 META_IMPROVE maintenance decision:

- Add a constrained `METRICS_INFRA` mode because metrics gap is a prompt input source but lacked an operating mode.
- Permit only local-only metrics that support first-60-second evaluation.
- Forbid uploads, personal data, external analytics SDKs, new mechanics, and issue replies in that mode.
