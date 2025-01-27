import { useEffect, useState, version } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";

import "./App.css";
import Navbar from "./components/User/Navbar/Navbar";
import LeftSideBar from "./components/User/LeftSideBar/LeftSideBar";
import AllUserRoutes from "./routes/AllUserRoutes";
import { ConfigProvider } from "antd";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalColor, setModalColor] = useState("#1D1F21");
  const [titleColor, setTitleColor] = useState("#000");

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
    localStorage.setItem("displayMode", darkMode ? "light" : "dark");
  };

  useEffect(() => {
    if (darkMode) {
      setModalColor("#1D1F21");
      setTitleColor("#fff");
    } else {
      setModalColor("#fff");
      setTitleColor("#000");
    }
  }, [darkMode]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: modalColor,
            headerBg: modalColor,
            titleColor: titleColor,
          },
          Select: {
            activeBorderColor: "#000",
            selectorBg: "#F9FAFB",
          },
        },
      }}
    >
      <div className={` ${darkMode ? "dark" : ""}`}>
        <div className="bg-bg_light dark:bg-bg_dark min-h-screen">
          <Router>
            <Navbar onToggleTheme={toggleDarkMode} isDarkTheme={darkMode} />
            <AllUserRoutes />
          </Router>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
