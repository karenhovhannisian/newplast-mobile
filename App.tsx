import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { InAppMessage } from './src/components/Toast';
import { AppNavigation } from './src/navigation';
import { persistor, store } from './src/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppNavigation />
          <InAppMessage />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
