import { Stack } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Touchable,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function AboutScreen() {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const showModalImage = (image: string) => {
    setModalImage(image);
    setShowModal(true);
  };

  const getModalImage = () => {
    switch(modalImage) {
      case "naba-en":
        return require("assets/images/naba-en.jpg");
      case "naba-fa":
        return require("assets/images/naba-fa.jpg");
      case "mau-zeeshan":
        return require("assets/images/mau-zeeshan.jpg");
      default:
        return require("assets/images/naba-en.jpg");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.weThank}>We Thank</Text>

        {modalImage && (
        <Modal
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "red",
          }}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
          visible={showModal}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.modalImageContainer}
            >
              <Image
                source={getModalImage()}
                style={styles.modalImage}
              />
            </TouchableOpacity>
          </View>
        </Modal>
        )}

        <ScrollView>
          <Text style={styles.subTitle}>Naba Cultural Organization, Iran</Text>
          <TouchableOpacity onPress={() => showModalImage("naba-en")}>
            <Image
              source={require("assets/images/naba-en.jpg")}
              style={styles.youTubeImage}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => showModalImage("naba-fa")}>
          <Image
            source={require("assets/images/naba-fa.jpg")}
            style={styles.youTubeImage}
          />
          </TouchableOpacity>

          <Text style={styles.subTitle}>Maulana Sayed Zeeshan Haider Zaidi Sahab</Text>
          <TouchableOpacity onPress={() => showModalImage("mau-zeeshan")}>
          <Image
            source={require("assets/images/mau-zeeshan.jpg")}
            style={styles.youTubeImage}
          />
          </TouchableOpacity>

          <Text style={styles.bodyText}>
            Hujjatul Islam wal Muslimeen Aali Janab Maulana Sayed Zeeshan Haider
            Zaidi Sahab, Vakil (Representative) of Grand Ayatullah Shaikh
            Basheer Husain Najafi (d.z.a.) for his continuous support and
            guidance.
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  weThank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  subTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  bodyText: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalImageContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    flex: 1,
    width: "90%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  categoryTitle: {
    backgroundColor: "red",
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  categoryTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  youTubeImage: {
    width: "100%", // Full width
    height: 200, // Fixed height, you can adjust this
    resizeMode: "cover", // Cover the whole area without stretching
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
