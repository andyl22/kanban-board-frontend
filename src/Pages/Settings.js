import Header from "../components/Header";
import SettingsMenu from "../components/SettingsMenu";

export default function Settings() {
  return (
    <>
      <Header activeTab={"about"} title={"About"} />
      <SettingsMenu />
    </>
  );
}
