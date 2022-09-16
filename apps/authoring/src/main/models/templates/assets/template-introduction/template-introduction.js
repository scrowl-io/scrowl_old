import {jsx as $cnYxl$jsx, jsxs as $cnYxl$jsxs} from "react/jsx-runtime";
import {Fragment as $cnYxl$Fragment} from "react";



var $e6dd8db320da79b0$export$a279c5c553241f38;
$e6dd8db320da79b0$export$a279c5c553241f38 = "introduction";




const $0c37f4597547c8d9$export$f99233281efd08a0 = ({ options: options  })=>{
    return /*#__PURE__*/ $cnYxl$jsx("h2", {
        children: options?.value
    });
};
var $0c37f4597547c8d9$export$2e2bcd8739ae039 = {
    Title: $0c37f4597547c8d9$export$f99233281efd08a0
};




const $e56295a960a3f59f$export$cf345ef34cd72655 = ({ options: options  })=>{
    return /*#__PURE__*/ $cnYxl$jsx("h3", {
        children: options.value
    });
};
var $e56295a960a3f59f$export$2e2bcd8739ae039 = {
    Subtitle: $e56295a960a3f59f$export$cf345ef34cd72655
};




const $7942fd188ef5c16c$export$4b2c32e08f77ff18 = ({ options: options  })=>{
    return /*#__PURE__*/ $cnYxl$jsx("p", {
        children: options.value
    });
};
var $7942fd188ef5c16c$export$2e2bcd8739ae039 = {
    Body: $7942fd188ef5c16c$export$4b2c32e08f77ff18
};




const $bfdf1b741a149fd4$export$b5f2c46c0231ba4e = ()=>{
    return /*#__PURE__*/ $cnYxl$jsx("hr", {});
};
var $bfdf1b741a149fd4$export$2e2bcd8739ae039 = {
    LineDivider: $bfdf1b741a149fd4$export$b5f2c46c0231ba4e
};




const $a592028d11f9fd57$export$e25b75e5623c2c82 = ({ options: options  })=>{
    return /*#__PURE__*/ $cnYxl$jsxs("h6", {
        children: [
            options.value,
            " minutes"
        ]
    });
};
var $a592028d11f9fd57$export$2e2bcd8739ae039 = {
    CourseDuration: $a592028d11f9fd57$export$e25b75e5623c2c82
};




const $75f7b099a28f3f2c$export$cc4d8724d022ebe5 = ({ manifest: manifest  })=>{
    const titleConfig = manifest.title;
    const subtitleConfig = manifest.subtitle;
    const courseDurationConfig = manifest.courseDuration;
    const bodyConfig = manifest.body;
    if (titleConfig.type !== "text") {
        console.error("Title value not a string!");
        return /*#__PURE__*/ $cnYxl$jsx($cnYxl$Fragment, {});
    }
    if (subtitleConfig.type !== "text") {
        console.error("Subtitle value not a string!");
        return /*#__PURE__*/ $cnYxl$jsx($cnYxl$Fragment, {});
    }
    if (courseDurationConfig.type !== "number") {
        console.error("Course Duration value not a number!");
        return /*#__PURE__*/ $cnYxl$jsx($cnYxl$Fragment, {});
    }
    if (bodyConfig.type !== "textarea") {
        console.error("Title value not a string");
        return /*#__PURE__*/ $cnYxl$jsx($cnYxl$Fragment, {});
    }
    return /*#__PURE__*/ $cnYxl$jsxs("div", {
        className: $e6dd8db320da79b0$export$a279c5c553241f38,
        children: [
            /*#__PURE__*/ $cnYxl$jsx($0c37f4597547c8d9$export$f99233281efd08a0, {
                options: titleConfig
            }),
            /*#__PURE__*/ $cnYxl$jsx($a592028d11f9fd57$export$e25b75e5623c2c82, {
                options: courseDurationConfig
            }),
            /*#__PURE__*/ $cnYxl$jsx($bfdf1b741a149fd4$export$b5f2c46c0231ba4e, {}),
            /*#__PURE__*/ $cnYxl$jsx($e56295a960a3f59f$export$cf345ef34cd72655, {
                options: subtitleConfig
            }),
            /*#__PURE__*/ $cnYxl$jsx($7942fd188ef5c16c$export$4b2c32e08f77ff18, {
                options: bodyConfig
            })
        ]
    });
};
var $75f7b099a28f3f2c$export$2e2bcd8739ae039 = {
    Introduction: $75f7b099a28f3f2c$export$cc4d8724d022ebe5
};


//# sourceMappingURL=template-introduction.js.map
