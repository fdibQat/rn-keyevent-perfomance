import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TestItem = {
  abc: number;
  name: string;
  price: number;
  sequence: number;
  status: boolean;
  updatedAt: string;
  value: number;
  volume: number;
  xCode: string;
  xyz: number;
  yCode: string;
};

export type TestData = {
  header: {
    createdAt: string;
    createdBy: number;
    markAs: boolean;
    isSent: boolean;
    testID: string;
    locationID: string;
    userName: string;
    testGUID: string;
  };
  testItems?: TestItem[];
  id?: number;
};

export const initialState: TestData[] = [
  {
    header: {
      createdAt: new Date().toISOString(),
      createdBy: 1,
      markAs: false,
      isSent: true,
      testID: "LN123567",
      locationID: "LOC123",
      userName: "USer 1",
      testGUID: "GUID123",
    },
    testItems: [
      {
        abc: 1,
        name: "LOG1",
        price: 1,
        sequence: 1,
        status: true,
        updatedAt: new Date().toISOString(),
        value: 1,
        volume: 1,
        xCode: "GC1",
        xyz: 1,
        yCode: "SC1",
      },
      {
        abc: 2,
        name: "LOG2",
        price: 2,
        sequence: 2,
        status: true,
        updatedAt: new Date().toISOString(),
        value: 2,
        volume: 2,
        xCode: "GC2",
        xyz: 2,
        yCode: "SC2",
      },
    ],
    id: 1,
  },
];

export const testSlice = createSlice({
  name: "testData",
  initialState,
  reducers: {
    setTestData: (state, action: PayloadAction<TestData>) => [
      ...state,
      action.payload,
    ],
    addItemToTestData: (
      state,
      action: PayloadAction<{ testID: string; testItem: TestItem }>
    ) => {
      const testItemIndex = state.findIndex(
        (testItem) => testItem.header.testID === action.payload.testID
      );
      if (testItemIndex < 0) {
        return state;
      }
      return [
        ...state.slice(0, testItemIndex),
        {
          ...state[testItemIndex]!,
          testItems: [
            ...(state[testItemIndex]!.testItems || []),
            action.payload.testItem,
          ],
        },
        ...state.slice(testItemIndex + 1),
      ];
    },
  },
});

export const { setTestData, addItemToTestData } = testSlice.actions;

export default testSlice.reducer;
