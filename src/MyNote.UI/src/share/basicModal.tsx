import React from "react";
import { Modal } from 'antd';

interface IProp {
    title: string,
    content: JSX.Element,
    visible: boolean,
    handleModalOnCancel: () => void
    handleModalOnOk: () => void
}

export default class BasicModal extends React.Component<IProp, any> {
    render() {
        return (
            <Modal title={this.props.title} visible={this.props.visible} destroyOnClose onCancel={this.props.handleModalOnCancel} onOk={this.props.handleModalOnOk}>
                {this.props.content}
            </Modal>
        );
    }
}