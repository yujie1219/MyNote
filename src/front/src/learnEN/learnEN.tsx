import { Typography, Divider } from 'antd';
import React from 'react';

const { Title } = Typography;

class LearnEN extends React.Component {
    render() {
        return (
            <div>
                <Title style={{ textAlign: 'center', marginTop: '12px' }}>English Notes</Title>
                <Divider style={{ marginTop: '12px' }} />
            </div>
        );
    }
}

export default LearnEN;