
import {jsx as $jfvX2$jsx, Fragment as $jfvX2$Fragment, jsxs as $jfvX2$jsxs} from "react/jsx-runtime";
import "react";



var $988cad346d749f4e$export$a279c5c553241f38;
$988cad346d749f4e$export$a279c5c553241f38 = "introduction";




const $833d1db9b1ee4caf$export$f99233281efd08a0 = ({ options: options  })=>{
    return /*#__PURE__*/ $jfvX2$jsx("h2", {
        children: options?.value
    });
};
var $833d1db9b1ee4caf$export$2e2bcd8739ae039 = {
    Title: $833d1db9b1ee4caf$export$f99233281efd08a0
};




const $7febe16ab4820687$export$cf345ef34cd72655 = ({ options: options  })=>{
    return /*#__PURE__*/ $jfvX2$jsx("h3", {
        children: options.value
    });
};
var $7febe16ab4820687$export$2e2bcd8739ae039 = {
    Subtitle: $7febe16ab4820687$export$cf345ef34cd72655
};




const $9059925502880ccd$export$4b2c32e08f77ff18 = ({ options: options  })=>{
    return /*#__PURE__*/ $jfvX2$jsx("p", {
        children: options.value
    });
};
var $9059925502880ccd$export$2e2bcd8739ae039 = {
    Body: $9059925502880ccd$export$4b2c32e08f77ff18
};




const $d630c8c2ef19ad09$export$b5f2c46c0231ba4e = ()=>{
    return /*#__PURE__*/ $jfvX2$jsx("hr", {});
};
var $d630c8c2ef19ad09$export$2e2bcd8739ae039 = {
    LineDivider: $d630c8c2ef19ad09$export$b5f2c46c0231ba4e
};




const $75d1c3326a379448$export$e25b75e5623c2c82 = ({ options: options  })=>{
    return /*#__PURE__*/ $jfvX2$jsxs("h6", {
        children: [
            options.value,
            " minutes"
        ]
    });
};
var $75d1c3326a379448$export$2e2bcd8739ae039 = {
    CourseDuration: $75d1c3326a379448$export$e25b75e5623c2c82
};




const $090815f5086f7f29$export$cc4d8724d022ebe5 = ({ manifest: manifest  })=>{
    const titleConfig = manifest.title;
    const subtitleConfig = manifest.subtitle;
    const courseDurationConfig = manifest.courseDuration;
    const bodyConfig = manifest.body;
    if (titleConfig.type !== "text") {
        console.error("Title value not a string!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    if (subtitleConfig.type !== "text") {
        console.error("Subtitle value not a string!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    if (courseDurationConfig.type !== "number") {
        console.error("Course Duration value not a number!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    if (bodyConfig.type !== "textarea") {
        console.error("Title value not a string");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    return /*#__PURE__*/ $jfvX2$jsxs("div", {
        className: $988cad346d749f4e$export$a279c5c553241f38,
        children: [
            /*#__PURE__*/ $jfvX2$jsx($833d1db9b1ee4caf$export$f99233281efd08a0, {
                options: titleConfig
            }),
            /*#__PURE__*/ $jfvX2$jsx($75d1c3326a379448$export$e25b75e5623c2c82, {
                options: courseDurationConfig
            }),
            /*#__PURE__*/ $jfvX2$jsx($d630c8c2ef19ad09$export$b5f2c46c0231ba4e, {}),
            /*#__PURE__*/ $jfvX2$jsx($7febe16ab4820687$export$cf345ef34cd72655, {
                options: subtitleConfig
            }),
            /*#__PURE__*/ $jfvX2$jsx($9059925502880ccd$export$4b2c32e08f77ff18, {
                options: bodyConfig
            })
        ]
    });
};
var $090815f5086f7f29$export$2e2bcd8739ae039 = {
    Introduction: $090815f5086f7f29$export$cc4d8724d022ebe5
};


export {$090815f5086f7f29$export$cc4d8724d022ebe5 as Introduction, $090815f5086f7f29$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=template-introduction.js.map
