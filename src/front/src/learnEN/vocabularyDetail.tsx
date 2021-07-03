import React, { Component } from "react";
import { Collapse, Row, Col, Button, List, Typography, Tooltip } from 'antd';
import { PlusOutlined, CloseOutlined, MinusOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { EditType, EditVocabularyType, VocabularyType } from "../model/vocabulary";
import "./vocabularyDetail.css";
import ShowExample from "./showExample";
import ExampleConsole from "./exampleConsole";

const { Panel } = Collapse;
const { Title, Text } = Typography;

interface IProp {
    vocabulary: string
    panelKey: number,
    handleVocabularyDelete: (vocabulary: string) => void
}

interface IState {
    vocabularyTypes: VocabularyType[],
    tempVocabularyTypes: VocabularyType[],
    editVocabularyTypes: EditVocabularyType[],
    disableAddExamples: boolean[],
    disableAddVocabulary: boolean
}

export default class VocabularyDetail extends Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            vocabularyTypes: [{
                category: 'adv',
                translation: '测试',
                examples: [{
                    src: "This is a test",
                    dst: "这是一个测试"
                }]
            }, {
                category: 'adv',
                translation: '测试2',
                examples: [{
                    src: "This is another test",
                    dst: "这是另一个测试"
                }, {
                    src: "This is another test",
                    dst: "这是另一个测试"
                }]
            }],
            tempVocabularyTypes: [],
            editVocabularyTypes: [],
            disableAddExamples: [],
            disableAddVocabulary: false
        }
    }

    componentDidMount() {
        // update vocabularyTypes

        const initEdit = this.state.vocabularyTypes.map(item => {
            return {
                editTranslation: false,
                editCategory: false,
                editExamples: item.examples.map(example => {
                    return {
                        editSrc: false,
                        editDst: false
                    }
                }),
                foldExample: true
            };
        });
        const initDisable = this.state.vocabularyTypes.map(item => {
            return false;
        })
        this.setState({
            tempVocabularyTypes: [...this.state.vocabularyTypes],
            editVocabularyTypes: [...initEdit],
            disableAddExamples: [...initDisable]
        });
    }

    handleVocabularyTypesAdd = () => {
        this.setState({
            disableAddVocabulary: true
        });
    }

    handleVocabularyDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.stopPropagation();
        this.props.handleVocabularyDelete(this.props.vocabulary);
    }

    handleExampleAdd = (index: number) => {
        this.state.disableAddExamples[index] = true;
        this.setState({
            disableAddExamples: [...this.state.disableAddExamples]
        });

        this.handleExampleUnfold(index);
    }

    handleTranslationDelete = (translation: string, index: number) => {
        if (this.state.vocabularyTypes[index].translation === translation) {
            this.state.vocabularyTypes.splice(index, 1);
            this.state.tempVocabularyTypes.splice(index, 1);
            this.state.editVocabularyTypes.splice(index, 1);
            this.setState({
                vocabularyTypes: [...this.state.vocabularyTypes],
                tempVocabularyTypes: [...this.state.tempVocabularyTypes],
                editVocabularyTypes: [...this.state.editVocabularyTypes]
            });
        }
    }

    handleExampleFold = (index: number, event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.state.editVocabularyTypes[index].foldExample = true;
        this.setState({
            editVocabularyTypes: [...this.state.editVocabularyTypes]
        });

        if (event) {
            event.currentTarget.blur();
        }
    }

    handleExampleUnfold = (index: number, event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.state.editVocabularyTypes[index].foldExample = false;
        this.setState({
            editVocabularyTypes: [...this.state.editVocabularyTypes]
        });

        if (event) {
            event.currentTarget.blur();
        }
    }

    handleContentEdit = (titleIndex: number, type: EditType, exampleIndex: number = 0) => {
        switch (type) {
            case EditType.Translation:
                this.state.editVocabularyTypes[titleIndex].editTranslation = true;
                break;
            case EditType.Category:
                this.state.editVocabularyTypes[titleIndex].editCategory = true;
                break;
            case EditType.ExampleSrc:
                this.state.editVocabularyTypes[titleIndex].editExamples[exampleIndex].editSrc = true;
                break;
            case EditType.ExampleDst:
                this.state.editVocabularyTypes[titleIndex].editExamples[exampleIndex].editDst = true;
                break;
        }

        this.setState({
            editVocabularyTypes: [...this.state.editVocabularyTypes]
        });
    }

    handleContentChange = (value: string, titleIndex: number, type: EditType, exampleIndex: number = 0) => {
        if (value.length > 0) {
            switch (type) {
                case EditType.Translation:
                    this.state.tempVocabularyTypes[titleIndex].translation = value;
                    break;
                case EditType.Category:
                    this.state.tempVocabularyTypes[titleIndex].category = value;
                    break;
                case EditType.ExampleSrc:
                    this.state.tempVocabularyTypes[titleIndex].examples[exampleIndex].src = value;
                    break;
                case EditType.ExampleDst:
                    this.state.tempVocabularyTypes[titleIndex].examples[exampleIndex].dst = value;
                    break;
            }

            this.setState({
                tempVocabularyTypes: [...this.state.tempVocabularyTypes]
            });
        }
    }

    handelContentEditCancel = (titleIndex: number, type: EditType, exampleIndex: number = 0) => {
        switch (type) {
            case EditType.Translation:
                this.state.editVocabularyTypes[titleIndex].editTranslation = false;
                break;
            case EditType.Category:
                this.state.editVocabularyTypes[titleIndex].editCategory = false;
                break;
            case EditType.ExampleSrc:
                this.state.editVocabularyTypes[titleIndex].editExamples[exampleIndex].editSrc = false;
                break;
            case EditType.ExampleDst:
                this.state.editVocabularyTypes[titleIndex].editExamples[exampleIndex].editDst = false;
                break;
        }

        this.setState({
            editVocabularyTypes: [...this.state.editVocabularyTypes]
        });
    }

    handelContentEditEnd = (titleIndex: number, type: EditType, exampleIndex: number = 0) => {
        switch (type) {
            case EditType.Translation:
                this.state.editVocabularyTypes[titleIndex].editTranslation = false;
                // update the this.state.vocabularyTypes[titleIndex].translation in backend also
                break;
            case EditType.Category:
                this.state.editVocabularyTypes[titleIndex].editCategory = false;
                // update the this.state.vocabularyTypes[titleIndex].category in backend also
                break;
            case EditType.ExampleSrc:
                this.state.editVocabularyTypes[titleIndex].editExamples[exampleIndex].editSrc = false;
                // update the this.state.tempVocabularyTypes[titleIndex].examples[exampleIndex].src in backend also
                break;
            case EditType.ExampleDst:
                this.state.editVocabularyTypes[titleIndex].editExamples[exampleIndex].editDst = false;
                // update the this.state.tempVocabularyTypes[titleIndex].examples[exampleIndex].dst in backend also
                break;
        }

        this.setState({
            vocabularyTypes: [...this.state.tempVocabularyTypes],
            editVocabularyTypes: [...this.state.editVocabularyTypes]
        });
    }

    getVocabularyTypesKey(titleIndex: number, type: EditType, exampleIndex: number = 0) {
        switch (type) {
            case EditType.Translation:
                return this.state.editVocabularyTypes[titleIndex].editTranslation;
            case EditType.Category:
                return this.state.editVocabularyTypes[titleIndex].editCategory;
            case EditType.ExampleSrc:
                return this.state.editVocabularyTypes[titleIndex].editExamples[exampleIndex].editSrc;
            case EditType.ExampleDst:
                return this.state.editVocabularyTypes[titleIndex].editExamples[exampleIndex].editDst;
        }
    }

    removePanelElement = () => {
        return (
            <Tooltip placement="topLeft" title="删除单词" arrowPointAtCenter>
                <Button ghost danger size="small" shape="circle" icon={<CloseOutlined />} style={{ border: '0px' }} onClick={this.handleVocabularyDelete}></Button>
            </Tooltip>
        )
    }

    getEditableInstance = (titleIndex: number, type: EditType, exampleIndex?: number) => {
        return {
            icon: <div />,
            editing: this.getVocabularyTypesKey(titleIndex, type, exampleIndex),
            onChange: (value: string) => this.handleContentChange(value.trim(), titleIndex, type, exampleIndex),
            onCancel: () => this.handelContentEditCancel(titleIndex, type, exampleIndex),
            onEnd: () => this.handelContentEditEnd(titleIndex, type, exampleIndex)
        }
    }

    render() {
        return (
            <Row>
                <Col span={5} />
                <Col span={14}>
                    <Collapse>
                        <Panel header={this.props.vocabulary} key={this.props.panelKey} extra={this.removePanelElement()}>
                            <List
                                dataSource={this.state.vocabularyTypes}
                                renderItem={(item, index) => {
                                    return (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={
                                                    <Row>
                                                        <Col span={21}>
                                                            <Title className={'translation-title'} level={4}
                                                                editable={this.getEditableInstance(index, EditType.Translation)}
                                                                onClick={() => this.handleContentEdit(index, EditType.Translation)}>{item.translation}</Title>

                                                            <Text className={'translation-category'} type="secondary"
                                                                editable={this.getEditableInstance(index, EditType.Category)}
                                                                onClick={() => this.handleContentEdit(index, EditType.Category)}>{item.category}</Text>
                                                        </Col>
                                                        <ExampleConsole translation={item.translation} index={index}
                                                            foldExample={this.state.editVocabularyTypes[index].foldExample}
                                                            disableAdd={this.state.disableAddExamples[index]}
                                                            handleExampleAdd={this.handleExampleAdd}
                                                            handleTranslationDelete={this.handleTranslationDelete}
                                                            handleExampleFold={this.handleExampleFold}
                                                            handleExampleUnfold={this.handleExampleUnfold} />
                                                    </Row>
                                                }
                                            />
                                            {
                                                !this.state.editVocabularyTypes[index].foldExample &&
                                                item.examples.map((ex, exIndex) =>
                                                    <ShowExample example={ex} exIndex={exIndex} transIndex={index}
                                                        srcEditable={this.getEditableInstance}
                                                        dstEditable={this.getEditableInstance}
                                                        srcOnClick={this.handleContentEdit}
                                                        dstOnClick={this.handleContentEdit} />
                                                )
                                            }
                                        </List.Item>
                                    )
                                }}
                            />
                            <Button block disabled={this.state.disableAddVocabulary} onClick={this.handleVocabularyTypesAdd} icon={<PlusOutlined />}></Button>
                        </Panel>
                    </Collapse>
                </Col>
                <Col span={5} />
            </Row >
        );
    }
}