import { useListState } from "@mantine/hooks";
import { DragDropContext } from "react-beautiful-dnd";
import Bucket from "../components/bucket";
import { CardType } from "../types";

export default function HomePage({ data }: { data: CardType[] }) {
  const [state, handlers] = useListState(data);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }>
      <Bucket name="To Do" cards={state} />
    </DragDropContext>
  );
}
