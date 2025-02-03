import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import "./App.css";

import Navbar from "./components/User/Navbar/Navbar";
import SideMenu from "./components/Admin/SideMenu/SideMenu";
import AllUserRoutes from "./routes/AllUserRoutes";
import AllAdminRoutes from "./routes/AllAdminRoutes";

const lightTheme = {
  modalBg: "#fff",
  titleColor: "#000",
  rowHoverBg: "#F9FAFB",
  bodySortBg: "#F9FAFB",
  selectBorder: "#000",
  selectBg: "#F9FAFB",
};

const darkTheme = {
  modalBg: "#1D1F21",
  titleColor: "#fff",
  rowHoverBg: "#1D1F21",
  bodySortBg: "#1D1F21",
  selectBorder: "#fff",
  selectBg: "#1D1F21",
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [themeColors, setThemeColors] = useState(lightTheme);
  const userRole = useSelector((state) => state.auth.userRole);

  useEffect(() => {
    const savedMode = localStorage.getItem("displayMode") || "light";
    setDarkMode(savedMode === "dark");
    setThemeColors(savedMode === "dark" ? darkTheme : lightTheme);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    setThemeColors(newMode ? darkTheme : lightTheme);
    localStorage.setItem("displayMode", newMode ? "dark" : "light");
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: themeColors.modalBg,
            headerBg: themeColors.modalBg,
            titleColor: themeColors.titleColor,
          },
          Select: {
            activeBorderColor: themeColors.selectBorder,
            selectorBg: themeColors.selectBg,
          },
          Table: {
            rowHoverBg: themeColors.rowHoverBg,
            bodySortBg: themeColors.bodySortBg,
          },
        },
      }}
    >
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="bg-bg_light dark:bg-bg_dark min-h-screen">
          {userRole === "admin" ? (
            <Router>
              <div className="flex w-screen relative min-h-screen">
                <div className="dark:bg-secondary-light bg-secondary-dark">
                  <SideMenu
                    onToggleTheme={toggleDarkMode}
                    isDarkTheme={darkMode}
                  />
                </div>
                <AllAdminRoutes />
              </div>
            </Router>
          ) : (
            <Router>
              <Navbar onToggleTheme={toggleDarkMode} isDarkTheme={darkMode} />
              <AllUserRoutes />
            </Router>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
