import "./App.css";
import Navbar from "./shared/Navbar";
import { Grid } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormBuild from "./pages/form-build/FormBuild";
import Subject from "./pages/subject/Subject";
import AddFieldData from "./pages/subject/AddFieldData";
import SubjectViewData from "./pages/subject/SubjectViewData";
import Home from "./pages/home/Home";
import Sidebar from "./shared/Sidebar";
import Loader from "./components/ui/Loader";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <main className="">
            <Navbar />
            <div className="container mx-auto pt-10">
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  {/* <Sidebar /> */}
                </Grid>
                <Grid item xs={12} md={9}>
                  <BrowserRouter basename="/">
                    <Routes>
                      <Route path="/">
                        <Route index element={<Home />} />
                        <Route path=":formId" element={<FormBuild />} />
                      </Route>
                      <Route path="/subject">
                        <Route index element={<Subject />} />
                        <Route path=":formId" element={<AddFieldData />} />
                        <Route
                          path="view/:formId"
                          element={<SubjectViewData />}
                        />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </Grid>
              </Grid>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
