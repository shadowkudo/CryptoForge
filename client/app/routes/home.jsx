import { Tool } from "../tool/tool";

export function meta() {
  return [
    { title: "CryptoForge" },
    { name: "description", content: "Forge your message!" },
  ];
}

export default function Home() {
  return <Tool />;
}
