import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import { FC } from "react";
import Main from "../pages/Main";
import theme from "../styles/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ "*": { padding: 0, margin: 0 } }} />
      <Main />
    </ThemeProvider>
  );
};

export default App;
