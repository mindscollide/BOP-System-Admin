import { Route, Routes, useMatch } from "react-router-dom";
import React from "react";
const CustomRoutes = ({ RoutingData }) => {
  const route = useMatch();
  const path = route.path;

  return (
    <Routes>
      {RoutingData ? (
        <>
          <Route exact path={`${path}`} component={RoutingData[0].component} />
          {RoutingData.map((item, index) => (
            <Route
              key={index}
              path={`${path}/${item.path}`}
              component={item.component}
            />
          ))}
        </>
      ) : (
        console.log("Null")
      )}
    </Routes>
  );
};
export default CustomRoutes;
