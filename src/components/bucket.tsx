import { Card, Text, Group, ActionIcon, Divider, Stack } from "@mantine/core";
import { Bucket } from "../types";
import { Droppable } from "react-beautiful-dnd";
import CardComponent from "./card";
import { IconEdit, IconPlus } from "@tabler/icons-react";

interface IColumnProps {
  ind: number;
  el: Bucket;
}

export default function BucketComponent({ ind, el }: IColumnProps) {
  return (
    <Card withBorder w={320}>
      <Card.Section p={10}>
        <Group position="apart">
          <Text>{el.name}</Text>
          <Group>
            <ActionIcon color="dark">
              <IconEdit />
            </ActionIcon>
            <ActionIcon color="dark">
              <IconPlus />
            </ActionIcon>
          </Group>
        </Group>
        <Divider m={10} />
      </Card.Section>
      <Card.Section px={10} pb={10}>
        <Droppable key={ind} droppableId={`${ind}`}>
          {(provided, snapshot) => (
            <Stack spacing={"xs"} ref={provided.innerRef} {...provided.droppableProps}>
              {el.cards.map((item, index) => (
                <CardComponent item={item} index={index} />
              ))}
            </Stack>
          )}
        </Droppable>
      </Card.Section>
    </Card>
  );
}
