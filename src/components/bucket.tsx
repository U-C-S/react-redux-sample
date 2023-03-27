import { Button, Card, Text, Group, ActionIcon, Divider } from "@mantine/core";
import { Bucket } from "../types";
import { Droppable } from "react-beautiful-dnd";
import CardComponent from "./card";
import { IconEdit, IconPlus } from "@tabler/icons-react";

interface BucketProps {
  cards: Bucket;
  name: string;
}

export default function Bucket({ name, cards }: BucketProps) {
  return (
    <Card withBorder w={350} m={10}>
      <Card.Section p={10}>
        <Group position="apart">
          <Text>{name}</Text>
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
      <Card.Section p={10}>
        <Droppable droppableId={name} direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => (
                <CardComponent item={card} index={index} key={card.name} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card.Section>
    </Card>
  );
}
