import React from "react";
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/Navbar";

import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import NoMatch from "./pages/NoMatch";

const httpLink = createHttpLink({
    uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' element={<SearchBooks />} />
                    <Route path='/saved' element={<SavedBooks />} />
                    <Route path='*' element={<NoMatch />} />
                </Switch>
            </Router>
        </ApolloProvider>
    );
}

export default App;
