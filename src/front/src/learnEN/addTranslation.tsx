import React from "react";
import { Row, Col, Modal, Input, Typography, Select } from 'antd';
import { VocabularyType } from "../model/vocabulary";

const { Text } = Typography;
const { Option } = Select;

interface IProp {
    visible: boolean,
    handleTranslationAddCancel: () => void
    handleTranslationAddOk: (translation: VocabularyType) => void
}

interface ISate {
    translation: VocabularyType,
    showTranslationNullIssue: boolean
}

export default class AddTranslation extends React.Component<IProp, ISate> {
    constructor(props: IProp) {
        super(props);

        this.state = {
            translation: new VocabularyType(),
            showTranslationNullIssue: false
        };
    }

    handleTranslationAddOk = () => {
        const { translation } = this.state;
        if (translation.translation.length === 0) {
            this.setState({
                showTranslationNullIssue: true
            })
        } else {
            this.setState({
                showTranslationNullIssue: false
            })
            this.props.handleTranslationAddOk(translation);
        }
    }

    handleTranslationChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { translation } = this.state;
        translation.translation = event.target.value.trim();
        this.setState({
            translation: translation.clone()
        });
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
            <Modal title='Add Translation' visible={this.props.visible} destroyOnClose onCancel={this.props.handleTranslationAddCancel} onOk={this.handleTranslationAddOk}>
                <Row>
                    <Col span={5}>
                        <Text>Translation</Text>
                    </Col>
                    <Col span={19}>
                        <Input placeholder="Translation" onChange={this.handleTranslationChanged} />
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
            </Modal>
        );
    }
}