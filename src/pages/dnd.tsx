import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
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
const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | undefined | NotDraggingStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

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

export default function QuoteApp() {
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
    <div>
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
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Column ind={ind} el={el} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<QuoteApp />, rootElement);

interface IColumnProps {
  ind: number;
  el: Bucket;
}

function Column({ ind, el }: IColumnProps) {
  return (
    <Droppable key={ind} droppableId={`${ind}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}>
          {el.cards.map((item, index) => (
            <Item item={item} index={index} />
          ))}
        </div>
      )}
    </Droppable>
  );
}

interface ItemProps {
  item: CardData;
  index: number;
}

function Item({ item, index }: ItemProps) {
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style) as any}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}>
            {item.name}
            <button
              type="button"
              onClick={() => {
                // const newState = [...state];
                // newState[ind].splice(index, 1);
                // setState(newState.filter((group) => group.length));
              }}>
              delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
