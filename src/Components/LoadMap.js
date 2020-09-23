import React from 'react';
//import echarts from 'echarts/lib/echarts';
import echarts from 'echarts';
import america from '../assets/Echarts/america.json';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

class LoadMap extends React.Component {
    constructor() {
        super();
        this.state = {
            chosen: undefined,
        }
    }

    componentDidMount() {
        this.initalECharts();
    }

    initalECharts() {
        // 需要显示名字的place
        echarts.registerMap('USA', america, {
            Alaska: {              // 把阿拉斯加移到美国主大陆左下方
                left: -131,
                top: 25,
                width: 15
            },
            Hawaii: {
                left: -110,        // 夏威夷
                top: 28,
                width: 5
            },
            'Puerto Rico': {       // 波多黎各
                left: -76,
                top: 26,
                width: 2
            }
        });
        
        const myChart = echarts.init(document.getElementById('map'));
        let option = {
            title: {
                text: 'Select An Area You Are Interested',
                left: 'center'
            },
            visualMap: {
                left: 'right',
                min: 0,
                max: 3000,
                color: ['orangered','yellow','lightskyblue'],
                text:['HOT',''],           // 文本，默认为数值文本
                show: false //热力图的映射条
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'left',
                top: 'top',
                itemSize: 15,
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: 'USA Traveler Favorite Places',
                    type: 'map',
                    roam: true,
                    map: 'USA',
                    itemStyle:{
                        emphasis:{label:{show:true}}
                    },
                    // 文本位置修正
                    textFixed: {
                        Alaska: [20, -20]
                    },
                    data:[ //value为海拔高度，可update为用户喜爱程度
                        {name: 'Alabama', value: 480},
                        {name: 'Alaska', value: 73},
                        {name: 'Arizona', value: 650},
                        {name: 'Arkansas', value: 294},
                        {name: 'California', value: 380},
                        {name: 'Colorado', value: 518},
                        {name: 'Connecticut', value: 359},
                        {name: 'Delaware', value: 91},
                        {name: 'District of Columbia', value: 63},
                        {name: 'Florida', value: 1931},
                        {name: 'Georgia', value: 991},
                        {name: 'Hawaii', value: 139},
                        {name: 'Idaho', value: 159},
                        {name: 'Illinois', value: 1287},
                        {name: 'Indiana', value: 653},
                        {name: 'Iowa', value: 307},
                        {name: 'Kansas', value: 288},
                        {name: 'Kentucky', value: 438},
                        {name: 'Louisiana', value: 460},
                        {name: 'Maine', value: 132},
                        {name: 'Maryland', value: 588},
                        {name: 'Massachusetts', value: 664},
                        {name: 'Michigan', value: 988},
                        {name: 'Minnesota', value: 537},
                        {name: 'Mississippi', value: 298},
                        {name: 'Missouri', value: 602},
                        {name: 'Montana', value: 100},
                        {name: 'Nebraska', value: 185},
                        {name: 'Nevada', value: 275},
                        {name: 'New Hampshire', value: 132},
                        {name: 'New Jersey', value: 886},
                        {name: 'New Mexico', value: 208},
                        {name: 'New York', value: 1957},
                        {name: 'North Carolina', value: 975},
                        {name: 'North Dakota', value: 69},
                        {name: 'Ohio', value: 1154},
                        {name: 'Oklahoma', value: 381},
                        {name: 'Oregon', value: 389},
                        {name: 'Pennsylvania', value: 1276},
                        {name: 'Rhode Island', value: 105},
                        {name: 'South Carolina', value: 472},
                        {name: 'South Dakota', value: 83},
                        {name: 'Tennessee', value: 645},
                        {name: 'Texas', value: 2605},
                        {name: 'Utah', value: 285},
                        {name: 'Vermont', value: 62},
                        {name: 'Virginia', value: 818},
                        {name: 'Washington', value: 689},
                        {name: 'West Virginia', value: 185},
                        {name: 'Wisconsin', value: 572},
                        {name: 'Wyoming', value: 57},
                        {name: 'Puerto Rico', value: 366}
                    ]
                }
            ]
        };
    
        myChart.setOption(option);
    }
    
    
    render() {
        return (
            <div id="map"  style={{ width: '90%', height: 400, marginTop: 50 }}></div>
        );
    }
}

export default LoadMap;