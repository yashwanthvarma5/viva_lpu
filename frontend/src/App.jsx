import { Routes, Route } from "react-router-dom";
import Task from "./pages/Task";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Task />
        </ProtectedRoute>
      }
    />
    <Route path="/auth" element={<Auth />} />
  </Routes>
);

export default App;
