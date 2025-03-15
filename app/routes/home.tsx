import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Project React Router" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div>Hello</div>;
}
