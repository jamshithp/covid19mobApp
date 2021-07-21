import React, { useState } from 'react';
import CovidNavigator from './navigation/CovidNavigator';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens  } from 'react-native-screens';

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'roboto-black' : require('./assets/fonts/Roboto-Black.ttf'),
    'roboto-light' : require('./assets/fonts/Roboto-Light.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

 return <CovidNavigator />;
}