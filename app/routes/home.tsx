import type { Route } from "./+types/home";
import axios from 'axios';
import '../App.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    console.log(data);
  })
}

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={apiCall}>Make API Call</button>

      </header>
    </div>
  );
}
