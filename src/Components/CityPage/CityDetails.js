import React, {Component} from 'react';
import InsertPage from './InsertPage';
import PlaceList from './PlaceList';
import Axios from 'axios';
import {GENERATE_TOUR, GET_PLACE} from '../../constant';
import {Modal, Spin} from 'antd';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

class CityDetails extends Component{
  constructor () {
      super();
      this.state = {
        cityAddress: "Seattle,Washington",
        choosedInfo: undefined,
        placeInfo: undefined,
        nextPageTokens: [],
        tourInfo: undefined,
        disabledNext: true,
        disabledPlaces: true,
        designLoading: false,
        successDesign: false,
        placeSearched: true,
      }
    }

    toOtherRoute = () => {
      const urlObj = {
          pathname: `/home/Itinary`,
          state: {
            tourInfo: this.state.tourInfo,
          }
      }
      this.props.history.push(urlObj);
  }

    //当有下一页，让下一页按钮可点击，当没有下一页，让下一页按钮不可点击
    setNextPageDisabled = (nextPageToken) => {
      if(nextPageToken != null){
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
      const url = `${GET_PLACE}city=${this.props.location.state.cityInfo.city},${this.props.location.state.cityInfo.state}`;
      const cookies = new Cookies();
      const token = cookies.get('tokens').access_token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
     };
      Axios.get(url, config)
        .then(response => {
          let list = [];
          list.push(response.data.nextPageToken);
          this.setState({
            placeInfo: response.data.entity,
            nextPageTokens: list,
            selected: [],
            placeSearched: false,
          })
          this.setNextPageDisabled(response.data.nextPageToken);
        })
    }

    
    fetchPreviousPlaces = (pageNumber) => {
      let url = null;
      if(pageNumber === 2) {
        url = `${GET_PLACE}city=${this.props.location.state.cityInfo.city},${this.props.location.state.cityInfo.state}`;
      }
      else {
        url = `${GET_PLACE}nextPageToken=${this.state.nextPageTokens[pageNumber - 3]}`;
      }
      const cookies = new Cookies();
      const token = cookies.get('tokens').access_token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
     };
      Axios.get(url, config)
      .then(response => {
        this.setState({
          placeInfo: response.data.entity,
        })
        this.setNextPageDisabled(response.data.nextPageToken);
      })
      
    }
    //获取下一页的信息 还未做上一页，同时存储上一页的nextpagetoken
    fetchNextPlaces = (pageNumber) => {
      const url = `${GET_PLACE}nextPageToken=${this.state.nextPageTokens[pageNumber - 1]}`;
      const cookies = new Cookies();
      const token = cookies.get('tokens').access_token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
     };
      Axios.get(url, config)
        .then(response => {
          let list = this.state.nextPageTokens;
          console.log(pageNumber);
          console.log(list.length);
          if(pageNumber >= list.length ){
            list.push(response.data.nextPageToken);
          }
          console.log(list);
          this.setState({
            placeInfo: response.data.entity,
            nextPageTokens: list,
          })
          this.setNextPageDisabled(response.data.nextPageToken);
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
      const url = `${GENERATE_TOUR}`;
      this.setState({
        designLoading: true,
      })
      const cookies = new Cookies();
      const token = cookies.get('tokens').access_token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
     };
      Axios.post(url, {
          placeIdSet: places, 
          duration: duration,
          travelType: transportation,
      }, config)
        .then(response => {
          this.setState({
            tourInfo: response.data,
            designLoading: false,
            successDesign: true,
          })
          this.toOtherRoute()
        })
        .catch(error => {
          this.showErrorModal(error);
          this.setState({
            designLoading: false,
            successDesign: false,
          })
        })
    }

    //输入第一部分，收集用户的兴趣和交通工具，filter出places
    //输入第二部分，将filte 过的places 展示给用户，然后用户选择部分
    //将选择的时间和places全都输出得到tour的数据
    render() {
      let cityInfo = this.props.location.state.cityInfo ? this.props.location.state.cityInfo: [];
        return (
          <div className="main">
            <p className="cityName">{cityInfo.city}</p>
            <div className="city-input">

                <InsertPage cityInfo = {cityInfo}
                submit={this.searchPlaces}/>
                {this.state.designLoading ? 
                    <Spin tip="Designing your tour" /> : null}
            </div>

            <div className="city-content">
            <PlaceList 
                cityInfo = {cityInfo}
                placeInfo = {this.state.placeInfo}
                disabledNext = {this.state.disabledNext}
                placeSearched = {this.state.placeSearched}
                successDesign = {this.state.successDesign}
                designTour = {this.designTour}
                previousPage = {this.fetchPreviousPlaces}
                nextPage = {this.fetchNextPlaces}/>
            </div>
          </div>
        )
    }
}


export default withRouter(CityDetails);