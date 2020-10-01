import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, InputNumber, Spin, Radio} from 'antd';

class PlaceList extends Component {
    constructor(){
        super();
        this.state = {
            duration: 0,
            pageNumber: 1,
            transportation: [],
            selectedPlaces: [],
            disabledPrevious: true,
        }
    }
    
    onChangeDuration = insertValue => {
        if(insertValue > 15) {
            insertValue = 15;
        }
        this.setState({
          duration: insertValue,
        });
    };

    addOrRemovePlace = (selectedPlace, isSelected) => {
        let list = this.state.selectedPlaces;
        if(isSelected) {
            list.push(selectedPlace);
        } else {
            list = list.filter(list => list !== selectedPlace);
        }
        console.log(list);
        this.setState ({
            selectedPlaces: list,
        })
    }
    
    onChangeBox = setting => {
        this.addOrRemovePlace(setting.target.value, setting.target.checked);
    }

    onChangeTransp = (checkedValue) => {
        this.setState({
            transportation: checkedValue,
        })
      }

    designTour = () => {
        this.props.designTour(this.state.selectedPlaces, this.state.duration, this.state.transportation);
        if(this.props.successDesign) {
            this.setState({
                selectedPlaces: [],
                duration: 0,
            })
        }
    }

    previousPage = () => {
        //=2是因为setstate会在之后触发，现在还没有减页数就是2，减了之后就是
        if(this.state.pageNumber === 2) {
            this.setState({
                disabledPrevious: true,
            })
        }
        this.setState({
            pageNumber: this.state.pageNumber - 1,
        })
        this.props.previousPage(this.state.pageNumber);
    }

    nextPage = () => {
        this.props.nextPage(this.state.pageNumber);
        this.setState({
            pageNumber: this.state.pageNumber + 1,
            disabledPrevious: false,
        })
    }

    render(){
        const cityTransp = this.props.cityInfo? this.props.cityInfo.transportation: [];
        const placeList = this.props.placeInfo ? this.props.placeInfo : [];
        return(
            <div className="place-list-box">
                <div>
                    <label>Duration: </label>
                    <InputNumber
                        min={0}
                        max={15}
                        defaultValue={0}
                        style={{margin: "0 2px"}}
                        onChange={this.onChangeDuration}
                    />
                    <label>days</label>
                </div>
                <div>
                    <Checkbox.Group options = {cityTransp}
                    onChange = {this.onChangeTransp}></Checkbox.Group>
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
                            actions={[<Checkbox dataInfo={item} 
                                defaultChecked = {false} 
                                checked = {this.state.selectedPlaces.includes(item.placeId)}
                            onChange={this.onChangeBox}
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