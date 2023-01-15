import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./states/store";
import { useFonts } from "expo-font";




export default function App() {
  let [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
  });
  
  if (!fontsLoaded){
    return null;
  }

  console.reportErrorsAsExceptions = false;
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
