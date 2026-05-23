import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";
import "doodle.css/doodle.css";

console.log("fetching flight response");
const fetchPromise = fetch("/react-flight");
const p = createFromFetch(fetchPromise);
const root = createRoot(document.getElementById("root"));
console.log("rendering root", p);
root.render(p);