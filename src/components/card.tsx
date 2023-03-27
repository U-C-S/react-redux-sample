import { Card } from "@mantine/core";

export default function CardComponent({ name, url }) {
  return (
    <Card shadow="sm" padding="md">
      <a href={url} target="_blank">
        <img src={url} className="logo" alt={`${name} logo`} />
      </a>
    </Card>
  );
}
