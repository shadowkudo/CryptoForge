import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("tool", "routes/tool.jsx"),
    route("about", "routes/about.jsx"),
];