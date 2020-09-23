import React, {Component} from 'react';
import { Input } from 'antd';

const { Search } = Input;
class SearchInfo extends Component {
    constructor() {
        super();
        this.state = {
            chosen: undefined,
        }
    }

    onChangeText = (value) => {
        this.setState({
            chosen: value
        })
        this.onSendText();
    }

    onSendText = () => {
        this.props.startSearch(this.state);
    }

    render() {
        return(
            <div className="search-box">
                <Search 
                    placeholder="Enter your interested places"
                    enterButton="Search"
                    size="large"
                    style={{color: '#1890ff', width: 500}}
                    onSearch={this.onChangeText}
                />
            </div>
        );
    }
}



export default SearchInfo;