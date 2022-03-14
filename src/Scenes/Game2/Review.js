import React, { useEffect, useContext, useRef, useState } from 'react';
import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';

import { UserContext } from '../../components/BaseShot';
import { prePathUrl, generateStandardNum } from "../../components/CommonFunctions"

let timerList = []
//-0.5,1.25,5,-5
let randomList = []

export default function Review1({ _baseGeo, nextFunc }) {
    const audioList = useContext(UserContext)
    const starBaseList = Array.from({ length: 20 }, ref => useRef())
    const baseRef = useRef()

    if (randomList.length == 0)
        while (randomList.length != 20) {
            randomList.push(Math.floor(Math.random() * 6))
        }

    useEffect(
        () => {

            setTimeout(() => {
                starBaseList.map((star, index) => {
                    setTimeout(() => {
                        star.current.className = 'show'
                    }, 200 * index);
                })
            }, 1500);

            setTimeout(() => {
                nextFunc()
            }, 10000);
            return () => {
                randomList = []
            }
        }, []
    )

    return (
        <div ref={baseRef}
            className="aniObject"  >
            <div
                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.0 + "px",
                    bottom: _baseGeo.bottom + _baseGeo.height * 0.0 + "px",
                }}>


                {
                    Array.from(Array(20).keys()).map(value =>
                        <div
                            ref={starBaseList[value]}
                            className='hide'
                            onClick={() => { clickFunc(value, randomList[value]) }}
                            style={{
                                position: 'absolute',
                                width: '11%',
                                height: '11%',
                                cursor: 'pointer',
                                top: (0.13 + 0.19 * parseInt((value / 5))) * 100 + '%',
                                left: (0.13 + (value % 5) * 0.16) * 100 + '%',

                            }}>

                            < BaseImage
                                url={'SB54_Prop-Interactive/PI_Stone_0' + (randomList[value] + 1) + '.svg'}
                            />
                            < BaseImage
                                scale={0.5}
                                posInfo={{ l: 0.22, t: 0.08 }}
                                url={'SB54_Text-Interactive/TI_G2_' + generateStandardNum((value + 1) * 5) + '.svg'}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );

}
