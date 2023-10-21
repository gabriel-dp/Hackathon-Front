import { ThemeProvider } from "styled-components";

import { ThemeType, DefaultTheme } from "@/styles/themes";
import GlobalStyle from "@/styles/global";
import Router from "@/routes";

export default function App() {
	const theme: ThemeType = DefaultTheme;

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle theme={theme} />
			<Router />
		</ThemeProvider>
	);
}

