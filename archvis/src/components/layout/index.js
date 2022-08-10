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
import SecondIndicators from "../secondComponents/indicatorsBreakdown";
import SecondIndiRDRank from "../secondComponents/indiRdRank";


import ThirdSearchBar from "../thirdComponents/searchBar";
import ThirdEPPosplashes from "../thirdComponents/ePPosplashes";
import ThirdEPScoreIndiSD from "../thirdComponents/EPScoreIndiSD";
import ThirdEPScoreIndiND from "../thirdComponents/EPScoreIndiND";
import ThirdEPdight from "../thirdComponents/EPDight";


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

    const [secondIndicatorsWidth, setSecondIndicatorsWidth] = useState(0);
    const [secondIndicatorsHeight, setSecondIndicatorsHeight] = useState(0);
    const [secondIndiRDRankWidth, setSecondIndiRDRankWidth] = useState(0);
    const [secondIndiRDRankHeight, setSecondIndiRDRankHeight] = useState(0);

    const [thirdEPPosplashesWidth, setThirdEPPosplashesWidth] = useState(0);
    const [thirdEPPosplashesHeight, setThirdEPPosplashesHeight] = useState(0);
    const [thirdEPScoreIndiSDWidth, setthirdEPScoreIndiSDWidth] = useState(0);
    const [thirdEPScoreIndiSDHeight, setthirdEPScoreIndiSDHeight] = useState(0);
    const [thirdEPScoreIndiNDWidth, setthirdEPScoreIndiNDWidth] = useState(0);
    const [thirdEPScoreIndiNDHeight, setthirdEPScoreIndiNDHeight] = useState(0);
    const [thirdEPdightWidth, setthirdEPdightWidth] = useState(0);
    const [thirdEPdightHeight, setthirdEPdightHeight] = useState(0);


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
            setFirstArchMapWidth(
                document.getElementById("firstArchMap").getBoundingClientRect().width
            );
            setFirstArchMapHeight(
                document.getElementById("firstArchMap").getBoundingClientRect().height
            );
            setFirstArchListWidth(
                document.getElementById("firstArchList").getBoundingClientRect().width
            );
            setFirstArchListHeight(
                document.getElementById("firstArchList").getBoundingClientRect().height
            );
            setFirstArchRankWidth(
                document.getElementById("firstArchRank").getBoundingClientRect().width
            );
            setFirstArchRankHeight(
                document.getElementById("firstArchRank").getBoundingClientRect().height
            );
        };
        if (nowPageIndex === "secondButton") {
            setSecondIndicatorsWidth(
                document.getElementById("secondIndicators").getBoundingClientRect().width
            );
            setSecondIndicatorsHeight(
                document.getElementById("secondIndicators").getBoundingClientRect().height
            );
            setSecondIndiRDRankWidth(
                document.getElementById("secondIndiRDRank").getBoundingClientRect().width
            );
            setSecondIndiRDRankHeight(
                document.getElementById("secondIndiRDRank").getBoundingClientRect().height
            );
        }
        if (nowPageIndex === "thirdButton") {
            setThirdEPPosplashesWidth(
                document.getElementById("thirdEPPosplashes").getBoundingClientRect().width
            );
            setThirdEPPosplashesHeight(
                document.getElementById("thirdEPPosplashes").getBoundingClientRect().height
            );
            setThirdEPScoreIndiSDWidth(
                document.getElementById("thirdEPScoreIndiSD").getBoundingClientRect().width
            );
            setThirdEPScoreIndiSDHeight(
                document.getElementById("thirdEPScoreIndiSD").getBoundingClientRect().height
            );
            setThirdEPScoreIndiNDWidth(
                document.getElementById("thirdEPScoreIndiND").getBoundingClientRect().width
            );
            setThirdEPScoreIndiNDHeight(
                document.getElementById("thirdEPScoreIndiND").getBoundingClientRect().height
            );
            setThirdEPdightWidth(
                document.getElementById("thirdEPdight").getBoundingClientRect().width
            );
            setThirdEPdightHeight(
                document.getElementById("thirdEPdight").getBoundingClientRect().height
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
                            <ChartHeader chartName={"一级指标概览"} />
                            <FirstIndicators
                                w={firstIndicatorsWidth}
                                h={firstIndicatorsHeight}
                            />
                        </div>

                    </div>
                    <div id="firstIRight">
                        <div id="firstIRightTop">
                            <div id="firstArchMap">
                                <ChartHeader chartName={"全国范围建筑企业数字化概览"} />
                                <FirstArchMap
                                    w={firstArchMapWidth}
                                    h={firstArchMapHeight}
                                />
                            </div>
                            <div id="firstArchList">
                                <ChartHeader chartName={"全国建筑业上市企业名单"} />
                                <FirstArchList
                                    w={firstArchListWidth}
                                    h={firstArchListHeight}
                                />
                            </div>
                        </div>
                        <div id="firstArchRank">
                            <ChartHeader chartName={"全国上市建筑企业数字化总体排名"} />
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
                        <ChartHeader chartName={"行业企业检索"} />
                            <SecondSearchBar />
                        </div>
                        <div id="secondIndicators">
                        <ChartHeader chartName={"二级指标细分"} />
                            <SecondIndicators
                                w={secondIndicatorsWidth}
                                h={secondIndicatorsHeight}
                            />
                        </div>

                    </div>
                    <div id="secondIRight">
                        <div id="secondIRightTop">
                            <div id="secondSelectIndiND">
                            <ChartHeader chartName={"二级指标勾选栏"} />
                                <SecondIndicatorsNdSelect
                                    setSelectedIndicatorsNd={setSelectedIndicatorsNd} />
                            </div>
                            <div id="secondSelectIndiRD">
                            <ChartHeader chartName={"三级指标勾选栏"} />
                                <SecondIndicatorsRdSelect
                                    selectedIndicatorsNd={selectedIndicatorsNd}
                                    setSelectedIndicatorsRd={setSelectedIndicatorsRd} />
                            </div>
                            <div id="secondIndiRDExplane">
                            <ChartHeader chartName={"三级指标解释栏"} />
                                <SecondIndicatorsRdExplain
                                    selectedIndicatorsRd={selectedIndicatorsRd} />

                            </div>
                        </div>
                        <div id="secondIndiRDRank">
                        <ChartHeader chartName={"二、三级指标企业对比"} />
                            <SecondIndiRDRank
                                w={secondIndiRDRankWidth}
                                h={secondIndiRDRankHeight}
                            />
                        </div>
                    </div>
                </div>
            }
            {
                nowPageIndex === "thirdButton" &&
                <div id="viewList">
                    <div id="thirdILeft">
                        <div id="thirdSearchbar">
                            <ChartHeader chartName={"行业企业检索栏"}/>
                            <ThirdSearchBar />
                        </div>
                        <div id="thirdEPPosplashes">
                            <ChartHeader chartName={"全行业企业数字化散点图"}/>
                            <ThirdEPPosplashes
                                w={thirdEPPosplashesWidth}
                                h={thirdEPPosplashesHeight}
                            />
                        </div>

                    </div>
                    <div id="thirdIRight">
                        <div id="thirdIRightTop">
                            <div id="thirdEPScoreIndiSD">
                                <ChartHeader chartName={"企业一级指标得分雷达图"}/>
                                <ThirdEPScoreIndiSD
                                    w={thirdEPScoreIndiSDWidth}
                                    h={thirdEPScoreIndiSDHeight}
                                />
                            </div>
                            <div id="thirdEPScoreIndiND">
                                <ChartHeader chartName={"企业二级指标得分堆叠图"}/>
                                <ThirdEPScoreIndiND
                                    w={thirdEPScoreIndiNDWidth}
                                    h={thirdEPScoreIndiNDHeight}
                                />

                            </div>
                        </div>
                        <div id="thiedEPdigit">
                            <ChartHeader chartName={"企业数字化程度对比图"}/>
                            <ThirdEPdight
                                w={thirdEPdightWidth}
                                h={thirdEPdightHeight}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
