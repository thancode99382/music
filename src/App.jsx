import { useState, useEffect } from 'react';
import DefaultLayout from './layouts/Defaultlayout/DefaultLayout';
import publicRoutes from "./routes/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLoader from './components/AppLoader';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  // Define basename for Router based on deployment environment
  // For Vercel deployments, we don't need a special basename
  const basename = '/';

  return (
    <Router basename={basename}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Router>
  );
}

export default App;
