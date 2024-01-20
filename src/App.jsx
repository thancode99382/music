// import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout.jsx";
import DefaultLayout from './layouts/Defaultlayout/DefaultLayout';
import publicRoutes from "./routes/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <Page />
                </DefaultLayout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
