import { Menu } from "antd";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import RouterConfig from "../model/routerConfig";

interface IState {
    currentkey: string;
}

class HeaderMenu extends React.Component<any, IState> {
    state = {
        currentkey: ''
    };

    componentDidMount() {
        const currentKey = this.props.location.pathname.substring(1);
        this.setState({
            currentkey: currentKey === '' ? 'cover' : currentKey
        });
    }

    handleClick = (menuInfo: any) => {
        this.setState({
            currentkey: menuInfo.key
        });
    }

    render() {
        console.log(this.props.location);

        return <Menu onClick={this.handleClick} selectedKeys={[this.state.currentkey]} mode='horizontal' theme='dark'>
            {
                this.props.routes.map((item: RouterConfig) => {
                    return item.key !== 'default' && <Menu.Item key={item.key}>
                        <Link to={item.path}>{item.title}</Link>
                    </Menu.Item>
                })
            }
        </Menu>
    }
}

export default withRouter(HeaderMenu);