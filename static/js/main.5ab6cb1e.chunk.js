(this["webpackJsonptpalacino.github.io"]=this["webpackJsonptpalacino.github.io"]||[]).push([[0],{118:function(e,t,n){},119:function(e,t,n){},120:function(e,t,n){},126:function(e,t,n){},127:function(e,t,n){},128:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),o=n(48),r=n.n(o),s=(n(118),n(30)),i=n(12),l=n(184),u=n(188),d=n(74),j=(n(119),n(182)),m=n(3),h=function(e){var t=e.item;return Object(c.useEffect)((function(){document.title="Troy's Desktop - ".concat(t.title)}),[t]),a.a.createElement(t.component)},b=n(92),p=n(189),O=n(38),x=(n(120),n(2)),f=function(e){var t=e.menuItems,n=e.isOpen,c=e.onMenuItemClicked;return Object(x.jsx)(u.a,{className:"Menu",style:{display:n?"unset":"none"},children:t.length>0?t.map((function(e){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(d.a,{className:"MenuItem",grow:!0,children:Object(x.jsx)(O.b,{to:e.path,onClick:function(){return c()},children:Object(x.jsx)(b.a,{iconProps:{iconName:e.iconName},title:e.title,children:e.title})})},e.path),Object(x.jsx)("div",{className:"MenuItemSeparator"})]})})):Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(d.a,{className:"MenuItem",grow:!0,children:Object(x.jsx)(p.a,{variant:"medium",children:"No menu items to show"})},"noItems")})})},g=(n(126),n(190)),k=(n(127),-1),w=function(){var e=Object(c.useState)({hasClockData:!1,hours:"0",minutes:"00",seconds:"00",part:"AM"}),t=Object(s.a)(e,2),n=t[0],a=t[1];Object(c.useEffect)((function(){return o(),k=window.setInterval(o,1e3),function(){k>=0&&window.clearInterval(k)}}),[]);var o=function(){var e=new Date,t=e.getHours(),n=e.getMinutes(),c=e.getSeconds();a({hasClockData:!0,hours:(0===t?12:t>12?t-12:t).toString(),minutes:n.toString().padStart(2,"0"),seconds:c.toString().padStart(2,"0"),part:t<12?"AM":"PM"})};return Object(x.jsx)(x.Fragment,{children:n.hasClockData&&Object(x.jsxs)(g.a,{className:"Clock",children:[n.hours,":",n.minutes,":",n.seconds," ",n.part]})})},v=function(e){var t=e.activePath,n=e.dockItems,c=e.onMenuClicked,a=e.onMenuItemClicked;return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(u.a,{className:"Dock",horizontal:!0,tokens:{childrenGap:2},children:[Object(x.jsx)(d.a,{children:Object(x.jsx)(b.a,{iconProps:{iconName:"WindowsLogo"},onClick:c,title:"Menu"})}),n.length>0&&n.map((function(e){return Object(x.jsx)(d.a,{children:Object(x.jsx)(O.b,{to:e.path,onClick:function(){return a()},children:Object(x.jsx)(b.a,{className:t===e.path?"active":"",title:e.title,iconProps:{iconName:e.iconName}})})},e.path)})),Object(x.jsx)(d.a,{align:"center",children:Object(x.jsx)(w,{})})]})})},C=function(){return Object(x.jsx)(x.Fragment,{})},I=function(){return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(u.a,{tokens:{childrenGap:30},children:[Object(x.jsxs)(u.a,{tokens:{childrenGap:10},children:[Object(x.jsx)(p.a,{variant:"xLarge",children:"Bugs"}),Object(x.jsx)(p.a,{variant:"medium",children:"If you have any issues using a tool on this site, please create an issue in the repo and tag it with as a bug."})]}),Object(x.jsxs)(u.a,{tokens:{childrenGap:10},children:[Object(x.jsx)(p.a,{variant:"xLarge",children:"Ideas"}),Object(x.jsx)(p.a,{variant:"medium",children:"If you find this site useful and want to share an idea for a tool that would make it more useful, please create an issue in the repo and tag it with as a request."})]}),Object(x.jsxs)(u.a,{tokens:{childrenGap:10},horizontalAlign:"start",children:[Object(x.jsx)(p.a,{variant:"medium",children:"You will need to have a GitHub account to create the feedback item. (Don't worry it's completely free)"}),Object(x.jsx)(b.a,{href:"https://github.com/tpalacino/tpalacino.github.io/issues/new",target:"_blank","data-intercaption":"off",children:"GitHub Repo"})]})]})})},y=n(16),P=n(185),N=n(181),M=n(180),F=function(){var e=Object(c.useState)({mode:"decode",encodeValue:"",decodeValue:"",results:"",canProcess:!1}),t=Object(s.a)(e,2),n=t[0],a=t[1],o=function(e,t,n){var c=!1;switch(e){case"decode":case"decodeComponent":c=!!n&&n.trim().length>0;break;case"encode":case"encodeComponent":c=!!t&&t.trim().length>0}return c};return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(u.a,{className:"UrlEncoder",tokens:{childrenGap:20},children:[("decode"===n.mode||"decodeComponent"===n.mode)&&Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(P.a,{label:"Decode",multiline:!0,value:n.decodeValue,rows:10,onChange:function(e,t){var c=t||"";a(Object(y.a)(Object(y.a)({},n),{},{decodeValue:c,canProcess:o(n.mode,n.encodeValue,c),results:""}))}})}),("encode"===n.mode||"encodeComponent"===n.mode)&&Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(P.a,{label:"Encode",multiline:!0,value:n.encodeValue,rows:10,onChange:function(e,t){var c=t||"";a(Object(y.a)(Object(y.a)({},n),{},{encodeValue:c,canProcess:o(n.mode,c,n.decodeValue),results:""}))}})}),Object(x.jsx)(P.a,{label:"Results",multiline:!0,value:n.results,rows:10,readOnly:!0}),Object(x.jsxs)(u.a,{horizontal:!0,grow:!0,tokens:{childrenGap:10},children:[Object(x.jsx)(N.a,{dropdownWidth:"auto",selectedKey:n.mode,onChange:function(e,t){var c=n.mode;t&&t.key&&(c=t.key),a(Object(y.a)(Object(y.a)({},n),{},{mode:c,canProcess:o(c,n.encodeValue,n.decodeValue),results:""}))},options:[{key:"decode",text:"Decode URI"},{key:"decodeComponent",text:"Decode URI Component"},{key:"encode",text:"Encode URI"},{key:"encodeComponent",text:"Encode URI Component"}]}),Object(x.jsx)(M.a,{text:"Process",disabled:!n.canProcess,onClick:function(){if(n.canProcess){var e="";try{switch(n.mode){case"decode":e=decodeURI(n.decodeValue);break;case"decodeComponent":e=decodeURIComponent(n.decodeValue);break;case"encode":e=encodeURI(n.encodeValue);break;case"encodeComponent":e=encodeURIComponent(n.encodeValue)}}catch(c){var t=c;e=t&&t.message?t.message:"".concat(t)}a(Object(y.a)(Object(y.a)({},n),{},{results:e||""}))}}})]})]})})},D=function(){var e=Object(c.useState)({mode:"exec",pattern:"",input:"",replacement:"",results:"",canProcess:!1}),t=Object(s.a)(e,2),n=t[0],a=t[1],o=function(e,t,n){var c=!1;switch(e){case"test":case"exec":c=!!t&&t.trim().length>0;break;case"replace":c=!!t&&t.trim().length>0&&!!n&&n.trim().length>0}return c};return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(u.a,{className:"Regex",tokens:{childrenGap:20},children:[Object(x.jsx)(P.a,{label:"Pattern",multiline:!0,value:n.pattern,rows:5,onChange:function(e,t){var c=t||"";a(Object(y.a)(Object(y.a)({},n),{},{pattern:c,canProcess:o(n.mode,c,n.replacement)}))}}),Object(x.jsx)(P.a,{label:"Input",multiline:!0,value:n.input,rows:5,onChange:function(e,t){var c=t||"";a(Object(y.a)(Object(y.a)({},n),{},{input:c}))}}),"replace"===n.mode&&Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(P.a,{label:"Replacement",multiline:!0,value:n.replacement,rows:5,onChange:function(e,t){var c=t||"";a(Object(y.a)(Object(y.a)({},n),{},{replacement:c,canProcess:o(n.mode,n.pattern,c)}))}})}),Object(x.jsx)(P.a,{label:"Results",multiline:!0,value:n.results,rows:10,readOnly:!0}),Object(x.jsxs)(u.a,{horizontal:!0,grow:!0,tokens:{childrenGap:10},children:[Object(x.jsx)(N.a,{selectedKey:n.mode,onChange:function(e,t){var c=n.mode;t&&t.key&&(c=t.key),a(Object(y.a)(Object(y.a)({},n),{},{mode:c,canProcess:o(c,n.pattern,n.replacement)}))},options:[{key:"exec",text:"Match"},{key:"test",text:"Is Match"},{key:"replace",text:"Replace"}]}),Object(x.jsx)(M.a,{text:"Process",disabled:!n.canProcess,onClick:function(){if(n.canProcess){var e="";try{var t=new RegExp(n.pattern);switch(n.mode){case"exec":var c=t.exec(n.input);c&&(e=JSON.stringify(c,null,4));break;case"test":e="".concat(t.test(n.input));break;case"replace":e=n.input.replace(t,n.replacement)}}catch(r){var o=r;e=o&&o.message?o.message:"".concat(o)}a((function(t){return Object(y.a)(Object(y.a)({},t),{},{results:e||""})}))}}})]})]})})},R=function(){return Object(x.jsx)(x.Fragment,{children:"Page Not Found"})},E=Object(m.p)({palette:{themePrimary:"#a8a8a8",themeLighterAlt:"#070707",themeLighter:"#1b1b1b",themeLight:"#323232",themeTertiary:"#656565",themeSecondary:"#949494",themeDarkAlt:"#b1b1b1",themeDark:"#bdbdbd",themeDarker:"#cecece",neutralLighterAlt:"#4a4a4a",neutralLighter:"#525252",neutralLight:"#5e5e5e",neutralQuaternaryAlt:"#656565",neutralQuaternary:"#6b6b6b",neutralTertiaryAlt:"#848484",neutralTertiary:"#c8c8c8",neutralSecondary:"#d0d0d0",neutralPrimaryAlt:"#dadada",neutralPrimary:"#ffffff",neutralDark:"#f4f4f4",black:"#f8f8f8",white:"#424242"}});Object(j.a)();var L=function(){var e=!1,t=[{title:"Home",path:"",iconName:"Home",component:C,showInDock:!0,showInMenu:!1,excludeRoute:!0},{title:"Feedback",path:"/tools/feedback",iconName:"Feedback",component:I,showInDock:!1,showInMenu:!0},{title:"URL Encoder",path:"/tools/url-encoder",iconName:"ChangeEntitlements",component:F,showInDock:!0,showInMenu:!0},{title:"Regex Tester",path:"/tools/regex-tester",iconName:"TestBeaker",component:D,showInDock:!0,showInMenu:!0}],n=Object(c.useState)(!1),a=Object(s.a)(n,2),o=a[0],r=a[1],j=function(){e=o},m=function(){window.setTimeout((function(){e&&(e=!1,r(!1))}),10)},b=function(){o&&r(!1)};return Object(c.useEffect)((function(){return window.addEventListener("mousedown",j),window.addEventListener("mouseup",m),function(){window.removeEventListener("mousedown",j),window.removeEventListener("mouseup",m)}})),Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(l.a,{theme:E,children:Object(x.jsxs)(u.a,{className:"App",verticalFill:!0,children:[Object(x.jsx)(d.a,{className:"AppContent",grow:!0,children:Object(x.jsxs)(i.c,{children:[t.filter((function(e){return!e.excludeRoute})).map((function(e){return Object(x.jsx)(i.a,{exact:!0,path:e.path,component:function(){return Object(x.jsx)(h,{item:e})}},e.path)})),Object(x.jsx)(i.a,{exact:!0,path:"",component:C},"HomeRoute"),Object(x.jsx)(i.a,{component:R},"NotFoundRoute")]})}),Object(x.jsx)(f,{isOpen:o,menuItems:t.filter((function(e){return e.showInMenu})),onMenuItemClicked:b}),Object(x.jsx)(d.a,{className:"AppDock",shrink:!0,children:Object(x.jsx)(v,{activePath:window.location.pathname,dockItems:t.filter((function(e){return e.showInDock})),onMenuClicked:function(){r(!o)},onMenuItemClicked:b})})]})})})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,194)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),o(e),r(e)}))};r.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(O.a,{basename:"/".concat(""),children:Object(x.jsx)(L,{})})}),document.getElementById("root")),S()}},[[128,1,2]]]);
//# sourceMappingURL=main.5ab6cb1e.chunk.js.map