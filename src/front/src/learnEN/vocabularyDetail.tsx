import React, { Component } from "react";

interface IProp {
    vocabulary: string
}

export default class VocabularyDetail extends Component<IProp, any> {
    constructor(props: IProp) {
        super(props);
    }

    render() {
        return <p>{this.props.vocabulary} details</p>
    }
}