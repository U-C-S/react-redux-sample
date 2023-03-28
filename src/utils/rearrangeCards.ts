import { DraggableLocation } from "react-beautiful-dnd";
import { Bucket } from "../types";

export const reorder = (list: Bucket, startIndex: number, endIndex: number) => {
  const result = Array.from(list.cards);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  list.cards = result;
  return list;
};

export const move = (
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
