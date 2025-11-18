import { useEffect } from 'react';

export const useTelegram = () => {
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, [tg]);

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    theme: tg?.themeParams,
    colorScheme: tg?.colorScheme,
    haptic: {
      impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
        tg?.HapticFeedback?.impactOccurred(style);
      },
      notification: (type: 'error' | 'success' | 'warning') => {
        tg?.HapticFeedback?.notificationOccurred(type);
      },
      selection: () => {
        tg?.HapticFeedback?.selectionChanged();
      },
    },
    sendData: (data: unknown) => {
      if (tg) {
        tg.sendData(JSON.stringify(data));
      }
    },
    close: () => {
      tg?.close();
    },
  };
};
