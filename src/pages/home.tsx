import { Container, Group } from "@mantine/core";
import { useState } from "react";
import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";
import BucketComponent from "../components/bucket";
import { Bucket, CardType } from "../types";

const reorder = (list: Bucket, startIndex: number, endIndex: number) => {
  const result = Array.from(list.cards);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  list.cards = result;
  return list;
};

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

export default function HomePage({ bucketData }: { bucketData: Bucket[] }) {
  const [state, setState] = useState(bucketData);

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
