import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LearnEN from "./page/learnEN/learnEN";
import BinaryConversion from "./page/binayConversion/binaryConversion";
import RouterConfig from "./model/routerConfig";
import HeaderMenu from "./share/headMenu";

const routes: RouterConfig[] = [
    {
        key: "cover",
        title: "Cover",
        path: "/cover",
        exact: false,
        main: () => <h1>My Note</h1>
    }, {
        key: "learnEN",
        title: "EN Note",
        path: "/learnEN",
        exact: false,
        main: () => <LearnEN />
    }, {
        key: "binaryConversion",
        title: "Binary Conversion",
        path: "/binaryConversion",
        exact: false,
        main: () => <BinaryConversion />
    }, {
        key: "default",
        title: "default",
        path: "/",
        exact: true,
        main: () => <Redirect to="/cover" />
    }
];

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <HeaderMenu routes={routes} />

                <Switch>
                    {
                        routes.map(item => {
                            return <Route path={item.path}
                                key={item.key}
                                exact={item.exact}
                                //children={<item.main />}
                                component={item.main} />
                        })
                    }
                </Switch>
            </BrowserRouter>
        );
    }
}