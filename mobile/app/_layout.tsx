import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";



export default function RootLayout() {

  const router = useRouter();

  const segments = useSegments();

  const {checkAuth, user, token, isLoading} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {

    if (isLoading) return;
    
    
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if(!isSignedIn && !inAuthScreen){
      router.replace("/(auth)/login");
    }
    else if(isSignedIn && inAuthScreen){
      router.replace("/(tabs)");
    }
  }, [user, token, segments, isLoading]);
  

  if(isLoading) return null;


  return(

    
    // Required to calculate physical device insets
    <SafeAreaProvider>

      {/* Custom wrapper that applies the calculated safe area padding to ensure UI content isnt clipped */}
      <SafeScreen>

        {/* Global setting to allow for custom UI header in individual screens */}
        <Stack screenOptions={{ headerShown: false }}> 

          {/* Main Landing Page */}
          <Stack.Screen name="(tabs)" />

          {/* Authentication Group that contains Login and Signup */}
          <Stack.Screen name="(auth)" />
        
        </Stack>

      </SafeScreen>

      {/* Controls the appearance of the device clock and battery icons */}
      <StatusBar style="dark"/>

    </SafeAreaProvider>
  
  );

}
