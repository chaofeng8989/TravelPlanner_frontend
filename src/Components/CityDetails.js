import React, {Component} from 'react';
import InsertPage from './InsertPage';
import PlaceList from './PlaceList';
import Axios from 'axios';
import {GET_PLACE} from '../constant';

class CityDetails extends Component{
  constructor () {
      super();
      this.state = {
        cityAddress: "seattle,wa,usa",
        choosedInfo: undefined,
        placeInfo: undefined,
        nextPageToken: "",
        selected: [],
        disabledNext: true,
      }
    }
    //当有下一页，让下一页按钮可点击，当没有下一页，让下一页按钮不可点击
    setNextPageDisabled = () => {
      if(this.state.nextPageToken != ""){
        this.setState({
          disabledNext: false,
        })
      }
      else{
        this.setState({
          disabledNext: true,
        })
      }
    }
    //传interest和transportation，拿到places
    fetchPlaces = (choosedInfo) =>{
      const {interest, transportation} = choosedInfo;
      this.setState({
        choosedInfo: choosedInfo,
      })
      const url = `${GET_PLACE}${this.state.cityAddress}`;
      Axios.get(url)
        .then(response => {
          this.setState({
            placeInfo: response.data.entity,
            nextPageToken: response.data.nextPageToken,
            selected: [],
          })
          this.setNextPageDisabled();
        })
    }

    //获取下一页的信息 还未做上一页，这块bug还有挺多需要修
    fetchNextPlaces = () => {
      const url = `${GET_PLACE}${this.state.cityAddress}?nextPageToken=${this.state.nextPageToken}`;
      Axios.get(url)
        .then(response => {
          this.setState({
            placeInfo: response.data.entity,
            nextPageToken: response.data.nextPageToken,
            selected: [],
          })
          this.setNextPageDisabled();
        })
    }

    designTour = (places) => {
      const url = `${GET_PLACE}${places}`;
      Axios.post(url)
        .then(response => {
          this.setState({
            tourInfo: response.data,
          })
        })
    }
    //输入第一部分，收集用户的兴趣和交通工具，filter出places
    //输入第二部分，将filte 过的places 展示给用户，然后用户选择部分
    //将选择的时间和places全都输出得到tour的数据
    render() {
        return (
          <div>
            <p>{this.state.cityAddress}</p>
            <div className="city-content">
                <InsertPage cityInfo = {this.props.cityInfo}
                submit={this.fetchPlaces}/>
                <PlaceList placeInfo = {this.state.placeInfo}
                disabledNext = {this.state.disabledNext}
                designTour = {this.designTour}
                nextPage = {this.fetchNextPlaces}/>
            </div>
          </div>
        )
    }
}
export default CityDetails