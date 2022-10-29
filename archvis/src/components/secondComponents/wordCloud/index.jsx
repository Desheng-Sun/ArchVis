import * as echarts from 'echarts';
import React, { useState, useEffect, useRef } from "react";
import { secondWord } from '../../../apis/api';
import 'echarts-wordcloud';

export default function SecondWordCloud({w, h}) {
    const [data, setData] = useState([]);
    const [industry, setIndustry] = useState('全行业');
    const chartRef = useRef(null);
    useEffect(() => {
        secondWord(industry).then((res) => {
            setData(res);
        })
    }, [industry])
    useEffect(() => {
        let myChart = echarts.getInstanceByDom(chartRef.current)
        if (myChart == null) {
          myChart = echarts.init(chartRef.current);
        }
        var keywords = [];
        for (let i in data) {
            keywords.push({
                "name": data[i].单词,
                "value": Object.values(data[i])[1]
            })
        }
        console.log(keywords);
            var option = {
                series: [{
                    type: 'wordCloud',
                    sizeRange: [15, 80],
                    rotationRange: [0, 0],
                    rotationStep: 45,
                    gridSize: 8,
                    shape: 'pentagon',
                    width: '100%',
                    height: '95%',
                     textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            },
                            fontFamily: 'sans-serif',
                            fontWeight: 'normal',
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: keywords
                }]
            };
        myChart.setOption(option, true);
        myChart.resize();
      }, [data, w, h]);    
    return (
        <div ref={chartRef} style={{ width: "95%", height: "28vh" }}>
        </div>
    )
}