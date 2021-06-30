import React, { Component } from "react";
import { Collapse, Row, Col, Button, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { VocabularyType } from "../model/vocabulary";
import "./vocabularyDetail.css";

const { Panel } = Collapse;
const { Title, Text } = Typography;

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
                            <List
                                dataSource={this.state.vocabularyTypes}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={
                                                <div>
                                                    <Title level={4}>{item.translation}</Title>
                                                    <Text type="secondary" style={{ marginLeft: '10px' }}>{item.category}</Text>
                                                </div>
                                            }
                                        />
                                        {item.examples.map((ex, index) =>
                                            <div key={index}>
                                                <Text>{ex.src}</Text>
                                                <Text type="secondary">{ex.dst}</Text>
                                            </div>
                                        )}
                                    </List.Item>
                                )}
                            />
                            <Button block disabled={this.state.disableButton} onClick={this.handleAddVocabularyTypes}><PlusOutlined /></Button>
                        </Panel>
                    </Collapse>
                </Col>
                <Col span={5} />
            </Row>
        );
    }
}