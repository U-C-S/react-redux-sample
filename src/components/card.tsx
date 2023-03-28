import { Card, createStyles, Group, rem, Text } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { CardData } from "../types";

const useStyles = createStyles((theme) => ({
  item: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

interface CardProps {
  item: CardData;
  index: number;
}
const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | undefined | NotDraggingStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});

export default function CardComponent({ item, index }: CardProps) {
  const { classes, cx } = useStyles();

  return (
    // <Draggable key={item.name} index={index} draggableId={item.name}>
    //   {(provided, snapshot) => (
    //     <div
    //       className={cx(classes.item, {
    //         [classes.itemDragging]: snapshot.isDragging,
    //       })}
    //       ref={provided.innerRef}
    //       {...provided.draggableProps}>
    //       <div className={classes.dragHandle} {...provided.dragHandleProps}>
    //         <IconGripVertical size="1.05rem" stroke={1.5} />
    //       </div>
    //       <Text>{item.name}</Text>
    //     </div>
    //   )}
    // </Draggable>

    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          withBorder
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style) as any}>
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
