import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

// Landing page (WILL BE UPDATED LATER)
export default function Index() {

  return (

    // Just a welcom but all will be updated later
    <View style={styles.container}>

      <Text>Hello</Text>

      {/* Nav links*/}
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})