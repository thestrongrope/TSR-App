import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardHeader() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>

      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo-horizontal.png")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  searchBox: {
    backgroundColor: "red",
    height: 30,
  },
  logoContainer: {
    width: "50%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
});
