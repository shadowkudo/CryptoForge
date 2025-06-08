import Term from "../components/term/term";
import {useOutletContext} from "react-router";

export function meta() {
  return [
    { title: "CryptoForge" },
    { name: "description", content: "Forge your message!" },
  ];
}

export default function Tool() {
  const { theme } = useOutletContext();
  return <Term theme={theme} />;
}