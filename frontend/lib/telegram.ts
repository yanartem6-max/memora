// Telegram WebApp SDK utilities
interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  onEvent: (event: string, callback: () => void) => void
  offEvent: (event: string, callback: () => void) => void
  sendData: (data: string) => void
  requestWriteAccess: () => void
  requestContact: () => void
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  CloudStorage: {
    getItem: (key: string, callback: (err: any, res: any) => void) => void
    setItem: (key: string, value: string, callback: (err: any, res: any) => void) => void
    removeItem: (key: string, callback: (err: any, res: any) => void) => void
  }
  initData: string
  initDataUnsafe: {
    query_id: string
    user: {
      id: number
      is_bot: boolean
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      photo_url?: string
    }
    auth_date: number
    hash: string
  }
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    setText: (text: string) => TelegramWebApp['MainButton']
    show: () => TelegramWebApp['MainButton']
    hide: () => TelegramWebApp['MainButton']
    enable: () => TelegramWebApp['MainButton']
    disable: () => TelegramWebApp['MainButton']
    showProgress: (leaveActive?: boolean) => void
    hideProgress: () => void
    onClick: (callback: () => void) => TelegramWebApp['MainButton']
  }
  BackButton: {
    isVisible: boolean
    show: () => TelegramWebApp['BackButton']
    hide: () => TelegramWebApp['BackButton']
    onClick: (callback: () => void) => TelegramWebApp['BackButton']
  }
  SettingsButton: {
    isVisible: boolean
    show: () => void
    hide: () => void
  }
  viewportHeight: number
  viewportStableHeight: number
  isExpanded: boolean
  themeParams: {
    bg_color: string
    text_color: string
    hint_color: string
    link_color: string
    button_color: string
    button_text_color: string
    secondary_bg_color: string
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export const useTelegram = () => {
  const webApp = typeof window !== 'undefined' ? window.Telegram?.WebApp : null

  const isReady = () => {
    return typeof window !== 'undefined' && !!window.Telegram?.WebApp
  }

  const ready = () => {
    if (webApp) {
      webApp.ready()
    }
  }

  const expand = () => {
    if (webApp) {
      webApp.expand()
    }
  }

  const close = () => {
    if (webApp) {
      webApp.close()
    }
  }

  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'impact' = 'light') => {
    if (webApp?.HapticFeedback) {
      if (type === 'impact') {
        webApp.HapticFeedback.impactOccurred('medium')
      } else {
        webApp.HapticFeedback.impactOccurred(type)
      }
    }
  }

  const hapticNotification = (type: 'error' | 'success' | 'warning' = 'success') => {
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred(type)
    }
  }

  const hapticSelection = () => {
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.selectionChanged()
    }
  }

  const getInitData = () => {
    if (webApp?.initData) {
      return webApp.initData
    }
    return null
  }

  const getUser = () => {
    if (webApp?.initDataUnsafe?.user) {
      return webApp.initDataUnsafe.user
    }
    return null
  }

  const setMainButton = (config: {
    text: string
    onClick?: () => void
    show?: boolean
    progress?: boolean
  }) => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText(config.text)
      if (config.onClick) {
        webApp.MainButton.onClick(config.onClick)
      }
      if (config.show) {
        webApp.MainButton.show()
      }
      if (config.progress) {
        webApp.MainButton.showProgress()
      }
    }
  }

  const showMainButton = () => {
    if (webApp?.MainButton) {
      webApp.MainButton.show()
    }
  }

  const hideMainButton = () => {
    if (webApp?.MainButton) {
      webApp.MainButton.hide()
    }
  }

  const showBackButton = () => {
    if (webApp?.BackButton) {
      webApp.BackButton.show()
    }
  }

  const hideBackButton = () => {
    if (webApp?.BackButton) {
      webApp.BackButton.hide()
    }
  }

  const onBackButton = (callback: () => void) => {
    if (webApp?.BackButton) {
      webApp.BackButton.onClick(callback)
    }
  }

  return {
    webApp,
    isReady,
    ready,
    expand,
    close,
    hapticFeedback,
    hapticNotification,
    hapticSelection,
    getInitData,
    getUser,
    setMainButton,
    showMainButton,
    hideMainButton,
    showBackButton,
    hideBackButton,
    onBackButton
  }
}

export default useTelegram
