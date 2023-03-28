import { Container, Group } from "@mantine/core";
import { useState } from "react";
import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import BucketComponent from "../components/bucket";
import { Bucket, CardType } from "../types";
import { moveCard } from "../utils/bucketStore";

export default function HomePage({ bucketData }: { bucketData: Bucket[] }) {
  // const [state, setState] = useState(bucketData);
  const dispatch = useDispatch();

  function onDragEnd(result: DropResult) {
    dispatch(moveCard(result));
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
          {bucketData.map((el, ind) => (
            <BucketComponent ind={ind} el={el} />
          ))}
        </DragDropContext>
      </Group>
    </Container>
  );
}
