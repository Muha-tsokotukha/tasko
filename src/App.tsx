import { Provider } from "react-redux";
import { TaskBoardPage } from "src/pages";
import store from "src/store";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <TaskBoardPage />
    </Provider>
  );
}

export default App;
