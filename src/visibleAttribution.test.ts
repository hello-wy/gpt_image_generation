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
