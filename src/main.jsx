import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PageDojoBlog from "./pages/PageDojoBlog";
import PageToDo from "./pages/PageToDo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PageDojoBlog />
    {/* <PageToDo /> */}
  </StrictMode>
);
