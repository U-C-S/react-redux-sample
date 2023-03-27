import { Button, Card, Text, Group } from "@mantine/core";
import { CardCollection } from "../types";
import { Droppable } from "react-beautiful-dnd";
import CardComponent from "./card";

interface BucketProps {
  cards: CardCollection;
  name: string;
}

export default function Bucket({ name, cards }: BucketProps) {
  return (
    <Card withBorder w={350} m={10}>
      <Card.Section>
        <Group position="apart">
          <Text>{name}</Text>
          <Button>+</Button>
        </Group>
      </Card.Section>
      <Card.Section>
        <Droppable droppableId="{name}" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => (
                <CardComponent item={card} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card.Section>
    </Card>
  );
}
