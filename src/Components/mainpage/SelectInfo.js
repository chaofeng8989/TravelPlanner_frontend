import React, {Component} from 'react';
import LoadMap from './LoadMap';

import bg from '../../assets/Echarts/bg.png';

class SelectInfo extends Component {
    selectedPlace = (value) => {
        this.props.sentPlace(value);
    }

    render() {
        return(
            <div style={{
                backgroundImage: 'url(' + bg + ')',
                backgroundPosition: '100%, 100%',
                backgroundSize: '1800px 472px',
            }}>
                <LoadMap selectPlace = {this.selectedPlace} />
            </div>
        );
    }
}

export default SelectInfo;