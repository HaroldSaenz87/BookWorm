import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import styles from '@/assets/styles/login.styles';
import { useState } from 'react';
import COLORS from '@/constants/colors';
import { Ionicons } from "@expo/vector-icons"
import { Link } from 'expo-router';


// Login screen component
export default function Login() {

  // State hooks for form data and UI feedback
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // TODO
  const handleLogin = () => {}
  
  return (

    // Allows user to close the keyboard by tapping anywhere on the background
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      
      {/* Prevents keyboard from overlapping the input fields*/}
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS ==="ios" ? "padding" : "height"}>

        <View style={styles.container}>

          {/* Illustration */}
          <View style={styles.topIllustration}>

            <Image 
              source={require("../../assets/images/ladyReading.png")}
              style={styles.illustrationImage}
              resizeMode="contain" 
            />
          
          </View>

          {/* Main login card */}
          <View style={styles.card}>

            <View style={styles.formContainer}>

              {/* Email */}
              <View style={styles.inputGroup}>

                <Text style={styles.label}>Email</Text>

                <View style={styles.inputContainer}>

                  <Ionicons 
                    name="mail-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={COLORS.placeholderText}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none" 
                  />

                </View>

              </View>

              {/* Password */}
              <View style={styles.inputGroup}>

                <Text style={styles.label}>Password</Text>

                <View style={styles.inputContainer}>
                  
                  {/* Lock icon */}
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon} 
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />

                  {/* Password */}
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)} 
                    style={styles.eyeIcon}
                  >
                    
                    {/* Eye icon */}
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={COLORS.primary}
                    />


                  </TouchableOpacity>


                </View>

              </View>

              {/* Submit button */}
              <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
                
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}

              </TouchableOpacity>

              {/* Footer that links to the signup */}
              <View style={styles.footer}>
                
                <Text style={styles.footerText}>Don't have an account?</Text>
                
                <Link href="/signup" asChild>
                  
                  <TouchableOpacity>
                    
                    <Text style={styles.link}>Sign Up</Text>
                  
                  </TouchableOpacity>
                
                </Link>

              </View>

            </View>

          </View>
        
        </View>

      </KeyboardAvoidingView>

    </TouchableWithoutFeedback>

  );

}