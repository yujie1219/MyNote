import { Menu } from "antd";
import React from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import LearnEN from "./learnEN/learnEN";
import RouterConfig from "./model/routerConfig";

interface IState {
    currentkey: string;
}

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
        key: "default",
        title: "default",
        path: "/",
        exact: true,
        main: () => <Redirect to="/cover" />
    }
];

export default class Router extends React.Component<any, IState> {
    state = {
        currentkey: 'cover'
    };

    handleClick = (menuInfo: any) => {
        this.setState({
            currentkey: menuInfo.key
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.currentkey]} mode='horizontal' theme='dark'>
                    {
                        routes.map(item => {
                            return item.key !== 'default' && <Menu.Item key={item.key}>
                                <Link to={item.path}>{item.title}</Link>
                            </Menu.Item>
                        })
                    }
                </Menu>

                <Switch>
                    {
                        routes.map(item => {
                            return <Route path={item.path}
                                key={item.key}
                                exact={item.exact}
                                children={<item.main />} />
                        })
                    }
                </Switch>
            </BrowserRouter>
        );
    }
}