import { Container, Group } from "@mantine/core";
import { useState } from "react";
import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";
import BucketComponent from "../components/bucket";
import { Bucket, CardData, CardType } from "../types";

const reorder = (list: Bucket, startIndex: number, endIndex: number) => {
  const result = Array.from(list.cards);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  list.cards = result;
  return list;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: Bucket,
  destination: Bucket,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source.cards);
  const destClone = Array.from(destination.cards);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  source.cards = sourceClone;
  destination.cards = destClone;

  const result = {
    [droppableSource.droppableId]: source,
    [droppableDestination.droppableId]: destination,
  };

  return result;
};

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

export default function HomePage() {
  const [state, setState] = useState([sampleData, sampleData2]);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    console.log(sInd, dInd);
    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd.toString()];
      newState[dInd] = result[dInd.toString()];

      setState(newState.filter((group) => group.cards.length));
    }
  }

  return (
    <Container bg={"#e3ceb9"} p={10}>
      <button
        type="button"
        onClick={() => {
          // setState([...state, []]);
        }}>
        Add new group
      </button>
      {/* <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}>
        Add new item
      </button> */}
      <Group position="center">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <BucketComponent ind={ind} el={el} />
          ))}
        </DragDropContext>
      </Group>
    </Container>
  );
}
