import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";
import { Bucket, CardType } from "../types";
import { reorder, move } from "./rearrangeCards";

const sampleData: Bucket = {
  name: "Movies",
  cards: [
    {
      id: 1,
      name: "Hydro-gen",
      type: CardType.video,
      link: "https://www.youtube.com/watch?v=Z1ktxiqyiLA",
    },
    {
      id: 3,
      name: "Hydro Monkey",
      type: CardType.video,
      link: "https://www.youtube.com/watch?v=Z1ktxiqyiLA",
    },
    {
      id: 4,
      name: "Uranium Music",
      type: CardType.audio,
      link: "https://www.youtube.com/watch?v=Z1ktxiqyiLA",
    },
  ],
};
const sampleData2: Bucket = {
  name: "Cats",
  cards: [
    {
      id: 2,
      name: "Helium",
      type: CardType.video,
      link: "https://www.youtube.com/watch?v=Z1ktxiqyiLA",
    },
    {
      id: 5,
      name: "Lithium",
      type: CardType.video,
      link: "https://www.youtube.com/watch?v=Z1ktxiqyiLA",
    },
    {
      id: 6,
      name: "Beryllium",
      type: CardType.video,
      link: "https://www.youtube.com/watch?v=Z1ktxiqyiLA",
    },
  ],
};

const BucketSlice = createSlice({
  name: "bucket",
  initialState: {
    buckets: [sampleData, sampleData2],
  },
  reducers: {
    addBucket: (state, action: PayloadAction<string>) => {
      state.buckets.push({
        name: action.payload,
        cards: [],
      });
    },
    moveCard: (state, action: PayloadAction<DropResult>) => {
      const { source, destination } = action.payload;

      // dropped outside the list
      if (!destination) {
        return;
      }
      const sInd = +source.droppableId;
      const dInd = +destination.droppableId;

      console.log(sInd, dInd);
      if (sInd === dInd) {
        const items = reorder(state.buckets[sInd], source.index, destination.index);
        const newState = [...state.buckets];
        newState[sInd] = items;
        state.buckets = newState;
      } else {
        const result = move(state.buckets[sInd], state.buckets[dInd], source, destination);
        const newState = [...state.buckets];
        newState[sInd] = result[sInd.toString()];
        newState[dInd] = result[dInd.toString()];

        // setState(newState.filter((group) => group.cards.length));
        state.buckets = newState.filter((group) => group.cards.length);
      }
    },
  },
});

export const bucketStore = configureStore({
  reducer: {
    bucket: BucketSlice.reducer,
  },
});

export const { addBucket, moveCard } = BucketSlice.actions;