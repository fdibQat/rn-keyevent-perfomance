import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import KeyEvent from "react-native-keyevent";
import { TestData, TestItem, addItemToTestData } from "./testSlice";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";

const KeyCatcher = () => {
  const testData = useSelector((state: RootState) => state.testData);
  //console.log(testData);

  const [keyCode, setKeyCode] = useState("nothing has been pressed yet");
  const KEYBOARD_KEYS = {
    arrowDown: 20,
    arrowLeft: 21,
    arrowRight: 22,
    arrowUp: 19,
    f1: 131,
    f2: 132,
    f3: 133,
    f4: 134,
    f5: 135,
    f6: 136,
    f7: 137,
    tab: 61,
  } as const;

  type KeyboardKeys = (typeof KEYBOARD_KEYS)[keyof typeof KEYBOARD_KEYS];

  const dispatch = useDispatch();

  // Heavy operation mock function
  const heavyOperation = (testData: TestData[], itemToAdd: TestItem) => {
    const start = performance.now();

    const sum = testData.reduce((acc, testDataItem) => {
      const abcSum =
        testDataItem.testItems?.reduce(
          (abcAcc, item) => abcAcc + item.abc,
          0
        ) || 0;
      return acc + abcSum;
    }, 0);

    const total = sum + itemToAdd.abc;
    const end = performance.now();

    console.log(`Time taken to execute heavy operation is ${end - start}ms.`);

    return total;
  };

  const saveData = () => {
    console.log(">>> Save data started: <<<");
    const start = performance.now();
    const itemToAdd = {
      abc: 1,
      name: "TEST 3",
      price: 1,
      sequence: 1,
      status: true,
      updatedAt: new Date().toISOString(),
      value: 1,
      volume: 1,
      xCode: "Y3",
      xyz: 1,
      yCode: "Y3",
    };

    const randomHeavyOp = heavyOperation(testData, itemToAdd);
    console.log(`Total randomHeavyOp value: ${randomHeavyOp}`);

    testData.forEach((testDataItem) => {
      const similarItem = testDataItem.testItems?.find(
        (item) => item.name === itemToAdd.name
      );

      if (similarItem) {
        console.log(`Found a similar item with name: ${similarItem.name}`);
      } else {
        console.log("No similar item found");
      }
    });

    dispatch(addItemToTestData({ testID: "LN123567", testItem: itemToAdd }));
    console.log(">>> Save data finished <<<");
    const end = performance.now();

    console.log(`Time taken to execute add function is ${end - start}ms.`);
  };

  useEffect(() => {
    KeyEvent.onKeyDownListener(
      (keyEvent: {
        keyCode: KeyboardKeys;
        action: string;
        pressedKey: string;
      }) => {
        console.log(
          "Key pressed:",
          keyEvent.keyCode,
          keyEvent.action,
          keyEvent.pressedKey
        );
        setKeyCode(keyEvent.keyCode.toString());
        switch (keyEvent.keyCode) {
          case KEYBOARD_KEYS.f2:
            saveData();
            break;
          default:
            break;
        }
      }
    );

    return () => KeyEvent.removeKeyDownListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Key Code pressed: {keyCode} {testData[0].testItems.length}
      </Text>
      <Button title="Save this" onPress={saveData} />
    </View>
  );
};

export default KeyCatcher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9fb4b6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
});
