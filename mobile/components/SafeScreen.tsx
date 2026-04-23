import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '@/constants/colors';
import { ReactNode } from 'react';

// Defines the this component expects children
interface SafeScreenProps {
    children: ReactNode;
}

// Layout wrapper to handle physical device and status bars
// Ensures that content starts below the status bar on IOS and Android
export default function SafeScreen({children}: SafeScreenProps) {

    // A hook that provides the exact pixel dimensions of the areas
    const insets = useSafeAreaInsets();

  return (

    // Combines the static base container styles with dynamic paddingTop based on the specific devices top inset value
    <View style={[styles.container, {paddingTop: insets.top}]} >{children}</View>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

});