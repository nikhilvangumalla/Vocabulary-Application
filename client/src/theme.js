import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: purple[500],
		},
	},
	typography: {
		fontFamily: "Kumbh Sans",
	},
});
