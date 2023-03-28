import { useState } from "react";
import { MantineProvider, Text } from "@mantine/core";
import HomePage from "./pages/home";
import QuoteApp from "./pages/dnd";

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);
<RouterProvider router={router} />
*/

const sampleData = [
  {
    position: 1,
    name: "Hydrogen",
  },
  {
    position: 2,
    name: "Helium",
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QuoteApp />
    </MantineProvider>
  );
}

export default App;
