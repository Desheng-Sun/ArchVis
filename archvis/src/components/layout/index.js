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
// import SecondIndicatorsRdExplain from "../secondComponents/indicatorsExplain";
import SecondIndicators from "../secondComponents/indicatorsBreakdown";
import SecondIndiRDRank from "../secondComponents/indiRdRank";


import ThirdSearchBar from "../thirdComponents/searchBar";
import ThirdEPPosplashes from "../thirdComponents/ePPosplashes";
import ThirdEPScoreIndiSD from "../thirdComponents/EPScoreIndiSD";
import ThirdEPScoreIndiND from "../thirdComponents/EPScoreIndiND";
import ThirdEPdight from "../thirdComponents/EPDight";

import { getArchScore } from '../../apis/api';

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
    // 获取每一个企业的每一项指标得分和每一项指标的当前权重
    const [construScore, setConstruScore] = useState()
    const [designScore, setDesignScore] = useState()
    // 获取所有的年份
    const [allDate, setAllDate] = useState([])

    // 第一屏 用户选择的行业
    const [selectdIndustryFirst, setSelectdIndustryFirst] = useState(["施工行业", "设计行业"])
    // 第一屏 用户选择的指标
    const [selectedIndexFirst, setSelectedIndexFirst] = useState(["基本指标", "数字研发创新指标", "组织指标", "战略指标", "行业特色指标"])
    // 第一屏 用户选择的地区
    const [selectedRegionFirst, setSelectedRegionFirst] = useState(["东北", "华北", "华东", "华中", "华南", "西北", "西南", "港澳台"])
    // 第一屏，用户选择的时间
    const [selectedYearFirst, setSelectedYearFirst] = useState(2019)
    // 第一屏，用户当前点击的公司
    const [selectedCompanyFirst, setSelectedCompanyFirst] = useState()


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
    const [nowEnterpriseThird, setNowEnterpriseThird] = useState("美丽生态");
    // 第三屏，用户选择的年份
    // const [selectedYearThird, setSelectedYearThird] = useState(["2019"]);

    // 当前页面所在第几屏上
    const [nowPageIndex, setNowPageIndex] = useState("thirdButton")

    // 第一屏各个组件的长宽
    const [firstIndicatorsWidth, setFirstIndicatorsWidth] = useState(0);
    const [firstIndicatorsHeight, setFirstIndicatorsHeight] = useState(0);
    const [firstArchMapWidth, setFirstArchMapWidth] = useState(0);
    const [firstArchMapHeight, setFirstArchMapHeight] = useState(0);
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

    useEffect(() => {
        getArchScore('constru').then((res) => {
            setConstruScore(res)
            let useDate = []
            for (let i in res) {
                useDate.push(parseInt(i))
            }
            setAllDate(useDate)
        })
        getArchScore('design').then((res) => {
            setDesignScore(res)
        })
    }, [])

    return (
        <div id="layout">
            <div id="ititle">
                <div id="title">中国上市建筑企业数字化转型可视化动态监测平台</div>
                <div id="systemIntroduction">
                    总体介绍：在数字经济的背景下，为衡量全国建筑行业各上市企业数字化程度及其特征，本项目以万科、深振业等128家国内建筑业上市企业（包含设计、施工）为主体，以2019-2021年为时间区间，构建了一套针对建筑行业数字化转型水平的评价指标体系，该指标体系囊括财务、科创、规模等方面，包含6个一级指标，18个二级指标，63个三级指标。根据来自CSMAR数据库、wind数据库的相关数据，本项目采用熵权法客观评价全国建筑企业数字化水平，从多个方面分析处理数据，并将分析结果通过可交互的可视化图表进行展示，即“中国上市建筑企业数字化转型可视化动态监测平台”。
                </div>
            </div>
            <div id="changeButton">
                <ChangePageButton
                    id="firstButton"
                    text="建筑行业数字化情况总览————宏观"
                ></ChangePageButton>
                <ChangePageButton
                    id="secondButton"
                    text="建筑企业间数字化指标对比————中观"
                ></ChangePageButton>
                <ChangePageButton
                    id="thirdButton"
                    text="单个企业数字化指标详情————微观"
                ></ChangePageButton>
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
                                    selectedYearFirst={selectedYearFirst}
                                    selectdIndustryFirst={selectdIndustryFirst}
                                    setSelectedRegionFirst={setSelectedRegionFirst}
                                    setSelectedYearFirst={setSelectedYearFirst}
                                    allDate={allDate}
                                />
                            </div>
                            <div id="firstArchList">
                                <ChartHeader chartName={"全国建筑业上市企业名单"} />
                                <FirstArchList
                                    selectedRegionFirst={selectedRegionFirst}
                                    selectedYearFirst={selectedYearFirst}
                                    selectdIndustryFirst={selectdIndustryFirst}
                                    setSelectedCompanyFirst={setSelectedCompanyFirst}
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
                                selectedCompanyFirst={selectedCompanyFirst}
                                construScore={construScore}
                                designScore={designScore}
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
                                allDate={allDate}
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
                                construScore={construScore}
                                designScore={designScore}
                                allDate={allDate}
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
                                    construScore={construScore}
                                    designScore={designScore}
                                    allDate={allDate}
                                // selectedYear={selectedYearThird}
                                />
                            </div>
                            <div id="thirdEPScoreIndiND">
                                <ChartHeader chartName={"企业数字化程度对比图"} />
                                <ThirdEPdight
                                    w={thirdEPdightWidth}
                                    h={thirdEPdightHeight}
                                    selectedIndustry={selectedIndustryThird}
                                    selectedEnterprise={nowEnterpriseThird}
                                    construScore={construScore}
                                    designScore={designScore}
                                    allDate={allDate}
                                />
                            </div>
                        </div>
                        <div id="thirdEPdight">
                            <ChartHeader chartName={"企业二级指标得分堆叠图"} />
                            <ThirdEPScoreIndiND
                                w={thirdEPScoreIndiNDWidth}
                                h={thirdEPScoreIndiNDHeight}
                                selectedEnterprise={nowEnterpriseThird}
                                selectedIndustry={selectedIndustryThird}
                                // selectedYear={selectedYearThird}
                                construScore={construScore}
                                designScore={designScore}
                                allDate={allDate}
                            />
                        </div>
                    </div>
                </div>
            }
            <div id = "patentDescription">
            版权说明 <br/>
            重庆大学中国上市建筑企业数字化转型可视化动态监测平台<br/>
            重庆大学管理科学与房地产学院毛超教授项目团队版权所有CopyRight@copy2022
            </div>
        </div>
    )
}
