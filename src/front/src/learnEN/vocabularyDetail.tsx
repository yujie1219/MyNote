import React, { Component } from "react";
import { Collapse, Row, Col, Button, List, Typography, Tooltip, Divider } from 'antd';
import { PlusOutlined, CloseOutlined, MinusOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { EditVocabularyType, VocabularyType } from "../model/vocabulary";
import "./vocabularyDetail.css";

const { Panel } = Collapse;
const { Title, Text } = Typography;

interface IProp {
    vocabulary: string
    panelKey: number,
    handleVocabularyDelete: (vocabulary: string) => void
}

interface IState {
    vocabularyTypes: VocabularyType[],
    editVocabularyTypes: EditVocabularyType[],
    disableButton: boolean,
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
            editVocabularyTypes: [],
            disableButton: false
        }
    }

    componentDidMount() {
        // update vocabularyTypes

        const initEdit = this.state.vocabularyTypes.map(item => {
            return {
                editTranslation: false,
                editCategory: false,
                foldExample: false
            };
        });
        this.setState({
            editVocabularyTypes: [...initEdit]
        });
    }

    handleVocabularyTypesAdd = () => {
        this.setState({
            disableButton: true
        });
    }

    handleVocabularyDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.stopPropagation();
        this.props.handleVocabularyDelete(this.props.vocabulary);
    }

    handleTranslationDelete = (translation: string, index: number) => {
        if (this.state.vocabularyTypes[index].translation === translation) {
            this.state.vocabularyTypes.splice(index, 1);
            this.setState({
                vocabularyTypes: [...this.state.vocabularyTypes]
            });
        }
    }

    handleExampleFold(index: number, event: React.MouseEvent<HTMLElement, MouseEvent>) {
        this.state.editVocabularyTypes[index].foldExample = true;
        this.setState({
            editVocabularyTypes: [...this.state.editVocabularyTypes]
        });
        event.currentTarget.blur();
    }

    handleExampleUnfold(index: number, event: React.MouseEvent<HTMLElement, MouseEvent>) {
        this.state.editVocabularyTypes[index].foldExample = false;
        this.setState({
            editVocabularyTypes: [...this.state.editVocabularyTypes]
        });
        event.currentTarget.blur();
    }

    removePanelElement = () => {
        return (
            <Tooltip placement="topLeft" title="删除单词" arrowPointAtCenter>
                <Button ghost danger size="small" shape="circle" icon={<CloseOutlined />} style={{ border: '0px' }} onClick={this.handleVocabularyDelete}></Button>
            </Tooltip>
        )
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
                                                            <Title level={4}>{item.translation}</Title>
                                                            <Text type="secondary" style={{ marginLeft: '10px' }}>{item.category}</Text>
                                                        </Col>
                                                        <Col span={3}>
                                                            <Tooltip placement="topLeft" title="增加范例" arrowPointAtCenter>
                                                                <Button shape="circle" icon={<PlusOutlined />} style={{ border: '0px' }}></Button>
                                                            </Tooltip>
                                                            <Tooltip placement="topLeft" title="删除译文" arrowPointAtCenter>
                                                                <Button danger shape="circle" icon={<MinusOutlined />} style={{ border: '0px' }} onClick={() => this.handleTranslationDelete(item.translation, index)}></Button>
                                                            </Tooltip>
                                                            <Tooltip placement="topLeft" title={this.state.editVocabularyTypes[index].foldExample ? "展开范例" : "收起范例"} arrowPointAtCenter>
                                                                <Button shape="circle" icon={this.state.editVocabularyTypes[index].foldExample ? <DownOutlined /> : <UpOutlined />}
                                                                    onClick={(e) => { this.state.editVocabularyTypes[index].foldExample ? this.handleExampleUnfold(index, e) : this.handleExampleFold(index, e) }} style={{ border: '0px' }}></Button>
                                                            </Tooltip>
                                                        </Col>
                                                    </Row>
                                                }
                                            />
                                            {
                                                this.state.editVocabularyTypes[index].foldExample &&
                                                item.examples.map((ex, index) =>
                                                    <div key={index} className={'example-group'}>
                                                        <Text>{ex.src}</Text>
                                                        <div className={'example-group-marker'}></div>
                                                        <Text type="secondary">{ex.dst}</Text>
                                                    </div>
                                                )
                                            }
                                        </List.Item>
                                    )
                                }}
                            />
                            <Button block disabled={this.state.disableButton} onClick={this.handleVocabularyTypesAdd} icon={<PlusOutlined />}></Button>
                        </Panel>
                    </Collapse>
                </Col>
                <Col span={5} />
            </Row>
        );
    }
}