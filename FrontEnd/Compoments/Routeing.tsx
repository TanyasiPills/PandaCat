import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Favourite from "../Pages/Favourites";
import Layout from "../Pages/Layout";
import PageNotFound from "../Pages/PageNotFound";
import StillLoadingPage from "../Pages/StillLoadingPage";
// Lazy loading Home component with a delay
//IN PRODUCTION REMOVE Wait function
const Home = lazy(() => import("../Pages/Home"));
const Contact = lazy(() => import("../Pages/Contact"));
const SpecifictGifPage = lazy(() => import("../Pages/SpecifictGifPage"));

export default function Routeing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<StillLoadingPage />}>
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="/contact"
            element={
              <Suspense fallback={<StillLoadingPage />}>
                <Contact />
              </Suspense>
            }
          ></Route>
          <Route path="/favourite" element={<Favourite />}></Route>
          <Route
            path="/gif/:id"
            element={
              <Suspense fallback={<StillLoadingPage />}>
                <SpecifictGifPage/>
              </Suspense>
            }
          ></Route>
          <Route path="/favourites" element={<Favourite />}></Route>
          <Route path="/*" element={<PageNotFound/>}></Route>
          {/*<Route path="/StillLoading" element={<StillLoadingPage />}></Route>*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Utility function to wait for a specified time for testing
function Wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
