import React from "react";
import "./App.css";
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Reservation from "./routes/reservation";
import ErrorPage from "./routes/error-page";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact";
import Root, {loader as rootLoader, action as rootAction} from "./routes/root";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";


function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Root />,
  //     errorElement: <ErrorPage />,
  //     loader: rootLoader,
  //     action: rootAction,
  //     children: [
  //       {
  //         errorElement: <ErrorPage />,
  //         children: [
  //         { index: true, element: <Index /> },
  //         {
  //           path: "/reserve",
  //           element: <Reservation />
  //         },{
  //           path: "/contacts/:contactId",
  //           element: <Contact />,
  //           loader: contactLoader,
  //           action: contactAction
  //         },{
  //           path: "/contacts/:contactId/edit",
  //           element: <EditContact />,
  //           loader: contactLoader,
  //           action: editAction
  //         },{
  //           path: "/contacts/:contactId/destroy",
  //           action: destroyAction,
  //           errorElement: <div>Oops an error occured!!</div>
  //         },]
  //     },]
  //   },
  // ]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Root />}
        loader={rootLoader}
        action={rootAction}
        errorElement={<ErrorPage />}
      >
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Index />} />
          <Route path="/reserve" element={<Reservation />} />
          <Route
            path="contacts/:contactId"
            element={<Contact />}
            loader={contactLoader}
            action={contactAction}
          />
          <Route
            path="contacts/:contactId/edit"
            element={<EditContact />}
            loader={contactLoader}
            action={editAction}
          />
          <Route
            path="contacts/:contactId/destroy"
            action={destroyAction}
          />
        </Route>
      </Route>
    )
  );

  
  return (
    <RouterProvider router={router} />
  );
}

export default App;