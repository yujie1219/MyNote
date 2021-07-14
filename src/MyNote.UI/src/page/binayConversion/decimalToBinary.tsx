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
    number: string,
}

export default class DecimalToBinary extends React.Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);

        this.state = {
            myAnswer: '',
            number: '',
        }
    }

    componentDidMount = () => {
        this.refresh();
    }

    refresh = () => {
        const number = this.generateNumber();

        this.setState({
            myAnswer: '',
            number: number
        });
    }

    checkAnswer = (answer: string) => {
        let temp = 0;
        const length = answer.length;
        for (let i = 0; i < length; i++) {
            temp += parseInt(answer[i]) * Math.pow(2, length - 1 - i);
        }

        return temp.toString();
    }

    generateNumber = () => {
        return Utils.getRandomInt(256).toString();
    }

    handleInputOnChange = (answer: string) => {
        this.setState({
            myAnswer: answer
        });
    }

    handleOnSubmit = (): MessageResponse => {
        const { number, myAnswer } = this.state;
        const standardAnswer = this.checkAnswer(myAnswer);
        if (number === standardAnswer) {
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
                <Title level={3}>{this.state.number} converts to binary is</Title>
                <Input placeholder="Input your answer here" style={{ width: '50%' }} value={this.state.myAnswer}
                    onChange={(event) => this.handleInputOnChange(event.target.value.trim())} disabled={this.props.isFinished} />
            </div>
        );
    }
}