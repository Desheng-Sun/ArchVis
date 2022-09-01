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
    // 获取当前整个页面的长宽
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
    // 第一屏 用户选择的行业
    const [selectdIndustryFirst, setSelectdIndustryFirst] = useState(["施工行业", "设计行业"])
    // 第一屏 用户选择的指标
    const [selectedIndexFirst, setSelectedIndexFirst] = useState(["基本指标", "数字研发创新指标", "组织指标", "战略指标", "行业特色指标"])
    // 第一屏 用户选择的地区
    const [selectedRegionFirst, setSelectedRegionFirst] = useState(["东北", "华北", "华东", "华中", "华南", "西北", "西南", "港澳台"])
    // 第一屏，用户选择的时间
    const [selectedYearFirst, setSelectedYearFirst] = useState(2019)
    // 第一屏，用户当前点击的公司
    const [selectedCompanyFirst, setSelectedCompanyFirst] = useState(2019)


    // 第二屏，用户选择的行业
    const [selectedIndustrySecond, setSelectedIndustrySecond] = useState("施工行业");
    // 第二屏，用户选择的公司
    const [nowEnterprise, setNowEnterprise] = useState(["美丽生态"]);
    // 第二屏，用户选择的二级指标
    const [selectedIndicatorsNd, setSelectedIndicatorsNd] = useState("规模状况");
    // 第二屏，用户选择的三级指标
    const [selectedIndicatorsRd, setSelectedIndicatorsRd] = useState();

    // 第三屏，用户选择的行业
    const [selectedIndustryThird, setSelectedIndustryThird] = useState("施工行业");
    // 第三屏，用户选择的公司
    const [nowEnterpriseThird, setNowEnterpriseThird] = useState(["美丽生态"]);
    // 第三屏，用户选择的年份
    // const [selectedYearThird, setSelectedYearThird] = useState(["2019"]);

    // 当前页面所在第几屏上
    const [nowPageIndex, setNowPageIndex] = useState("firstButton")

    // 第一屏各个组件的长宽
    const [firstIndicatorsWidth, setFirstIndicatorsWidth] = useState(0);
    const [firstIndicatorsHeight, setFirstIndicatorsHeight] = useState(0);
    const [firstArchMapWidth, setFirstArchMapWidth] = useState(0);
    const [firstArchMapHeight, setFirstArchMapHeight] = useState(0);
    const [firstArchListWidth, setFirstArchListWidth] = useState(0);
    const [firstArchListHeight, setFirstArchListHeight] = useState(0);
    const [firstArchRankWidth, setFirstArchRankWidth] = useState(0);
    const [firstArchRankHeight, setFirstArchRankHeight] = useState(0);

    // 第二屏各个组件的长宽
    const [secondIndicatorsWidth, setSecondIndicatorsWidth] = useState(0);
    const [secondIndicatorsHeight, setSecondIndicatorsHeight] = useState(0);
    const [secondIndiRDRankWidth, setSecondIndiRDRankWidth] = useState(0);
    const [secondIndiRDRankHeight, setSecondIndiRDRankHeight] = useState(0);

    // 第三屏各个组件的长宽
    const [thirdEPPosplashesWidth, setThirdEPPosplashesWidth] = useState(0);
    const [thirdEPPosplashesHeight, setThirdEPPosplashesHeight] = useState(0);
    const [thirdEPScoreIndiSDWidth, setThirdEPScoreIndiSDWidth] = useState(0);
    const [thirdEPScoreIndiSDHeight, setThirdEPScoreIndiSDHeight] = useState(0);
    const [thirdEPScoreIndiNDWidth, setThirdEPScoreIndiNDWidth] = useState(0);
    const [thirdEPScoreIndiNDHeight, setThirdEPScoreIndiNDHeight] = useState(0);
    const [thirdEPdightWidth, setThirdEPdightWidth] = useState(0);
    const [thirdEPdightHeight, setThirdEPdightHeight] = useState(0);


    // 切换页面的组件
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
        // 根据当前页面所在第几屏来更改相应组件的长宽
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
                            <FirstSearchBar
                                setSelectdIndustryFirst={setSelectdIndustryFirst}
                                setSelectedIndexFirst={setSelectedIndexFirst}
                                setSelectedRegionFirst={setSelectedRegionFirst} />
                        </div>
                        <div id="firstIndicators">
                            <ChartHeader chartName={"一级指标概览"} />
                            <FirstIndicators
                                w={firstIndicatorsWidth}
                                h={firstIndicatorsHeight}
                                selectdIndustryFirst={selectdIndustryFirst}
                                selectedIndexFirst={selectedIndexFirst}
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
                                    selectedRegionFirst={selectedRegionFirst}
                                    selectedYearFirst = {selectedYearFirst}
                                    selectdIndustryFirst={selectdIndustryFirst}
                                    setSelectedRegionFirst={setSelectedRegionFirst}
                                    setSelectedYearFirst={setSelectedYearFirst}
                                />
                            </div>
                            <div id="firstArchList">
                                <ChartHeader chartName={"全国建筑业上市企业名单"} />
                                <FirstArchList
                                    selectedRegionFirst={selectedRegionFirst}
                                    selectedYearFirst={selectedYearFirst}
                                    selectdIndustryFirst={selectdIndustryFirst}
                                    setSelectedCompanyFirst = {setSelectedCompanyFirst}
                                />
                            </div>
                        </div>
                        <div id="firstArchRank">
                            <ChartHeader chartName={"全国上市建筑企业数字化总体排名"} />
                            <FirstArchRank
                                w={firstArchRankWidth}
                                h={firstArchRankHeight}
                                selectedRegionFirst={selectedRegionFirst}
                                selectedYearFirst={selectedYearFirst}
                                selectdIndustryFirst={selectdIndustryFirst}
                                selectedCompanyFirst = {selectedCompanyFirst}
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
                            <SecondSearchBar
                                nowEnterprise={nowEnterprise}
                                setSelectedIndustrySecond={setSelectedIndustrySecond}
                                setNowEnterprise={setNowEnterprise}
                            />
                        </div>
                        <div id="secondIndicators">
                            <ChartHeader chartName={"二级指标细分"} />
                            <SecondIndicators
                                w={secondIndicatorsWidth}
                                h={secondIndicatorsHeight}
                                selectedIndustrySecond={selectedIndustrySecond}
                                setSelectedIndicatorsNd={setSelectedIndicatorsNd}
                                setSelectedIndicatorsRd={setSelectedIndicatorsRd}
                            />
                        </div>

                    </div>
                    <div id="secondIRight">
                        <div id="secondIRightTop">
                            <div id="secondSelectIndiND">
                                <ChartHeader chartName={"二级指标勾选栏"} />
                                <SecondIndicatorsNdSelect
                                    selectedIndustrySecond={selectedIndustrySecond}
                                    selectedIndicatorsNd={selectedIndicatorsNd}
                                    selectedIndicatorsRd={selectedIndicatorsRd}
                                    setSelectedIndicatorsNd={setSelectedIndicatorsNd}
                                />
                            </div>
                            <div id="secondSelectIndiRD">
                                <ChartHeader chartName={"三级指标勾选栏"} />
                                <SecondIndicatorsRdSelect
                                    selectedIndustrySecond={selectedIndustrySecond}
                                    selectedIndicatorsNd={selectedIndicatorsNd}
                                    selectedIndicatorsRd={selectedIndicatorsRd}
                                    setSelectedIndicatorsRd={setSelectedIndicatorsRd} />
                            </div>
                            {/* <div id="secondIndiRDExplane">
                                <ChartHeader chartName={"指标解释栏"} />
                                <SecondIndicatorsRdExplain
                                    selectedIndustry={selectedIndustry}
                                    selectedIndicatorsNd={selectedIndicatorsNd}
                                    selectedIndicatorsRd={selectedIndicatorsRd} />

                            </div> */}
                        </div>
                        <div id="secondIndiRDRank">
                            <ChartHeader chartName={"二、三级指标企业对比"} />
                            <SecondIndiRDRank
                                w={secondIndiRDRankWidth}
                                h={secondIndiRDRankHeight}
                                selectedIndustrySecond={selectedIndustrySecond}
                                nowEnterprise={nowEnterprise}
                                selectedIndicatorsNd={selectedIndicatorsNd}
                                selectedIndicatorsRd={selectedIndicatorsRd}
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
                            <ChartHeader chartName={"行业企业检索栏"} />
                            <ThirdSearchBar 
                                nowEnterprise={nowEnterpriseThird}
                                setSelectedIndustry={setSelectedIndustryThird}
                                setNowEnterprise={setNowEnterpriseThird}
                                // setSelectedYear={setSelectedYearThird}
                            />
                        </div>
                        <div id="thirdEPPosplashes">
                            <ChartHeader chartName={"全行业企业数字化散点图"} />
                            <ThirdEPPosplashes
                                w={thirdEPPosplashesWidth}
                                h={thirdEPPosplashesHeight}
                                selectedIndustry={selectedIndustryThird}
                                // selectedEnterprise={nowEnterpriseThird}
                                setNowEnterpriseThird={setNowEnterpriseThird}
                            />
                        </div>

                    </div>
                    <div id="thirdIRight">
                        <div id="thirdIRightTop">
                            <div id="thirdEPScoreIndiSD">
                                <ChartHeader chartName={"企业一级指标得分雷达图"} />
                                <ThirdEPScoreIndiSD
                                    w={thirdEPScoreIndiSDWidth}
                                    h={thirdEPScoreIndiSDHeight}
                                    selectedEnterprise={nowEnterpriseThird}
                                    selectedIndustry={selectedIndustryThird}
                                    // selectedYear={selectedYearThird}
                                />
                            </div>
                            <div id="thirdEPScoreIndiND">
                                <ChartHeader chartName={"企业二级指标得分堆叠图"} />
                                <ThirdEPScoreIndiND
                                    w={thirdEPScoreIndiNDWidth}
                                    h={thirdEPScoreIndiNDHeight}
                                    selectedEnterprise={nowEnterpriseThird}
                                    selectedIndustry={selectedIndustryThird}
                                    // selectedYear={selectedYearThird}
                                />

                            </div>
                        </div>
                        <div id="thirdEPdight">
                            <ChartHeader chartName={"企业数字化程度对比图"} />
                            <ThirdEPdight
                                w={thirdEPdightWidth}
                                h={thirdEPdightHeight}
                                selectedEnterprise={nowEnterpriseThird}
                                selectedIndustry={selectedIndustryThird}
                            />

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
