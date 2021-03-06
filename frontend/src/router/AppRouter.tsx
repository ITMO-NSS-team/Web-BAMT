import { lazy } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import RestorePasswordForm from "../components/forms/auth/RestorePasswordForm";
import SigninForm from "../components/forms/auth/SigninForm";
import SignupForm from "../components/forms/auth/SignupForm";
import { useAppSelector } from "../hooks/redux";

import ExperimentPage from "../pages/experiment/ExperimentPage";
import ModelPage from "../pages/model/ModelPage";
import SamplePage from "../pages/sample/SamplePage";
import { AppRoutes } from "./routes";

// TODO: add lazy loading for pages
const SigninPage = lazy(() => import("../pages/signin/SigninPage"));

const AppOutlet = lazy(() => import("../components/outlets/app/AppOutlet"));
const HomePage = lazy(() => import("../pages/home/HomePage"));

const ModelOutlet = lazy(
  () => import("../components/outlets/model/ModelOutlet")
);

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <SigninPage />,
    children: [
      { index: true, element: <Navigate to={AppRoutes.SIGNIN} /> },
      { path: AppRoutes.SIGNIN, element: <SigninForm /> },
      { path: AppRoutes.SIGNUP, element: <SignupForm /> },
      { path: AppRoutes.RESTORE_PASSWORD, element: <RestorePasswordForm /> },
      { path: "*", element: <Navigate to={AppRoutes.SIGNIN} /> },
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AppOutlet />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: AppRoutes.MODEL,
        element: <ModelOutlet />,
        children: [
          { index: true, element: <ModelPage /> },
          { path: AppRoutes.EXPERIMENT, element: <ExperimentPage /> },
          { path: AppRoutes.SAMPLE, element: <SamplePage /> },
          { path: "*", element: <Navigate to="" /> },
        ],
      },
      { path: "*", element: <Navigate to={AppRoutes.HOME} /> },
    ],
  },
];

const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return useRoutes(isAuth ? privateRoutes : publicRoutes);
};

export default AppRouter;
