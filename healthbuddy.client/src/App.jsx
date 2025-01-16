import { useEffect, useState, version } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let savedMode = localStorage.getItem("displayMode");
    if (!savedMode) {
      savedMode = "light";
      localStorage.setItem("displayMode", savedMode);
      setDarkMode(false);
    }
    setDarkMode(savedMode === "dark" ? true : false);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    //localStorage.setItem("displayMode", darkMode ? "light" : "dark");
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="transistion-300 bg-white_smoke dark:bg-ebony h-screen flex items-center justify-center">
        <h1 className="text-lg">hi {version}</h1>
        <button
          onClick={() => {
            toggleDarkMode();
          }}
          className="size-28 bg-gradient-to-br from-primary-dark to-secondary-dark text-white"
        >
          test
        </button>
      </div>
    </div>
  );
}

export default App;
