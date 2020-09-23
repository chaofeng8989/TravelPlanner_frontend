import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin, Radio} from 'antd';

class PlaceList extends Component {
    constructor(){
        super();
        this.state = {
            duration: 0,
            pageNumber: 1,
            selectedPlaces: [],
            disabledPrevious: true,
        }
    }
    
    onChange = setting => {
        this.setState({
          duration: setting.target.value,
        });
    };

    addOrRemovePlace = (selectedPlace, isSelected) => {
        let list = this.state.selectedPlaces;
        if(isSelected) {
            list.push(selectedPlace);
        } else {
            list = list.filter(list => list != selectedPlace);
        }
        console.log(list);
        this.setState ({
            selectedPlaces: list,
        })
    }
    
    onChangeBox = setting => {
        this.addOrRemovePlace(setting.target.value, setting.target.checked);
    }

    designTour = () => {
        this.props.designTour(this.state.selectedPlaces);
        this.setState({
            selectedPlaces: [],
        })
    }

    previousPage = () => {
        if(this.state.pageNumber == 2) {
            this.setState({
                disabledPrevious: true,
            })
        }
        console.log(this.state.pageNumber);
        this.setState({
            pageNumber: this.state.pageNumber - 1,
        })
    }

    nextPage = () => {
        console.log(this.state.pageNumber);
        this.setState({
            pageNumber: this.state.pageNumber + 1,
            disabledPrevious: false,
        })
        this.props.nextPage();
    }
    render(){
        const placeList = this.props.placeInfo ? this.props.placeInfo : [];
        return(
            <div className="place-list-box">
                <div>
                    <label>Duration: </label>
                    <Radio.Group onChange={this.onChange} value={this.state.duration}>
                        <Radio value={1}>3-</Radio>
                        <Radio value={2}>3-5</Radio>
                        <Radio value={3}>5-7</Radio>
                        <Radio value={4}>7+</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <Button className = "design-btn"
                    onClick = {this.designTour}>Desgin your own tour</Button>
                </div>
                <List
                    className="place-list"
                    itemLayout="horizontal"
                    size="small"
                    dataSource={placeList}
                    renderItem={item => (
                        <List.Item
                            actions={[<Checkbox dataInfo={item} onChange={this.onChangeBox}
                            value = {item.placeId}/>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar size={50} src = {item.photos} />}
                                title={<p>{item.satname}</p>}
                                description={`${item.name}`}
                            />  
                        </List.Item>
                    )}
                />
                <div>
                    <Button disabled = {this.state.disabledPrevious} 
                    onClick ={this.previousPage}>previousPage</Button>
                    <Button disabled = {this.props.disabledNext}
                    onClick={this.nextPage}>nextPage</Button>
                </div>
            </div>
        );
    }
}
export default PlaceList;