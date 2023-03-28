import { MantineProvider } from "@mantine/core";
import HomePage from "./pages/home";
import { useSelector } from "react-redux";
import { bucketStore } from "./utils/bucketStore";

function App() {
  const bucketData = useSelector((state: ReturnType<typeof bucketStore.getState>) => state.bucket.buckets);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <HomePage bucketData={bucketData} />
    </MantineProvider>
  );
}

export default App;
