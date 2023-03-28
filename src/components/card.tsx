import { Card, createStyles, Group, rem, Text } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { CardData } from "../types";

const useStyles = createStyles((theme) => ({
  item: {
    backgroundColor: theme.colors.dark[5],
    marginBottom: theme.spacing.sm,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: theme.colors.dark[1],
  },
}));

interface CardProps {
  item: CardData;
  index: number;
}

export default function CardComponent({ item, index }: CardProps) {
  const { classes } = useStyles();

  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          withBorder
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}>
          <Group>
            <div className={classes.dragHandle} {...provided.dragHandleProps}>
              <IconGripVertical size="1rem" stroke={1.5} />
            </div>
            <Text>{item.name}</Text>
            {/* <button
              type="button"
              onClick={() => {
                // const newState = [...state];
                // newState[ind].splice(index, 1);
                // setState(newState.filter((group) => group.length));
              }}>
              delete
            </button> */}
          </Group>
        </Card>
      )}
    </Draggable>
  );
}
