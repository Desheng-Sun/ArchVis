import "./index.css";
import { useCallback, useState, useEffect } from "react";


import FirstIndicators from "../firstComponents/indicatorsSt"
import FirstSearchBar from "../firstComponents/searchBar";
import FirstArchMap from "../firstComponents/archMap";

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

    const [nowPageIndex, setNowPageIndex] = useState("firstButton")

    const [firstIndicatorsWidth, setFirstIndicatorsWidth] = useState(0);
    const [firstIndicatorsHeight, setFirstIndicatorsHeight] = useState(0);
    const [firstArchMapWidth, setFirstArchMapWidth] = useState(0);
    const [firstArchMapHeight, setFirstArchMapHeight] = useState(0);


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

                            </div>
                        </div>
                        <div id="firstArchrank">

                        </div>
                    </div>
                </div>
            }
            {
                nowPageIndex === "secondButton" &&
                <div id="viewList">
                    <div id="secondILeft">
                        <div id="secondSearchbar">

                        </div>
                        <div id="secondIndicators">

                        </div>

                    </div>
                    <div id="secondIRight">
                        <div id="secondIRightTop">
                            <div id="secondSelectIndiND">

                            </div>
                            <div id="secondSelectIndiRD">

                            </div>
                            <div id="secondIndiRDExplane">

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

                        </div>
                        <div id="thirdEPPosplashes">

                        </div>

                    </div>
                    <div id="thirdIRight">
                        <div id="thirdIRightTop">
                            <div id="thirdEPScoreIndiSD">

                            </div>
                            <div id="thirdEPScoreIndiND">

                            </div>
                        </div>
                        <div id="thiedEPdigit">

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
