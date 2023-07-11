// React Util
import React from "react";
import { Routes, Route } from "react-router-dom";

// CSS
import "./App.css";

// JSX Components
import {Header, Home, SignUp, LogIn} from "./pages"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
