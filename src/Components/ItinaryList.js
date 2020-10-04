//暂时不用
import React, { Component } from 'react';
import { List, Avatar, Divider, Rate} from 'antd';


class ItinaryList extends Component {
    state = {

        current: '0',
    }




    render() {
        var TourList = [
            {
                "simplePlaces": [
                    {
                        "name": "Seattle Art Museum",
                        "placeId": "ChIJSxh5JbJqkFQRxI1KoO7oZHs",
                        "rating": 4.6,
                        "photo": "https://maps.googleapis.com/maps/api/place/photo?&maxwidth=6000&maxheight=4000&photoreference=CmRaAAAAvbpKbt1SNzxhTz8-BWHNIp4dpSbRCSl6oi8Zo6oDwtsj3G04JEQfcLU2myBnvkx-ZqyAnoSyXfPIHxhgvWhbF4J89aSpke-85bEdHXFIMnx-oHCZ7EnPO4Nt-BUFrFRkEhDa7NgaTJPXPzoNXS07vBYNGhTcI4DQnjh_3pg-M5TssBdmM5vWqQ&key=AIzaSyB5Aextt4PuSqpd0F0_fHMY95iTZYA5OkY"
                    },
                    {
                        "name": "The Gum Wall",
                        "placeId": "ChIJaYxSWbJqkFQRIx56JsKqNCA",
                        "rating": 4.2,
                        "photo": "https://maps.googleapis.com/maps/api/place/photo?&maxwidth=4032&maxheight=3024&photoreference=CmRaAAAA2iaUumzBRxHh1IRBwtP0d-EpQjzYwy0zFtgCnHesPnB187MIJ-V4pf2M_x_ZZ0BXyCArZvsgnU4cKPboCzmi12I24GhQTGjxsPu5MufFxGO_p0a4gSgktrGqEU1GVh3KEhDZhzkbq-W4coVjtEah7meCGhS8Ch09Xmzeg4jUVzME_ke9SLkJHA&key=AIzaSyB5Aextt4PuSqpd0F0_fHMY95iTZYA5OkY"
                    }
                ],
                "time": [
                    480,
                    541
                ]
            },
            {
                "simplePlaces": [
                    {
                        "name": "Aurora Bridge",
                        "placeId": "ChIJr35lOAQVkFQRsyYe3IVRQ_c",
                        "rating": 4.1,
                        "photo": "https://maps.googleapis.com/maps/api/place/photo?&maxwidth=4592&maxheight=3056&photoreference=CmRaAAAARmonqBBnynsMUs9oWpfeAMTTyqdhCWUzuq3d4EJLILy31c8qqOWkIebaUhRd_O1PR9axc64qdTtmBB00SkrQUv8clc0hiDIKSJxLZaco5-xpJKG4Of3yGgfNt-9FIBLQEhBvXUGyih-vdv8LjVd7s9AgGhTJNtjnlp9ntj8hJuTy5Eyk84N-bg&key=AIzaSyB5Aextt4PuSqpd0F0_fHMY95iTZYA5OkY"
                    }
                ],
                "time": [
                    480
                ]
            }
        ]
        // 把time参数依次merge进simpleplace
        const result = TourList.map((o) => Object.assign ({},o, {
            simplePlaces: o.simplePlaces.map( (p, index) => Object.assign( {time: o.time[index]}, p  )   )

        } ) )
        console.log(result);

        return (
            <div className="tour-list">
            <div class="tripheader" >
            <h1 className="display-name"> Seattle Trip </h1>
            </div>
                {
                    result.map((day, index) => (
                    <div key={index}>
                        <Divider> Day {index + 1}</Divider>
                    <div>

                  <List
                    className="place-list"
                    itemLayout="vertical  "
                    
                    split="true"
                    
                    dataSource={day.simplePlaces}
                    renderItem={item => (
                        <List.Item 
                        >
                            <List.Item.Meta
                                avatar={<Avatar size={50} src = {item.photo} />}
                                title={<p>{item.name}</p>}
                                description={<p>taking{item.time}minutes </p>}
                                
                            />  
                            { <span>
                                    <Rate allowHalf  value={item.rating} mountNode/>
                                   {<span className="ant-rate-text">{item.rating} stars</span>}
                                  </span>
                                 
                                }
                        </List.Item>
                    )}
                />

                </div>
              </div>
            ))}
          </div>
           
            
        )
    }
}

export default ItinaryList;
