import { useTelegram } from '@/lib/telegram'

export const useHaptic = () => {
  const { hapticFeedback, hapticNotification, hapticSelection } = useTelegram()

  return {
    tapSuccess: () => hapticFeedback('light'),
    tapWarning: () => hapticFeedback('medium'),
    tapError: () => hapticFeedback('heavy'),
    notifySuccess: () => hapticNotification('success'),
    notifyError: () => hapticNotification('error'),
    notifyWarning: () => hapticNotification('warning'),
    selection: () => hapticSelection(),
  }
}
