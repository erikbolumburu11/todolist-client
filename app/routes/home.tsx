import type { Route } from "./+types/home";
import axios from 'axios';
import '../App.css';
import { LoginForm } from "~/components/auth/loginform";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Landing" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const apiCall = () => {
}

export default function Home() {
  return (
    <LoginForm/>
  );
}
