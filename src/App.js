import "./main.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import StudentForm from "./components/StudentForm";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/students", element: <Home /> },
      { path: "/students/add", element: <StudentForm /> },
      { path: "/students/edit/:id", element: <StudentForm /> },
    ],
  },
]);

const App = () => {
  return (
    // <div className="app-container">
    //   <h1>Student Management</h1>
    //   <StudentList />
    // </div>
    <RouterProvider router={router} />
  );
};

export default App;
