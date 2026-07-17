# Remove Visible Attribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 删除界面中可见的项目署名、项目链接、赞助作者入口和项目反馈入口，同时保留版本更新功能。

**Architecture:** 直接删除三个 React 组件中的目标 JSX，并从设置页签联合类型中移除 `about`。新增一个读取源码的 Vitest 回归测试，逐文件约束删除范围和版本更新例外，不引入运行时兼容逻辑。

**Tech Stack:** React 19、TypeScript、Vitest、Vite、pnpm

---

### Task 1: 添加删除范围回归测试

**Files:**
- Create: `src/visibleAttribution.test.ts`

- [ ] **Step 1: 写失败测试**

使用 Vite `?raw` 导入读取源码，避免 Node `fs` 类型进入生产构建：

```ts
import { describe, expect, it } from 'vitest'
import settingsModalSource from './components/SettingsModal.tsx?raw'
import helpModalSource from './components/HelpModal.tsx?raw'
import supportPromptModalSource from './components/SupportPromptModal.tsx?raw'
import headerSource from './components/Header.tsx?raw'
import versionCheckSource from './hooks/useVersionCheck.ts?raw'
import storeSource from './store.ts?raw'

describe('可见项目署名', () => {
  it('从设置中删除关于页', () => {
    expect(settingsModalSource).not.toContain("setActiveTab('about')")
    expect(settingsModalSource).not.toContain("activeTab === 'about'")
    expect(settingsModalSource).not.toContain('GPT Image Playground')
    expect(settingsModalSource).not.toContain('github.com/CookSleep/gpt_image_playground')
    expect(settingsModalSource).not.toContain('ifdian.net/a/cooksleep')
    expect(settingsModalSource).not.toContain('@CookSleep')
    expect(settingsModalSource).not.toContain('反馈问题')
    expect(settingsModalSource).not.toContain('赞助作者')
    expect(storeSource).not.toContain("| 'about'")
  })

  it('从帮助页删除项目署名', () => {
    expect(helpModalSource).not.toContain('github.com/CookSleep/gpt_image_playground')
    expect(helpModalSource).not.toContain('@CookSleep')
  })

  it('从里程碑提示中删除赞助与项目反馈入口', () => {
    expect(supportPromptModalSource).not.toContain('欢迎赞助作者')
    expect(supportPromptModalSource).not.toContain('赞助作者')
    expect(supportPromptModalSource).not.toContain('ifdian.net/a/cooksleep')
    expect(supportPromptModalSource).not.toContain('github.com/CookSleep/gpt_image_playground/issues')
    expect(supportPromptModalSource).not.toContain('反馈问题')
    expect(supportPromptModalSource).toContain('你已经成功生成了超过')
    expect(supportPromptModalSource).toContain('onClick={dismissSupportPrompt}')
  })

  it('保留版本检查及更新链接', () => {
    expect(versionCheckSource).toContain("const REPO = 'CookSleep/gpt_image_playground'")
    expect(headerSource).toContain('href={latestRelease.url}')
  })
})
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm test -- src/visibleAttribution.test.ts`

Expected: FAIL，因为当前三个组件仍包含目标内容且 `SettingsTab` 仍包含 `about`。

### Task 2: 删除可见署名与入口

**Files:**
- Modify: `src/components/SettingsModal.tsx`
- Modify: `src/components/HelpModal.tsx`
- Modify: `src/components/SupportPromptModal.tsx`
- Modify: `src/store.ts`

- [ ] **Step 1: 最小实现**

执行以下最小删除：

- `SettingsModal.tsx`：从图标 import 移除 `GithubIcon`；完整删除调用 `setActiveTab('about')` 的按钮；完整删除 `activeTab === 'about'` 的内容分支。
- `HelpModal.tsx`：完整删除底部包含 GitHub `<a>` 的 `pt-4 border-t` 容器，保留前面的帮助正文和外层弹窗容器。
- `SupportPromptModal.tsx`：保留标题和“你已经成功生成了超过 50 张图片！”；删除后续邀请赞助/反馈的两行文案；完整删除包含两个 `<a>` 的按钮容器。
- `store.ts`：将 `SettingsTab` 改为 `'general' | 'agent' | 'api' | 'data'`。

- [ ] **Step 2: 运行定向测试并确认通过**

Run: `pnpm test -- src/visibleAttribution.test.ts`

Expected: PASS。

- [ ] **Step 3: 提交测试与实现的绿色增量**

Run: `git add src/visibleAttribution.test.ts src/components/SettingsModal.tsx src/components/HelpModal.tsx src/components/SupportPromptModal.tsx src/store.ts && git commit -m 'refactor: remove visible project attribution'`

### Task 3: 完整验证

**Files:**
- Verify only

- [ ] **Step 1: 运行完整测试**

Run: `pnpm test`

Expected: 所有测试通过。

- [ ] **Step 2: 运行生产构建**

Run: `pnpm run build`

Expected: 构建成功，无 TypeScript 错误。

- [ ] **Step 3: 检查最终差异**

Run: `git status --short && git log -3 --oneline`

Expected: 工作区干净，提交仅包含规格、计划、测试和目标实现。计划文件在执行前单独提交。
