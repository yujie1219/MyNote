import React, { Component } from "react";
import { Collapse } from 'antd';
import { VocabularyType } from "../model/vocabulary";

const { Panel } = Collapse;

interface IProp {
    vocabulary: string
    panelKey: number
}

interface IState {
    vocabularyTypes: VocabularyType[]
}

export default class VocabularyDetail extends Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            vocabularyTypes: []
        }
    }

    componentDidMount() {
        // update vocabularyTypes
    }

    render() {
        return (
            <Collapse style={{ width: '60%', margin: '10px auto 0px auto' }}>
                <Panel style={{ marginTop: '10px' }} header={this.props.vocabulary} key={this.props.panelKey} >
                    <p>test</p>
                </Panel>
            </Collapse>
        );
    }
}