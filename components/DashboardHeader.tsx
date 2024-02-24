import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardHeader() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}></View>
      <View style={styles.shadow}>
        <View style={styles.border}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("assets/images/logo-horizontal.png")}
            />
          </View>
        </View>
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
  border: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 14,
    borderColor: "gray", // Adjust for color
    borderWidth: 1, // Adjust for widthr
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    color: "white", // Adjust text color as needed
    textAlign: "center",
  },
  shadow: {
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: "#000",
    elevation: 4, // for Android
    marginBottom: 10,
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
