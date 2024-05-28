import { StyleSheet, Text, View } from "react-native";
import KeyCatcher from "./KeyCatcher";
import { store } from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>react-native-keyevent with redux issue:</Text>
        <KeyCatcher />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
