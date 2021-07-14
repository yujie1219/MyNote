import React from "react";
import { Input, Typography } from 'antd';
import Utils from "../../share/utils";
import { MessageResponse } from "../../model/messageResponse";

const { Title } = Typography;

interface IProp {
    isFinished: boolean
}

interface IState {
    myAnswer: string,
    binary: string,
    standardAnswer: string,
}

export default class BinaryToDecimal extends React.Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);

        this.state = {
            myAnswer: '',
            binary: '',
            standardAnswer: ''
        }
    }

    componentDidMount = () => {
        this.refresh();
    }

    refresh = () => {
        const binary = this.generateBinary();
        const standardAnswer = this.getStandardAnswer(binary);

        this.setState({
            myAnswer: '',
            binary: binary,
            standardAnswer: standardAnswer
        });
    }

    getStandardAnswer = (binary: string) => {
        let temp = 0;
        for (let i = 0; i < 8; i++) {
            temp += parseInt(binary[i]) * Math.pow(2, 7 - i);
        }

        return temp.toString();
    }

    generateBinary = () => {
        let temp = '';

        for (let i = 0; i < 8; i++) {
            temp += Utils.getRandomInt(2);
        }

        return temp;
    }

    handleInputOnChange = (answer: string) => {
        this.setState({
            myAnswer: answer
        });
    }

    handleOnSubmit = (): MessageResponse => {
        const { myAnswer, standardAnswer } = this.state;
        if (myAnswer === standardAnswer) {
            return {
                message: 'Congratulations! You are right!',
                isCorrect: true
            };
        } else {
            return {
                message: 'Unfortunately! You are wrong, the correct answer is ' + standardAnswer,
                isCorrect: false
            };
        }
    }

    render() {
        return (
            <div>
                <Title level={3}>{this.state.binary} converts to decimal is</Title>
                <Input placeholder="Input your answer here" style={{ width: '50%' }} value={this.state.myAnswer}
                    onChange={(event) => this.handleInputOnChange(event.target.value.trim())} disabled={this.props.isFinished} />
            </div>
        );
    }
}