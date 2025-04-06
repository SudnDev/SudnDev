import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { lazy } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";

const MainPage = lazy(() => import("./pages/MainPage"));

function App() {
  return (
      <Router>
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </I18nextProvider>
      </Router>
  )
}

export default App
