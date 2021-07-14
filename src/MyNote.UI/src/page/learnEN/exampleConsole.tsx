import React from "react";
import { Col, Tooltip, Button } from 'antd';
import { PlusOutlined, MinusOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

interface IProp {
    translation: string,
    index: number,
    foldExample: boolean,
    disableAdd: boolean,
    handleExampleAdd: (index: number) => void,
    handleTranslationDelete: (translation: string, index: number) => void,
    handleExampleFold: (index: number, event?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void,
    handleExampleUnfold: (index: number, event?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
}

export default class ExampleConsole extends React.Component<IProp, any> {
    render() {
        return (
            <Col span={3}>
                <Tooltip placement="topLeft" title="增加范例" arrowPointAtCenter>
                    <Button shape="circle" icon={<PlusOutlined />} style={{ border: '0px' }}
                        disabled={this.props.disableAdd}
                        onClick={() => this.props.handleExampleAdd(this.props.index)}></Button>
                </Tooltip>

                <Tooltip placement="topLeft" title="删除译文" arrowPointAtCenter>
                    <Button danger shape="circle" icon={<MinusOutlined />} style={{ border: '0px' }}
                        onClick={() => this.props.handleTranslationDelete(this.props.translation, this.props.index)}></Button>
                </Tooltip>

                <Tooltip placement="topLeft" title={this.props.foldExample ? "展开范例" : "收起范例"} arrowPointAtCenter>
                    <Button shape="circle" icon={this.props.foldExample ? <DownOutlined /> : <UpOutlined />} style={{ border: '0px' }}
                        onClick={(e) => {
                            this.props.foldExample ?
                                this.props.handleExampleUnfold(this.props.index, e) : this.props.handleExampleFold(this.props.index, e)
                        }}
                    ></Button>
                </Tooltip>
            </Col>
        );
    }
}