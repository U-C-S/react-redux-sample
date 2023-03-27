import { createStyles, rem, Text } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { Draggable } from "react-beautiful-dnd";
import { CardData } from "../types";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
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

export default function CardComponent({ item, index }: CardProps) {
  const { classes, cx } = useStyles();

  return (
    <Draggable key={item.name} index={index} draggableId={item.name}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <div className={classes.dragHandle} {...provided.dragHandleProps}>
            <IconGripVertical size="1.05rem" stroke={1.5} />
          </div>
          <Text>{item.name}</Text>
        </div>
      )}
    </Draggable>
  );
}
