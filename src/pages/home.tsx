import { Group } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Bucket from "../components/bucket";
import { CardData } from "../types";

export default function HomePage({ data }: { data: CardData[] }) {
  const [state, handlers] = useListState(data);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    handlers.reorder({
      from: result.source.index,
      to: result.destination.index,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Group position="center">
        <Bucket name="To Do" cards={state} />
      </Group>
    </DragDropContext>
  );
}
