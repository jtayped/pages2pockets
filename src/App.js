// React Util
import React from "react";
import { Routes, Route } from "react-router-dom";

// JSX Components
import { Home, SignUp, LogIn, NotFound } from "./pages";
import { Header } from "./containers";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
