import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ListPage from "./pages/ListPage";
import { Layout } from "./components/Layout";
import { TodoProvider } from "./context/TodoContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <TodoProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/list/:id" element={<ListPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TodoProvider>
  );
}

export default App;
