import React, {Component} from 'react';
import { Layout} from 'antd';

const { Footer } = Layout;

class Foot extends Component{
    render() {
        return (
            <Layout>
                <Footer>
                <p>work as</p>
                </Footer>
            </Layout>
        );
    }
}
export default Foot