import Header from "../components/Header";
import {useEffect} from "react";

export default function ProjectList() {

  const options = {
    method: "POST",
    body: JSON.stringify({test: "test"}),
    headers: {
      "Content-Type": "application/json"
    },
  };

  useEffect(() => {
    fetch("/projects", options)
      .then(res => res.json())
      .then(res => console.log(res))
  }, [])

  return (
    <Header activeTab={"project-list"}/>
  );
}
