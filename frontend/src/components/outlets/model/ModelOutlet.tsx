import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { setModel } from "../../../redux/model/model";
import { AppRoutes } from "../../../router/routes";
import { createModelTheme } from "../../../utils/theme";

const ModelOutlet = () => {
  const { model } = useParams();
  const dispatch = useAppDispatch();

  if (model !== "geological" && model !== "social") {
    return <Navigate to={AppRoutes.HOME} replace />;
  } else {
    dispatch(setModel(model));
    return (
      <ThemeProvider theme={createModelTheme(model)}>
        <Outlet />
      </ThemeProvider>
    );
  }
};

export default ModelOutlet;
