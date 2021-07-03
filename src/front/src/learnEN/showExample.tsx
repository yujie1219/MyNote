import React from "react";
import { Typography } from 'antd';
import { EditType, Example } from "../model/vocabulary";
import './showExample.css'

const { Text } = Typography;

interface EditConfig {
    icon: JSX.Element;
    editing: boolean;
    onChange?: (value: string, type?: EditType) => void;
    onCancel: (type?: EditType) => void;
    onEnd: (type?: EditType) => void;
}

interface IProp {
    example: Example
    exIndex: number,
    transIndex: number,
    srcEditable: (titleIndex: number, type: EditType, exampleIndex?: number | undefined, addNew?: boolean, value?: Example) => EditConfig,
    dstEditable: (titleIndex: number, type: EditType, exampleIndex?: number | undefined, addNew?: boolean, value?: Example) => EditConfig,
    srcOnClick: (titleIndex: number, type: EditType, exampleIndFex?: number) => void | undefined,
    dstOnClick: (titleIndex: number, type: EditType, exampleIndex?: number) => void | undefined,
    addNew?: boolean
}

interface IState {
    editingSrc: boolean,
    editingDst: boolean,
    newExample: Example,
    tempNew: Example
}

export default class ShowExample extends React.Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);

        const example = new Example();
        this.state = {
            editingSrc: true,
            editingDst: true,
            newExample: example,
            tempNew: example.clone()
        }
    }

    getEditInstanceWhileAdd = (type: EditType) => {
        return {
            icon: <div />,
            editing: type == EditType.ExampleSrc ? this.state.editingSrc : this.state.editingDst,
            onChange: (value: string) => this.handleExampleChangeWhileAdd(value, type),
            onCancel: () => this.handleExampleCancelWhileAdd(type),
            onEnd: () => this.handleExampleEndWhileAdd(type)
        }
    }

    handleExampleEndWhileAdd = async (type?: EditType) => {
        switch (type) {
            case EditType.ExampleSrc:
                if (this.state.tempNew.src.length == 0) {
                    this.handleExampleCancelWhileAdd(type);
                } else {
                    await this.setState({
                        newExample: this.state.tempNew.clone(),
                        editingSrc: false
                    });

                    if (!this.state.editingDst) {
                        // tell the parent to end the add progress
                        this.props.srcEditable(this.props.transIndex, type,
                            this.props.exIndex, this.props.addNew, this.state.newExample).onEnd();
                    }
                }
                break;
            case EditType.ExampleDst:
                if (this.state.tempNew.dst.length == 0) {
                    this.handleExampleCancelWhileAdd(type);
                } else {
                    await this.setState({
                        newExample: this.state.tempNew.clone(),
                        editingDst: false
                    });

                    if (!this.state.editingSrc) {
                        // tell the parent to end the add progress
                        this.props.dstEditable(this.props.transIndex, type,
                            this.props.exIndex, this.props.addNew, this.state.newExample).onEnd();
                    }
                }
                break;
        }
    }

    handleExampleCancelWhileAdd = (type?: EditType) => {
        switch (type) {
            case EditType.ExampleSrc:
                if (this.state.newExample.src.length == 0) {
                    // tell the parent should cancel the add progress
                    this.props.srcEditable(this.props.transIndex, type, this.props.exIndex, this.props.addNew).onCancel();
                } else {
                    this.setState({
                        editingSrc: false
                    });
                }
                break;
            case EditType.ExampleDst:
                if (this.state.newExample.dst.length == 0) {
                    // tell the parent should cancel the add progress
                    this.props.dstEditable(this.props.transIndex, type, this.props.exIndex, this.props.addNew).onCancel();
                } else {
                    this.setState({
                        editingDst: false
                    });
                }
        }
    }

    handleExampleChangeWhileAdd = (value: string, type?: EditType) => {
        switch (type) {
            case EditType.ExampleSrc:
                this.state.tempNew.src = value;
                break;
            case EditType.ExampleDst:
                this.state.tempNew.dst = value;
                break;
        }

        this.setState({
            tempNew: this.state.tempNew.clone()
        })
    }

    handleExampleOnClickWhileAdd(type: EditType) {
        switch (type) {
            case EditType.ExampleSrc:
                this.setState({
                    editingSrc: true
                })
                break;
            case EditType.ExampleDst:
                this.setState({
                    editingDst: true
                })
                break;
        }
    }

    render() {
        const addNew = this.props.addNew;
        return (
            <div key={this.props.exIndex} className={'example-group'}
                style={{ marginTop: (this.props.exIndex !== 0) ? '10px' : '0px' }}>

                <Text className='example-src'
                    editable={addNew ? this.getEditInstanceWhileAdd(EditType.ExampleSrc) :
                        this.props.srcEditable(this.props.transIndex, EditType.ExampleSrc, this.props.exIndex)}
                    onClick={() => addNew ? this.handleExampleOnClickWhileAdd(EditType.ExampleSrc) :
                        this.props.srcOnClick(this.props.transIndex, EditType.ExampleSrc, this.props.exIndex)}>
                    {addNew ? this.state.newExample.src : this.props.example.src}</Text>

                <div className={'example-group-marker'}></div>

                <Text className='example-dst' type="secondary"
                    editable={addNew ? this.getEditInstanceWhileAdd(EditType.ExampleDst) :
                        this.props.dstEditable(this.props.transIndex, EditType.ExampleDst, this.props.exIndex)}
                    onClick={() => addNew ? this.handleExampleOnClickWhileAdd(EditType.ExampleDst) :
                        this.props.dstOnClick(this.props.transIndex, EditType.ExampleDst, this.props.exIndex)}>
                    {addNew ? this.state.newExample.dst : this.props.example.dst}</Text>
            </div>
        );
    }
}