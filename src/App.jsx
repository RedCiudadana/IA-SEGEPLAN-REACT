import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ChatbotOficio from "./pages/ChatbotOficio";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          
          <Route index element={<Home />} />

          <Route path="chatbot" element={<ChatbotOficio />} />
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
