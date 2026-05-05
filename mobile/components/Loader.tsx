import React, { useEffect, useRef } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  Easing,
  Text,
  Image,
} from 'react-native';
import COLORS from '@/constants/colors';

interface LoaderProps {
  visible?: boolean;
}

export default function Loader({ visible = false }: LoaderProps) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(float, {
            toValue: 1,
            duration: 1600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(float, {
            toValue: 0,
            duration: 1600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.06,
            duration: 1600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      fadeIn.setValue(0);
      float.setValue(0);
      pulse.setValue(1);
    }
  }, [visible]);

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14],
  });

  const shadowScale = float.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  const shadowOpacity = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.1],
  });

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <Animated.View style={[styles.overlay, { opacity: fadeIn }]}>

        <Animated.View
          style={[
            styles.imageWrap,
            { transform: [{ translateY }, { scale: pulse }] },
          ]}
        >
          <Image
            source={require("../assets/images/flyingBook.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Shadow beneath illustration */}
        <Animated.View
          style={[
            styles.shadow,
            {
              opacity: shadowOpacity,
              transform: [{ scaleX: shadowScale }],
            },
          ]}
        />

        <Text style={styles.label}>Loading...</Text>

      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  
  overlay: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrap: {
    width: 260,
    height: 260,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shadow: {
    width: 160,
    height: 18,
    borderRadius: 50,
    backgroundColor: COLORS.textSecondary,
    marginTop: 4,
  },
  label: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1.5,
    color: COLORS.textSecondary,
  },
});