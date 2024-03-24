import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import { publicRoutes } from "./routes";
import { DefaultLayout } from "~/layouts";
import { AuthProvider } from "./shared/AuthProvider";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.Layout) {
              Layout = route.Layout;
            } else if (route.Layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthProvider>
                    <Layout>
                      <Page />
                    </Layout>
                  </AuthProvider>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
