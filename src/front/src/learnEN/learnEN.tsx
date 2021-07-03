import { Typography, Divider, Row, Col, Button, Input, Space } from 'antd';
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

    // This syntax ensures that the 'this' in method has been bound
    handleVocabularyAdd = async () => {
        await this.delay();
        const lowerSearching = this.state.searching;
        if (!(this.state.restoredList.includes(lowerSearching))) {
            // update the vocabulary
            this.setState({
                restoredList: [...this.state.restoredList, lowerSearching]
            });

            this.refreshFilterList(lowerSearching);
        }
    }

    handleVocabularyDelete = (vocabulary: string) => {
        const index = this.state.restoredList.indexOf(vocabulary);
        if (index > -1) {
            this.state.restoredList.splice(index, 1);
            this.setState({
                restoredList: [...this.state.restoredList]
            })
            this.refreshFilterList(this.state.searching);
        }
    }

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.updateSearching(e.target.value.toLowerCase().trim());
    }

    refreshFilterList = (searching: string) => {
        const searchResult = searching === '' ? this.state.restoredList : this.state.restoredList.filter(item => item.toLowerCase().includes(searching));

        this.setState({
            filterList: [...searchResult]
        });
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

    delay = async (delay: number = 500) => {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    render() {
        return (
            <div>
                <Title style={{ textAlign: 'center', marginTop: '12px' }}>English Notes</Title>
                <Divider style={{ marginTop: '12px' }} />
                <Row>
                    <Col span={5} />
                    <Col span={13}>
                        <Input size="large" placeholder="Vocabulary or Sentence" style={{ borderRadius: '10px' }} allowClear onChange={this.handleSearchChange} />
                    </Col>
                    <Col span={1}>
                        <Button size="large" type="primary" style={{ marginLeft: '5px' }} onClick={this.handleVocabularyAdd} icon={<PlusOutlined />}></Button>
                    </Col>
                    <Col span={5} />
                </Row>
                <Space direction="vertical" style={{ width: '100%', marginTop: '10px' }}>
                    {this.state.filterList.map((item, index) => <VocabularyDetail handleVocabularyDelete={this.handleVocabularyDelete} vocabulary={item} panelKey={index} key={index}></VocabularyDetail>)}
                </Space>
            </div>
        );
    }
}