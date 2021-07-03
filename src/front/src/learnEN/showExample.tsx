import React from "react";
import { Typography } from 'antd';
import { EditType, Example } from "../model/vocabulary";
import './showExample.css'

const { Text } = Typography;

interface EditConfig {
    icon: JSX.Element;
    editing: boolean;
    onChange: (value: string) => void;
    onCancel: () => void;
    onEnd: () => void;
}

interface IProp {
    example: Example
    exIndex: number,
    transIndex: number,
    srcEditable: (titleIndex: number, type: EditType, exampleIndex?: number | undefined) => EditConfig | boolean,
    dstEditable: (titleIndex: number, type: EditType, exampleIndex?: number | undefined) => EditConfig | boolean,
    srcOnClick: (titleIndex: number, type: EditType, exampleIndex?: number) => void,
    dstOnClick: (titleIndex: number, type: EditType, exampleIndex?: number) => void
}

export default class ShowExample extends React.Component<IProp, any> {

    render() {
        return (
            <div key={this.props.exIndex} className={'example-group'}
                style={{ marginTop: (this.props.exIndex !== 0) ? '10px' : '0px' }}>

                <Text className='example-src'
                    editable={this.props.srcEditable(this.props.transIndex, EditType.ExampleSrc, this.props.exIndex)}
                    onClick={() => this.props.srcOnClick(this.props.transIndex, EditType.ExampleSrc, this.props.exIndex)}>
                    {this.props.example.src}</Text>

                <div className={'example-group-marker'}></div>

                <Text className='example-dst' type="secondary"
                    editable={this.props.dstEditable(this.props.transIndex, EditType.ExampleDst, this.props.exIndex)}
                    onClick={() => this.props.dstOnClick(this.props.transIndex, EditType.ExampleDst, this.props.exIndex)}>
                    {this.props.example.dst}</Text>
            </div>
        );
    }
}