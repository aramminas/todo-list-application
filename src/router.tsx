import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";

import { routeItems } from "@/components/Layout/routeMap";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routeItems.map((route) => (
            <Route
              key={route.path}
              index={!!route.index}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
