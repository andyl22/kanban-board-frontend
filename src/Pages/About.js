import Header from "../components/Header";
import AboutContent from "../components/AboutContent";

export default function About() {
  return (
    <>
      <Header activeTab={"about"} title={"About"}/>
      <AboutContent />
    </>
  );
}
