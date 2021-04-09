(this["webpackJsonpcode-editor"]=this["webpackJsonpcode-editor"]||[]).push([[0],{11:function(_,e,t){"use strict";t.d(e,"a",(function(){return s}));t(1),t(22),t(23),t(24);var r=t(12),a=t(0);function s(_){var e=_.value,t=_.onChange;return Object(a.jsx)("div",{className:"editor-container",children:Object(a.jsx)(r.Controlled,{className:"editor",value:e,onBeforeChange:function(_,e,r){t(r)},options:{mode:"javascript",theme:"material",fontSize:20,lint:!0,lineNumbers:!0,lineWrapping:!0}})})}},13:function(_,e,t){"use strict";t.r(e);var r=t(1),a=t.n(r),s=t(7),o=t.n(s),n=t(8),c=t(0);o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(n.a,{})}),document.getElementById("root"))},19:function(_,e,t){},8:function(module,__webpack_exports__,__webpack_require__){"use strict";var D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5),D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(9),D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__),_App_css__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(19),_App_css__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_4__),download_as_file__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(10),download_as_file__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(download_as_file__WEBPACK_IMPORTED_MODULE_5__),_Editor__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(11),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(0),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);function App(){var filenameInput=Object(react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null),_useState=Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(""),_useState2=Object(D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a)(_useState,2),code=_useState2[0],setCode=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(""),_useState4=Object(D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a)(_useState3,2),filename=_useState4[0],setFilename=_useState4[1],_useState5=Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(""),_useState6=Object(D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a)(_useState5,2),output=_useState6[0],setOutput=_useState6[1],_useState7=Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(!1),_useState8=Object(D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a)(_useState7,2),error=_useState8[0],setError=_useState8[1],_useState9=Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(!0),_useState10=Object(D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a)(_useState9,2),showOutput=_useState10[0],setShowOutput=_useState10[1],openFile=function(){var _=Object(D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.a)(D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark((function _(){var e,t,r,a;return D_Websites_ReactProjects_code_editor_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap((function(_){for(;;)switch(_.prev=_.next){case 0:return e={types:[{description:"Javascript Files",accept:{"text/javascript":[".js"]}}]},_.next=3,window.showOpenFilePicker(e);case 3:return t=_.sent,_.next=6,t[0].getFile();case 6:return r=_.sent,_.next=9,r.text();case 9:a=_.sent,setCode(a);case 11:case"end":return _.stop()}}),_)})));return function(){return _.apply(this,arguments)}}(),downloadFile=function(){download_as_file__WEBPACK_IMPORTED_MODULE_5___default()({data:code,filename:"".concat(filename,".js")}),filenameInput.current.value=""},runCode=function runCode(){if(""!==code){setShowOutput(!0);try{setOutput(eval(code)),setError(!1)}catch(err){setOutput("".concat(err.name,": ").concat(err.message)),setError(!0)}}else alert("Type something in the code editor before running your code!")},help=function(){alert("Just type your Javascript in the editor, and you will see the output in the panel to the right. When you're done with the code, you can choose a file name and download the script if you want to.")},toggleOutputBox=function(){setShowOutput(!showOutput)};return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:"app",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("header",{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button",{className:"header-button",onClick:openFile,children:"Open File"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("button",{className:"header-button download-file-button",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p",{children:"Download File"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:"enter-filename",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p",{className:"filename",children:"Filename: "}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input",{type:"text",onChange:function(_){return setFilename(_.target.value)},ref:filenameInput}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button",{className:"header-button enter-filename-button",onClick:downloadFile,children:"Enter"})]})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button",{className:"header-button",onClick:function(){return window.open("https://github.com/lordmaltazor/online-text-editor","_blank")},children:"Github"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button",{className:"header-button",onClick:help,children:"Help"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button",{className:"header-button",onClick:runCode,children:"Run"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"header-spacer"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button",{className:"header-button",onClick:toggleOutputBox,children:showOutput?"Hide":"Show"})]}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("section",{className:"main-section",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Editor__WEBPACK_IMPORTED_MODULE_6__.a,{value:code,onChange:setCode}),showOutput&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"output",style:{color:error?"red":"white"},children:output})]})]})}__webpack_exports__.a=App}},[[13,1,2]]]);
//# sourceMappingURL=main.21d3209d.chunk.js.map