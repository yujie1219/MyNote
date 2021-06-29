import { Typography, Divider, Row, Col, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { ChangeEvent } from 'react';
import VocabularyDetail from './vocabularyDetail';

const { Title } = Typography;

interface IState {
    searching: string,
    restoredList: Array<string>
    filterList: Array<string>
}

export default class LearnEN extends React.Component<any, IState> {
    constructor(prop: any) {
        super(prop);
        this.state = {
            searching: '',
            restoredList: [],
            filterList: []
        };
    }

    componentDidMount() {
        // async init state
    }

    componentDidUpdate(prevProps: any, prevState: IState) {
        if (prevState.searching !== this.state.searching) {
            // do search
            this.refreshFilterList(this.state.searching);
        }
    }

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.updateSearching(e.target.value.trim());
    }

    debounce = (fn: Function, delay: number = 500) => {
        let timer: NodeJS.Timeout | null = null;
        return (...args: string[]) => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        }
    }

    updateSearching = this.debounce((searching: string) => {
        this.setState({
            searching: searching
        });
    });

    // This syntax ensures that the 'this' in method has been bound
    handleVocabularyAdd = async () => {
        await this.delay();
        if (!(this.state.restoredList.includes(this.state.searching))) {
            // update the vocabulary
            this.setState({
                restoredList: [...this.state.restoredList, this.state.searching]
            });

            this.refreshFilterList(this.state.searching);
        }
    }

    refreshFilterList = (searching: string) => {
        var searchResult = searching == '' ? this.state.restoredList : this.state.restoredList.filter(item => item.toLowerCase().includes(this.state.searching.toLowerCase()));

        this.setState({
            filterList: searchResult
        });
    }

    delay = async (delay: number = 500) => {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    render() {
        return (
            <div>
                <Title style={{ textAlign: 'center', marginTop: '12px' }}>English Notes</Title>
                <Divider style={{ marginTop: '12px' }} />
                <Row>
                    <Col span={4} />
                    <Col span={12}>
                        <Input size="large" placeholder="Vocabulary or Sentence" style={{ borderRadius: '10px' }} allowClear onChange={this.handleSearchChange} />
                    </Col>
                    <Col span={4}>
                        <Button size="large" type="primary" style={{ marginLeft: '5px' }} onClick={this.handleVocabularyAdd}><PlusOutlined /></Button>
                    </Col>
                    <Col span={4} />
                </Row>
                {this.state.filterList.map(item => <VocabularyDetail vocabulary={item} key={item}></VocabularyDetail>)}
            </div>
        );
    }
}