import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TelegramContext = createContext(null);

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(null);
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);
  const [themeParams, setThemeParams] = useState({});

  useEffect(() => {
    // Check if running inside Telegram
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      setWebApp(tg);
      setIsTelegram(true);
      
      // Initialize WebApp
      tg.ready();
      tg.expand();
      
      // Get user data
      if (tg.initDataUnsafe?.user) {
        setUser({
          id: tg.initDataUnsafe.user.id,
          firstName: tg.initDataUnsafe.user.first_name,
          lastName: tg.initDataUnsafe.user.last_name || '',
          username: tg.initDataUnsafe.user.username || '',
          languageCode: tg.initDataUnsafe.user.language_code || 'pl',
          photoUrl: tg.initDataUnsafe.user.photo_url || null
        });
      }

      // Get theme
      setThemeParams({
        bgColor: tg.themeParams?.bg_color || '#0a0a0a',
        textColor: tg.themeParams?.text_color || '#f5f5f5',
        hintColor: tg.themeParams?.hint_color || '#888888',
        linkColor: tg.themeParams?.link_color || '#d4a853',
        buttonColor: tg.themeParams?.button_color || '#d4a853',
        buttonTextColor: tg.themeParams?.button_text_color || '#0a0a0a',
        secondaryBgColor: tg.themeParams?.secondary_bg_color || '#1a1a1a'
      });

      // Set header color
      tg.setHeaderColor('#0a0a0a');
      tg.setBackgroundColor('#0a0a0a');

      setIsReady(true);
    } else {
      // Not in Telegram - use mock data for development
      setIsTelegram(false);
      setIsReady(true);
      setUser({
        id: 'dev_user_123',
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        languageCode: 'pl',
        photoUrl: null
      });
    }
  }, []);

  // Show main button
  const showMainButton = useCallback((text, onClick) => {
    if (webApp?.MainButton) {
      webApp.MainButton.text = text;
      webApp.MainButton.color = '#d4a853';
      webApp.MainButton.textColor = '#0a0a0a';
      webApp.MainButton.onClick(onClick);
      webApp.MainButton.show();
    }
  }, [webApp]);

  // Hide main button
  const hideMainButton = useCallback(() => {
    if (webApp?.MainButton) {
      webApp.MainButton.hide();
    }
  }, [webApp]);

  // Show back button
  const showBackButton = useCallback((onClick) => {
    if (webApp?.BackButton) {
      webApp.BackButton.onClick(onClick);
      webApp.BackButton.show();
    }
  }, [webApp]);

  // Hide back button
  const hideBackButton = useCallback(() => {
    if (webApp?.BackButton) {
      webApp.BackButton.hide();
    }
  }, [webApp]);

  // Send data to bot
  const sendData = useCallback((data) => {
    if (webApp) {
      webApp.sendData(JSON.stringify(data));
    }
  }, [webApp]);

  // Close the WebApp
  const close = useCallback(() => {
    if (webApp) {
      webApp.close();
    }
  }, [webApp]);

  // Show popup
  const showPopup = useCallback((params) => {
    if (webApp?.showPopup) {
      return new Promise((resolve) => {
        webApp.showPopup(params, (buttonId) => {
          resolve(buttonId);
        });
      });
    }
    return Promise.resolve(null);
  }, [webApp]);

  // Show confirm
  const showConfirm = useCallback((message) => {
    if (webApp?.showConfirm) {
      return new Promise((resolve) => {
        webApp.showConfirm(message, (confirmed) => {
          resolve(confirmed);
        });
      });
    }
    return Promise.resolve(window.confirm(message));
  }, [webApp]);

  // Haptic feedback
  const hapticFeedback = useCallback((type = 'impact', style = 'medium') => {
    if (webApp?.HapticFeedback) {
      switch (type) {
        case 'impact':
          webApp.HapticFeedback.impactOccurred(style);
          break;
        case 'notification':
          webApp.HapticFeedback.notificationOccurred(style);
          break;
        case 'selection':
          webApp.HapticFeedback.selectionChanged();
          break;
        default:
          break;
      }
    }
  }, [webApp]);

  // Open invoice (for Telegram payments)
  const openInvoice = useCallback((url) => {
    if (webApp?.openInvoice) {
      return new Promise((resolve) => {
        webApp.openInvoice(url, (status) => {
          resolve(status);
        });
      });
    }
    return Promise.resolve('failed');
  }, [webApp]);

  // Open link
  const openLink = useCallback((url, options = {}) => {
    if (webApp?.openLink) {
      webApp.openLink(url, options);
    } else {
      window.open(url, '_blank');
    }
  }, [webApp]);

  // Open Telegram link
  const openTelegramLink = useCallback((url) => {
    if (webApp?.openTelegramLink) {
      webApp.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  }, [webApp]);

  return (
    <TelegramContext.Provider value={{
      webApp,
      user,
      isReady,
      isTelegram,
      themeParams,
      showMainButton,
      hideMainButton,
      showBackButton,
      hideBackButton,
      sendData,
      close,
      showPopup,
      showConfirm,
      hapticFeedback,
      openInvoice,
      openLink,
      openTelegramLink
    }}>
      {children}
    </TelegramContext.Provider>
  );
};

export default TelegramContext;
