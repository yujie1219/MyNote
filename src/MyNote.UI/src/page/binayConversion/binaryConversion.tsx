import { Button, Divider, Typography } from "antd";
import React, { ReactElement } from "react";
import BasicModal from "../../share/basicModal";
import Utils from "../../share/utils";
import BinaryToDecimal from "./binaryToDecimal";
import DecimalToBinary from "./decimalToBinary";

const { Title, Text } = Typography;

interface IState {
    currentStreaks: number,
    currentTotalWin: number,
    streaksUpToStandard: boolean,
    totalWinUpToStandard: boolean,
    isBinaryToDecimal: boolean,
    resultModal: ReactElement | undefined
}

export default class BinaryConversion extends React.Component<any, IState> {
    binaryToDecimalRef: BinaryToDecimal | undefined;
    decimalToBinaryRef: DecimalToBinary | undefined;

    constructor(props: any) {
        super(props);

        this.state = {
            currentStreaks: 0,
            currentTotalWin: 0,
            streaksUpToStandard: false,
            totalWinUpToStandard: false,
            isBinaryToDecimal: false,
            resultModal: undefined
        }
    }

    componentDidMount = () => {
        this.reset();
    }

    reset = () => {
        this.setState({
            currentStreaks: 0,
            currentTotalWin: 0,
            streaksUpToStandard: false,
            totalWinUpToStandard: false
        });

        this.randomChangeType();
        if (this.state.isBinaryToDecimal) {
            this.binaryToDecimalRef?.refresh();
        } else {
            this.decimalToBinaryRef?.refresh();
        }
    }

    handleOnSubmitAnswer = async () => {
        let { currentStreaks, currentTotalWin, streaksUpToStandard, totalWinUpToStandard, isBinaryToDecimal } = this.state;
        const response = isBinaryToDecimal ? this.binaryToDecimalRef?.handleOnSubmit() : this.decimalToBinaryRef?.handleOnSubmit();
        if (response && response.isCorrect) {
            currentStreaks++;
            currentTotalWin++;

            if (currentStreaks === 10) {
                streaksUpToStandard = true;
            }

            if (currentTotalWin === 30) {
                totalWinUpToStandard = true;
            }
        } else {
            currentStreaks = 0;
        }

        const callBack = () => {
            this.setState({
                currentStreaks: currentStreaks,
                currentTotalWin: currentTotalWin,
                streaksUpToStandard: streaksUpToStandard,
                totalWinUpToStandard: totalWinUpToStandard
            });

            this.randomChangeType();
            if (isBinaryToDecimal) {
                this.binaryToDecimalRef?.refresh();
            } else {
                this.decimalToBinaryRef?.refresh();
            }

            this.setState({
                resultModal: undefined
            });
        }

        this.setState({
            resultModal: (
                <BasicModal
                    title='Result'
                    content={<Text>{response?.message}</Text>}
                    visible={true}
                    handleModalOnCancel={callBack}
                    handleModalOnOk={callBack}
                />)
        });
    }

    randomChangeType = () => {
        const randonNum = Utils.getRandomInt(2);
        this.setState({
            isBinaryToDecimal: randonNum == 0 ? true : false
        });
    }

    render() {
        const SUPS = this.state.streaksUpToStandard;
        const TUPS = this.state.totalWinUpToStandard;

        return (
            <div style={{ textAlign: 'center' }}>
                <Title style={{ marginTop: '12px' }}>Binary Conversion Pratice</Title>
                <div style={{ fontSize: '16px' }}>
                    <Text type={SUPS ? 'success' : 'danger'}>Winning Streaks: {this.state.currentStreaks}/10</Text>
                    <Text style={{ marginLeft: '10px' }}>or</Text>
                    <Text type={TUPS ? 'success' : 'danger'} style={{ marginLeft: '10px' }}>Total Win: {this.state.currentTotalWin}/30</Text>
                </div>
                {(SUPS || TUPS)
                    && <Button type='primary' onClick={this.reset} style={{ marginTop: '5px', width: '60%' }}>Reset</Button>}
                <Divider style={{ marginTop: '12px' }} />

                {this.state.isBinaryToDecimal ?
                    (<BinaryToDecimal isFinished={SUPS || TUPS} ref={
                        ref => {
                            if (ref) this.binaryToDecimalRef = ref;
                        }
                    } />) :
                    (<DecimalToBinary isFinished={SUPS || TUPS} ref={
                        ref => {
                            if (ref) this.decimalToBinaryRef = ref;
                        }
                    } />)}

                <Button type='primary' style={{ marginTop: '20px', width: '25%', height: '50px' }} onClick={this.handleOnSubmitAnswer} disabled={SUPS || TUPS}>Submit</Button>
                {this.state.resultModal}
            </div>
        )
    }
}