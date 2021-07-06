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
    tempNew: Example,
    shouldMenu: boolean,
    left?: number,
    top?: number
}

export default class ShowExample extends React.Component<IProp, IState> {
    private exampleGroup: HTMLDivElement | undefined;

    constructor(props: IProp) {
        super(props);

        const example = new Example();
        this.state = {
            editingSrc: true,
            editingDst: true,
            newExample: example,
            tempNew: example.clone(),
            shouldMenu: false
        }
    }

    componentDidMount = () => {
        document.addEventListener('contextmenu', this.listenContextMenu);
    }

    componentWillUnmount = () => {
        document.removeEventListener('contextmenu', this.listenContextMenu);
    }

    listenContextMenu = (event: MouseEvent) => {
        if (this.exampleGroup !== undefined && (event.target as HTMLElement).parentNode === this.exampleGroup) {
            event.preventDefault();

            this.setState({
                shouldMenu: true,
                left: event.clientX,
                top: event.clientY
            });

        } else {
            this.setState({
                shouldMenu: false
            });
        }
    }

    renderContentMenu = () => {
        return this.state.shouldMenu && (
            <div style={{ position: 'fixed', left: this.state.left, top: this.state.top }}>
                <ul className="example-context-menu">
                    <li>Delete Example</li>
                </ul>
            </div>
        );
    }

    getEditInstanceWhileAdd = (type: EditType) => {
        return {
            icon: <div />,
            editing: type === EditType.ExampleSrc ? this.state.editingSrc : this.state.editingDst,
            onChange: (value: string) => this.handleExampleChangeWhileAdd(value, type),
            onCancel: () => this.handleExampleCancelWhileAdd(type),
            onEnd: () => this.handleExampleEndWhileAdd(type)
        }
    }

    handleExampleEndWhileAdd = async (type?: EditType) => {
        switch (type) {
            case EditType.ExampleSrc:
                if (this.state.tempNew.src.length === 0) {
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
                if (this.state.tempNew.dst.length === 0) {
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
                if (this.state.newExample.src.length === 0) {
                    // tell the parent should cancel the add progress
                    this.props.srcEditable(this.props.transIndex, type, this.props.exIndex, this.props.addNew).onCancel();
                } else {
                    this.setState({
                        editingSrc: false
                    });
                }
                break;
            case EditType.ExampleDst:
                if (this.state.newExample.dst.length === 0) {
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
        const temp = this.state.tempNew.clone();
        switch (type) {
            case EditType.ExampleSrc:
                temp.src = value;
                break;
            case EditType.ExampleDst:
                temp.dst = value;
                break;
        }

        this.setState({
            tempNew: temp.clone()
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
            <div className={'example-group'}
                style={{ marginTop: (this.props.exIndex !== 0) ? '10px' : '0px' }}
                ref={
                    ref => {
                        if (ref) { this.exampleGroup = ref; }
                    }
                }>

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
                {this.renderContentMenu()}
            </div>
        );
    }
}