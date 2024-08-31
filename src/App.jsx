import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import components
import Navbar from "./components/Navbar";
import Header from "./components/Header";

//import ui component
import { Toaster } from "@/components/ui/toaster";

// Import additional components (pages)
import Home from "./pages/Home";
import { CreateUser } from "./pages/CreateUser";
import CreateBulkUser from "./pages/CreateBulkUser";
import AccessManagement from "./pages/AccessManagement";
import AccountMapping from "./pages/AccountMapping";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Router>
      <div>
        <Toaster richColors />
        <div className="grow  h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white overflow-x-hidden">
          <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
          <Header setIsOpen={setIsOpen} isOpen={isOpen} />
          <div>
            <Routes>
              <Route path="/" element={<Home setNavbarOpen={setIsOpen} />} />
              <Route path="/user/create" element={<CreateUser />} />
              <Route path="/user/bulk/create" element={<CreateBulkUser />} />
              <Route path="/role/create" element={<AccessManagement />} />
              <Route path="/user/account/map" element={<AccountMapping />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
