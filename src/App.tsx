import { useState } from "react";
import { MantineProvider, Text } from "@mantine/core";
import HomePage from "./pages/home";
import { Bucket, CardType } from "./types";

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

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <HomePage bucketData={[sampleData, sampleData2]} />
    </MantineProvider>
  );
}

export default App;
