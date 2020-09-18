import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Home } from "./sections/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

const client = new ApolloClient({
	uri: "http://localhost:9000/api",
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Home />
			</ThemeProvider>
		</React.StrictMode>
	</ApolloProvider>,
	document.getElementById("root")
);
