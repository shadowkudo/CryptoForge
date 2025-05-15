import { useOutletContext } from "react-router";
import { Tool } from "../tool/tool";

export function meta() {
  return [
    { title: "CryptoForge" },
    { name: "description", content: "Forge your message!" },
  ];
}

export default function Home() {
  const { isDark } = useOutletContext();
  return <Tool isDark={isDark} />;
}