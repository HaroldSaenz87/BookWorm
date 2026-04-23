import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {

  return(

    
    // Required to calculate physical device insets
    <SafeAreaProvider>

      {/* Custom wrapper that applies the calculated safe area padding to ensure UI content isnt clipped */}
      <SafeScreen>

        {/* Global setting to allow for custom UI header in individual screens */}
        <Stack screenOptions={{ headerShown: false }}> 

          {/* Main Landing Page */}
          <Stack.Screen name="index" />

          {/* Authentication Group that contains Login and Signup */}
          <Stack.Screen name="(auth)" />
        
        </Stack>

      </SafeScreen>

      {/* Controls the appearance of the device clock and battery icons */}
      <StatusBar style="dark"/>

    </SafeAreaProvider>
  
  );

}
