import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "../Pages/Contact";
import Favourite from "../Pages/Favourites";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import Specifictgif from "../Pages/SpecifictGifPage";
import PageNotFound from "../Pages/PageNotFound";

export default class Routeing extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route path="/favourite" element={<Favourite></Favourite>}></Route>
            <Route
              path="/gif/:id"
              element={<Specifictgif></Specifictgif>}
            ></Route>
            <Route path="/*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
