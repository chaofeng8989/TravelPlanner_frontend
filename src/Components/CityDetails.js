import React, {Component} from 'react';
import InsertPage from './InsertPage';
import PlaceList from './PlaceList';
import Axios from 'axios';
import {GENERATE_TOUR, GET_PLACE} from '../constant';
import {Modal} from 'antd';
import { withRouter } from "react-router-dom"

class CityDetails extends Component{
  constructor () {
      super();
      this.state = {
        cityAddress: "Seattle,Washington",
        choosedInfo: undefined,
        placeInfo: undefined,
        thisNextPageToken: null,
        nextPageTokens: [],
        disabledNext: true,
      }
    }

    toOtherRoute = () => {
      this.setState({
        cityAddress: `${this.props.location.state.city},${this.props.location.state.state}`,
      })
      const urlObj = {
          pathname: `/home/Itinary`,
          state: {

          }
      }
      this.props.history.push(urlObj)
  }

    //当有下一页，让下一页按钮可点击，当没有下一页，让下一页按钮不可点击
    setNextPageDisabled = () => {
      if(this.state.thisNextPageToken != null){
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

    searchPlaces = (choosedInfo) => {
      this.setState({
        choosedInfo: choosedInfo,
      })
      this.fetchPlaces(choosedInfo)
    }
    //传interest和transportation，拿到places
    fetchPlaces = (choosedInfo) =>{
      const {interest} = choosedInfo;
      const url = `${GET_PLACE}city=${this.state.cityAddress}`;
      Axios.get(url)
        .then(response => {
          this.setState({
            placeInfo: response.data.entity,
            thisNextPageToken: response.data.nextPageToken,
            selected: [],
          })
          this.setNextPageDisabled();
        })
    }

    
    fetchPreviousPlaces = (pageNumber) => {
      let url = null;
      if(pageNumber === 2) {
        url = `${GET_PLACE}city=${this.state.cityAddress}`;
      }
      else {
        url = `${GET_PLACE}nextPageToken=${this.state.nextPageTokens[pageNumber - 2]}`;
      }
      Axios.get(url)
      .then(response => {
        this.setState({
          placeInfo: response.data.entity,
        })
      })
    }
    //获取下一页的信息 还未做上一页，同时存储上一页的nextpagetoken
    fetchNextPlaces = (pageNumber) => {
      const url = `${GET_PLACE}nextPageToken=${this.state.thisNextPageToken}`;
      Axios.get(url)
        .then(response => {
          let list = this.state.nextPageTokens;
          if(pageNumber === list.length - 1){
            list.push(this.state.thisNextPageToken);
          }
          console.log(list);
          this.setState({
            placeInfo: response.data.entity,
            nextPageTokens: list,
            nextPageToken: response.data.nextPageToken,
          })
          this.setNextPageDisabled();
        })
    }
    //modal part
    showErrorModal = (error) => {
      const modal = Modal.success({
        title: 'Something went wrong',
        content: `You got this ${error}`,
      });
    }

    
    designTour = (places, duration, transportation) => {
      const url = `${GENERATE_TOUR}`
      Axios.post(url, {
          placeIdSet: places, 
          duration: duration,
          travelType: "Walking",
      })
        .then(response => {
          this.setState({
            tourInfo: response.data,
          })
        })
        .catch(error => {
          this.showErrorModal(error);
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

                <InsertPage cityInfo = {this.props.location.state.cityInfo}
                submit={this.searchPlaces}/>

                <PlaceList cityInfo = {this.props.location.state.cityInfo}
                placeInfo = {this.state.placeInfo}
                disabledNext = {this.state.disabledNext}
                designTour = {this.designTour}
                previousPage = {this.fetchPreviousPlaces}
                nextPage = {this.fetchNextPlaces}/>
            </div>
          </div>
        )
    }
}
export default withRouter(CityDetails);