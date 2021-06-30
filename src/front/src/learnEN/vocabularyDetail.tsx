import React, { Component } from "react";
import { Collapse, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { VocabularyType } from "../model/vocabulary";
import "./vocabularyDetail.css";

const { Panel } = Collapse;

interface IProp {
    vocabulary: string
    panelKey: number
}

interface IState {
    vocabularyTypes: VocabularyType[],
    disableButton: boolean
}

export default class VocabularyDetail extends Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            vocabularyTypes: [{
                category: 'adv',
                transAndExamples: [{
                    translation: '测试',
                    examples: [{
                        src: "This is a test",
                        dst: "这是一个测试"
                    }]
                }]
            }],
            disableButton: false
        }
    }

    componentDidMount() {
        // update vocabularyTypes
    }

    handleAddVocabularyTypes = () => {
        this.setState({
            disableButton: true
        });
    }

    render() {
        return (
            <Row>
                <Col span={5} />
                <Col span={14}>
                    <Collapse>
                        <Panel header={this.props.vocabulary} key={this.props.panelKey}>
                            {this.state.vocabularyTypes.map((type, index) => {
                                return (
                                    <div key={index}>
                                        <div>{type.category}</div>
                                        {type.transAndExamples.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <div>{item.translation}</div>
                                                    {item.examples.map((example, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <div>{example.src}</div>
                                                                <div>{example.dst}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                            <Button block disabled={this.state.disableButton} onClick={this.handleAddVocabularyTypes}><PlusOutlined /></Button>
                        </Panel>
                    </Collapse>
                </Col>
                <Col span={5} />
            </Row>
        );
    }
}