import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import "./Theme.css";

const Theme = (props) => {
    var root = document.querySelector(':root');

    const Bg1colorSlector = () => {
        let darkColorLightness = '17%';
        let whiteColorLightness = '100%';
        let lightColorLightness = '95%';
        setTheme(lightColorLightness, whiteColorLightness, darkColorLightness)
    }

    const Bg2colorSlector = () => {
        let darkColorLightness = '95%';
        let whiteColorLightness = '20%';
        let lightColorLightness = '15%';
        setTheme(lightColorLightness, whiteColorLightness, darkColorLightness)
    }

    const Bg3colorSlector = () => {
        let darkColorLightness = '95%';
        let whiteColorLightness = '10%';
        let lightColorLightness = '0%';
        setTheme(lightColorLightness, whiteColorLightness, darkColorLightness)
    }

    const setTheme = (light, white, dark) => {
        root.style.setProperty('--light-color-lightness', light)
        root.style.setProperty('--white-color-ligthness', white)
        root.style.setProperty('--dark-color-lightness', dark)
    }



    // Move cursure
    const MovePointer = (HtmlLine) => {
        document.getElementById(HtmlLine).classList.add('MyClass')
    }
    // font size
    const fontSlector = (size) => {
        ChangeActive(size)
        if (size == "font-size-1") {
            MovePointer('font-size-1')
            size = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem')
            root.style.setProperty('--sticky-top-right', '5.4rem')
        } else if (size == "font-size-2") {
            MovePointer('font-size-2')
            size = '13px'
            root.style.setProperty('--sticky-top-left', '5.4rem')
            root.style.setProperty('--sticky-top-right', '-7rem')
        } else if (size == "font-size-3") {
            MovePointer('font-size-3')
            size = '16px'
            root.style.setProperty('--sticky-top-left', '-2rem')
            root.style.setProperty('--sticky-top-right', '-17rem')
        } else if (size == "font-size-4") {
            MovePointer('font-size-4')
            size = '19px'
            root.style.setProperty('--sticky-top-left', '-5rem')
            root.style.setProperty('--sticky-top-right', '-25rem')
        } else if (size == "font-size-5") {
            MovePointer('font-size-5')
            size = '22px'
            root.style.setProperty('--sticky-top-left', '-10rem')
            root.style.setProperty('--sticky-top-right', '-33rem')
        }
        document.querySelector("html").style.fontSize = size;
    }
    // COLOR SELECTOR
    const colorSlector = (color) => {
        let primaryHue = 0;
        if (color == "color-1") {
            primaryHue = 252
        } else if (color == "color-2") {
            primaryHue = 52
        } else if (color == "color-3") {
            primaryHue = 352
        } else if (color == "color-4") {
            primaryHue = 152
        } else if (color == "color-5") {
            primaryHue = 202
        }
        // color.classList.add('active')
        root.style.setProperty('--primary-color-hue', primaryHue);
    }



    // close with x
    const CloseThemModel = () => {
        const themeModel = document.querySelector(".customize-theme")
        themeModel.style.display = "none";
    }

    // // Close cliking outside
    // const ThemeModel = document.querySelector(".customize-theme")
    // if (ThemeModel) {
    //     ThemeModel.addEventListener('click', closeThemModel)
    // }

    // const closeThemModel = (event) => {
    //     if (event.target.classList.contains('customize-theme')) {
    //         ThemeModel.style.display = 'none'
    //     }
    // }

    // Change active
    const ChangeActive = (clsS) => {
        document.getElementById(clsS).className += " active"
    }

    return (
        <div>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <body>
                    {/* ================ THEME COSTUMAZATION ======================== */}
                    <div className="customize-theme">
                        {/* <i class="uil uil-multiply" id="closeCross" onClick={CloseThemModel}></i> */}
                        <div className="card">
                            <h2>Customize your view</h2>
                            <p className="text-muted">Manage your font size, color, and background</p>

                            {/* ============= FONT SIZES =============== */}
                            <div className="font-size">
                                <h4>Font Size</h4>
                                <div>
                                    <h6>Aa</h6>
                                    <div className="choose-size">
                                        <span className="font-size-1 " id="font-size-1" onClick={() => fontSlector("font-size-1")}></span>
                                        <span className="font-size-2" id="font-size-2" onClick={() => fontSlector("font-size-2")}></span>
                                        <span className="font-size-3 " id="font-size-3" onClick={() => fontSlector("font-size-3")}></span>
                                        <span className="font-size-4" id="font-size-4" onClick={() => fontSlector("font-size-4")}></span>
                                        <span className="font-size-5" id="font-size-5" onClick={() => fontSlector("font-size-5")}></span>

                                    </div>
                                    <h3>Aa</h3>
                                </div>
                            </div>

                            {/* ============= PRIMARY COLORSS ================== */}
                            <div className="color">
                                <h4>Color</h4>
                                <div className="choose-color">
                                    <span className="color-1 active" onClick={() => colorSlector("color-1")}></span>
                                    <span className="color-2 " onClick={() => colorSlector("color-2")}></span>
                                    <span className="color-3" onClick={() => colorSlector("color-3")}></span>
                                    <span className="color-4" onClick={() => colorSlector("color-4")}></span>
                                    <span className="color-5" onClick={() => colorSlector("color-5")}></span>
                                </div>
                            </div>

                            {/* ===========  BACKGROUND COLORS ================*/}
                            <div className="background">
                                <h4>Background</h4>
                                <div className="choose-bg">
                                    <div className="bg-1 active">
                                        <span></span>
                                        <h5 for="bg-1 " onClick={() => Bg1colorSlector()}>Light</h5>
                                    </div>
                                    <div className="bg-2" onClick={() => Bg2colorSlector()}>
                                        <span></span>
                                        <h5>Dim</h5>
                                    </div>
                                    <div className="bg-3" onClick={() => Bg3colorSlector()}>
                                        <span></span>
                                        <h5 for="bg-3">Lights Out</h5>
                                    </div>
                                </div>
                            </div>

                            {/* ============ CLOSE ================= */}
                            <div className="bg-3" >
                                <span onClick={CloseThemModel}  style={{cursor:'pointer', color:'var(--color-primary)', fontSize:"1.5rem"}}><IoMdCloseCircle  /></span>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        </div>
    )
}

export default Theme;