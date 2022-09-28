
import {jsx as $jfvX2$jsx, Fragment as $jfvX2$Fragment, jsxs as $jfvX2$jsxs} from "react/jsx-runtime";
import "react";



var $988cad346d749f4e$export$102ad91be0529836;
var $988cad346d749f4e$export$44c6239f2bb2100c;
$988cad346d749f4e$export$102ad91be0529836 = "bullet-points";
$988cad346d749f4e$export$44c6239f2bb2100c = "bullet-points";




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




const $b54ea5252f42aa42$export$54c2e3dc7acea9f5 = ({ options: options  })=>{
    return /*#__PURE__*/ $jfvX2$jsx("ul", {
        children: options.value.map((item, idx)=>{
            return /*#__PURE__*/ $jfvX2$jsx("li", {
                children: item
            }, idx);
        })
    });
};
var $b54ea5252f42aa42$export$2e2bcd8739ae039 = {
    List: $b54ea5252f42aa42$export$54c2e3dc7acea9f5
};




const $090815f5086f7f29$export$589f2adab9d39941 = ({ manifest: manifest  })=>{
    const titleConfig = manifest.title;
    const subtitleConfig = manifest.subtitle;
    const listConfig = manifest.list;
    console.log("manifest", manifest);
    if (titleConfig.type !== "text") {
        console.error("Title value not a string!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    if (subtitleConfig.type !== "text") {
        console.error("Subtitle value not a string!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    if (listConfig.type !== "listText") {
        console.error("List value must be an array of strings!");
        return /*#__PURE__*/ $jfvX2$jsx($jfvX2$Fragment, {});
    }
    return /*#__PURE__*/ $jfvX2$jsxs("div", {
        className: $988cad346d749f4e$export$44c6239f2bb2100c,
        children: [
            /*#__PURE__*/ $jfvX2$jsx($833d1db9b1ee4caf$export$f99233281efd08a0, {
                options: titleConfig
            }),
            /*#__PURE__*/ $jfvX2$jsx($d630c8c2ef19ad09$export$b5f2c46c0231ba4e, {}),
            /*#__PURE__*/ $jfvX2$jsx($7febe16ab4820687$export$cf345ef34cd72655, {
                options: subtitleConfig
            }),
            /*#__PURE__*/ $jfvX2$jsx($b54ea5252f42aa42$export$54c2e3dc7acea9f5, {
                options: listConfig
            })
        ]
    });
};
var $090815f5086f7f29$export$2e2bcd8739ae039 = {
    BulletPoints: $090815f5086f7f29$export$589f2adab9d39941
};


export {$090815f5086f7f29$export$589f2adab9d39941 as BulletPoints, $090815f5086f7f29$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=template-bullet-points.js.map
