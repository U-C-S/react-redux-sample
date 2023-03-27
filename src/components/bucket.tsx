import { useState } from "react";
import {
  Button,
  Card,
  Text,
  Modal,
  Input,
  Select,
} from "@mantine/core";

export default function Bucket({
  name,
  cards,
  renameBucket,
  addCard,
  deleteBucket,
}) {
  return (
    <Card shadow="sm" padding="md">
      <Card.Section>
        <Text>{name}</Text>
      </Card.Section>
      <Card.Section>
        <Text>Card 1</Text>
        <Text>Card 2</Text>
        <Text>Card 3</Text>
      </Card.Section>
      <Card.Section>
        <Button>+</Button>
        <Button>-</Button>
      </Card.Section>
    </Card>
  );
}
