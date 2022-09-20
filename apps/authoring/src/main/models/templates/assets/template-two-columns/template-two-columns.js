
import {jsx as $jfvX2$jsx, jsxs as $jfvX2$jsxs} from "react/jsx-runtime";
import {Fragment as $jfvX2$Fragment} from "react";



var $988cad346d749f4e$export$c862b61b432a54ca;
var $988cad346d749f4e$export$466ec1a38658fdaa;
var $988cad346d749f4e$export$e908cef0cccb98df;
var $988cad346d749f4e$export$61cbe6275f94f0ec;
$988cad346d749f4e$export$c862b61b432a54ca = "two-columns";
$988cad346d749f4e$export$466ec1a38658fdaa = "two-columns";
$988cad346d749f4e$export$e908cef0cccb98df = "column-container";
$988cad346d749f4e$export$61cbe6275f94f0ec = "column-container";




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




const $d630c8c2ef19ad09$export$b5f2c46c0231ba4e = ()=>{
    return /*#__PURE__*/ $jfvX2$jsx("hr", {});
};
var $d630c8c2ef19ad09$export$2e2bcd8739ae039 = {
    LineDivider: $d630c8c2ef19ad09$export$b5f2c46c0231ba4e
};




const $de8b76b821c3fa7f$export$816b5d811295e6bc = ({ options: options  })=>{
    return /*#__PURE__*/ $jfvX2$jsx("textarea", {
        rows: 4,
        placeholder: options.value
    });
};
var $de8b76b821c3fa7f$export$2e2bcd8739ae039 = {
    Column: $de8b76b821c3fa7f$export$816b5d811295e6bc
};




const $090815f5086f7f29$export$400aab69decaa6c5 = ({ manifest: manifest  })=>{
    const titleConfig = manifest.title;
    const subtitleConfig = manifest.subtitle;
    const columnOneConfig = manifest.columnOne;
    const columnTwoConfig = manifest.columnTwo;
    if (titleConfig.type !== "text") {
        console.error("Title value not a string!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    if (subtitleConfig.type !== "text") {
        console.error("Subtitle value not a string!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    if (columnOneConfig.type !== "text") {
        console.error("Column one value not a string!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    if (columnTwoConfig.type !== "text") {
        console.error("Column two value not a string!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    return /*#__PURE__*/ $jfvX2$jsxs("div", {
        className: $988cad346d749f4e$export$466ec1a38658fdaa,
        children: [
            /*#__PURE__*/ $jfvX2$jsx($833d1db9b1ee4caf$export$f99233281efd08a0, {
                options: titleConfig
            }),
            /*#__PURE__*/ $jfvX2$jsx($d630c8c2ef19ad09$export$b5f2c46c0231ba4e, {}),
            /*#__PURE__*/ $jfvX2$jsx($7febe16ab4820687$export$cf345ef34cd72655, {
                options: subtitleConfig
            }),
            /*#__PURE__*/ $jfvX2$jsxs("div", {
                className: $988cad346d749f4e$export$61cbe6275f94f0ec,
                children: [
                    /*#__PURE__*/ $jfvX2$jsx($de8b76b821c3fa7f$export$816b5d811295e6bc, {
                        options: columnOneConfig
                    }),
                    /*#__PURE__*/ $jfvX2$jsx($de8b76b821c3fa7f$export$816b5d811295e6bc, {
                        options: columnTwoConfig
                    })
                ]
            })
        ]
    });
};
var $090815f5086f7f29$export$2e2bcd8739ae039 = {
    TwoColumns: $090815f5086f7f29$export$400aab69decaa6c5
};


export {$090815f5086f7f29$export$400aab69decaa6c5 as TwoColumns, $090815f5086f7f29$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=template-two-columns.js.map
