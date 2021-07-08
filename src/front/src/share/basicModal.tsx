import React from "react";
import { Modal } from 'antd';

interface IProp {
    content: JSX.Element,
    visible: boolean,
    handleTranslationAddCancel: () => void
    handleTranslationAddOk: () => void
}

export default class BasicModal extends React.Component<IProp, any> {
    render() {
        return (
            <Modal title='Add Translation' visible={this.props.visible} destroyOnClose onCancel={this.props.handleTranslationAddCancel} onOk={this.props.handleTranslationAddOk}>
                {this.props.content}
            </Modal>
        );
    }
}