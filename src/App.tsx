import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/state/store";
import AppRouter from "./router";

function App() {
  return (
    <ReduxProvider store={store}>
      <AppRouter />
    </ReduxProvider>
  );
}

export default App;
