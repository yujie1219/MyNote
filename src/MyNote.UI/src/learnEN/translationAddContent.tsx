import React from "react";
import { Row, Col, Input, Typography, Select } from 'antd';
import { VocabularyType } from "../model/vocabulary";

const { Text } = Typography;
const { Option } = Select;

interface ISate {
    translation: VocabularyType,
    showTranslationNullIssue: boolean
}

export default class TranslationAddContent extends React.Component<any, ISate> {
    constructor(props: any) {
        super(props);

        this.state = {
            translation: new VocabularyType(),
            showTranslationNullIssue: false
        };
    }

    public handleTranslationAddOk = () => {
        const { translation } = this.state;
        if (translation.translation.length === 0) {
            this.setState({
                showTranslationNullIssue: true
            });

            return undefined;
        } else {
            this.setState({
                showTranslationNullIssue: false
            });
            return translation;
        }
    }

    handleTranslationChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { translation } = this.state;
        translation.translation = event.target.value.trim();
        if (translation.translation.length === 0) {
            this.setState({
                showTranslationNullIssue: true
            });
        } else {
            this.setState({
                translation: translation.clone(),
                showTranslationNullIssue: false
            });
        }
    }

    handleCategoryChanged = (value: string) => {
        const { translation } = this.state;
        translation.category = value;
        this.setState({
            translation: translation.clone()
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={5}>
                        <Text>Translation</Text>
                    </Col>
                    <Col span={19}>
                        <Input placeholder="Translation" onChange={this.handleTranslationChanged} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '5px' }} hidden={!this.state.showTranslationNullIssue}>
                    <Col span={24}>
                        <Text type='danger'>The Translation should not be null!</Text>
                    </Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col span={5}>
                        <Text>Category</Text>
                    </Col>
                    <Col span={19}>
                        <Select placeholder="Translation" defaultValue='n.' style={{ width: '100%' }} onChange={(value: string) => this.handleCategoryChanged(value)}>
                            <Option value='n.'>Noun</Option>
                            <Option value='v.'>Verb</Option>
                            <Option value='adj.'>Adjective</Option>
                            <Option value='adv.'>Adverb</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
        );
    }
}