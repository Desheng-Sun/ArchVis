import "./index.css";
import { useCallback, useState, useEffect } from "react";

import ChartHeader from "../chartHeader";

import FirstIndicators from "../firstComponents/indicatorsSt"
import FirstSearchBar from "../firstComponents/searchBar";
import FirstArchMap from "../firstComponents/archMap";
import FirstArchList from "../firstComponents/archList";
import FirstArchRank from "../firstComponents/archRank";

import SecondSearchBar from "../secondComponents/searchBar";
import SecondIndicatorsNdSelect from "../secondComponents/indicatorsNd";
import SecondIndicatorsRdSelect from "../secondComponents/indicatorsRd";
import SecondIndicatorsRdExplain from "../secondComponents/indicatorsExplain";


import ThirdSearchBar from "../thirdComponents/searchBar";
import ThirdIndicatorsRadar from "../thirdComponents/indicatorsRadar";
import ThirdIndicatorsStack from "../thirdComponents/indicatorsStack";
import ThirdArchComparison from "../thirdComponents/archComparison";



export default function Layout() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        hieght: document.documentElement.clientHeight
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return (() => {
            window.removeEventListener('resize', onResize)
        })
    })

    //第二屏，用户选择的二级指标
    const [selectedIndicatorsNd, setSelectedIndicatorsNd] = useState("1")
    //第二屏，用户选择的三级指标

    const [selectedIndicatorsRd, setSelectedIndicatorsRd] = useState("11")



    const [nowPageIndex, setNowPageIndex] = useState("firstButton")

    const [firstIndicatorsWidth, setFirstIndicatorsWidth] = useState(0);
    const [firstIndicatorsHeight, setFirstIndicatorsHeight] = useState(0);
    const [firstArchMapWidth, setFirstArchMapWidth] = useState(0);
    const [firstArchMapHeight, setFirstArchMapHeight] = useState(0);

    const [firstArchListWidth, setFirstArchListWidth] = useState(0);
    const [firstArchListHeight, setFirstArchListHeight] = useState(0);
    const [firstArchRankWidth, setFirstArchRankWidth] = useState(0);
    const [firstArchRankHeight, setFirstArchRankHeight] = useState(0);

    const [thirdIndicatorsRadarWidth, setThirdIndicatorsRadarWidth] = useState(0);
    const [thirdIndicatorsRadarHeight, setThirdIndicatorsRadarHeight] = useState(0);
    const [thirdIndicatorsStackWidth, setThirdIndicatorsStackWidth] = useState(0);
    const [thirdIndicatorsStackHeight, setThirdIndicatorsStackHeight] = useState(0);
    const [thirdArchComparisonWidth, setThirdArchComparisonWidth] = useState(0);
    const [thirdArchComparisonHeight, setThirdArchComparisonHeight] = useState(0);


    function ChangePageButton({ id, text }) {
        return (
            <button
                id={id}
                className="changePageButton"
                style={{ background: (id === nowPageIndex && "rgb(240, 239, 239)") }}
                onClick={() => {
                    setNowPageIndex(id)
                }}
            >{text}</button>
        )
    }
    useEffect(() => {
        if (nowPageIndex === "firstButton") {
            setFirstIndicatorsWidth(
                document.getElementById("firstIndicators").getBoundingClientRect().width
            );
            setFirstIndicatorsHeight(
                document.getElementById("firstIndicators").getBoundingClientRect().height
            );
        }
    }, [nowPageIndex, size])


    return (
        <div id="layout">
            <div id="ititle">
                <div>
                    <ChangePageButton
                        id="firstButton"
                        text="第一屏"
                    ></ChangePageButton>
                    <ChangePageButton
                        id="secondButton"
                        text="第二屏"
                    ></ChangePageButton>
                    <ChangePageButton
                        id="thirdButton"
                        text="第三屏"
                    ></ChangePageButton>
                </div>
                <div id="title">建筑企业数字化转型</div>
            </div>
            {
                nowPageIndex === "firstButton" &&
                <div id="viewList">
                    <div id="firstILeft">
                        <div id="firstSearchbar">
                            <ChartHeader chartName={"行业指标搜索框"} />
                            <FirstSearchBar />
                        </div>
                        <div id="firstIndicators">
                            <FirstIndicators
                                w={firstIndicatorsWidth}
                                h={firstIndicatorsHeight}
                            />
                        </div>

                    </div>
                    <div id="firstIRight">
                        <div id="firstIRightTop">
                            <div id="firstArchMap">
                                <FirstArchMap
                                    w={firstArchMapWidth}
                                    h={firstArchMapHeight}
                                />
                            </div>
                            <div id="firstArchList">
                                <FirstArchList
                                    w={firstArchListWidth}
                                    h={firstArchListHeight}
                                />
                            </div>
                        </div>
                        <div id="firstArchrank">
                            <FirstArchRank
                                w={firstArchRankWidth}
                                h={firstArchRankHeight}
                            />
                        </div>
                    </div>
                </div>
            }
            {
                nowPageIndex === "secondButton" &&
                <div id="viewList">
                    <div id="secondILeft">
                        <div id="secondSearchbar">
                            <SecondSearchBar />
                        </div>
                        <div id="secondIndicators">

                        </div>

                    </div>
                    <div id="secondIRight">
                        <div id="secondIRightTop">
                            <div id="secondSelectIndiND">
                                <SecondIndicatorsNdSelect
                                    setSelectedIndicatorsNd={setSelectedIndicatorsNd} />
                            </div>
                            <div id="secondSelectIndiRD">
                                <SecondIndicatorsRdSelect
                                    selectedIndicatorsNd={selectedIndicatorsNd}
                                    setSelectedIndicatorsRd={setSelectedIndicatorsRd} />
                            </div>
                            <div id="secondIndiRDExplane">
                                <SecondIndicatorsRdExplain
                                    selectedIndicatorsRd={selectedIndicatorsRd} />

                            </div>
                        </div>
                        <div id="secondIndiRDRank">

                        </div>
                    </div>
                </div>
            }
            {
                nowPageIndex === "thirdButton" &&
                <div id="viewList">
                    <div id="thirdILeft">
                        <div id="thirdSearchbar">
                            <ThirdSearchBar />
                        </div>
                        <div id="thirdEPPosplashes">

                        </div>

                    </div>
                    <div id="thirdIRight">
                        <div id="thirdIRightTop">
                            <div id="thirdEPScoreIndiSD">
                                <ThirdIndicatorsRadar
                                    w={thirdIndicatorsRadarWidth}
                                    h={thirdIndicatorsRadarHeight}
                                />
                            </div>
                            <div id="thirdEPScoreIndiND">
                                <ThirdIndicatorsStack
                                    w={thirdIndicatorsStackWidth}
                                    h={thirdIndicatorsStackHeight}
                                />

                            </div>
                        </div>
                        <div id="thiedEPdigit">
                            <ThirdArchComparison
                                w={thirdArchComparisonWidth}
                                h={thirdArchComparisonHeight}
                            />

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
