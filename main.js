/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css"
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
() {

eval("{throw new Error(\"Module build failed (from ./node_modules/style-loader/dist/cjs.js):\\nError: Cannot find module 'schema-utils'\\nRequire stack:\\n- /home/eder/MEGAsync/mis_notas/Programación/JavaScript/Ejercicios/weather_app/node_modules/webpack/lib/module/NormalModule.js\\n- /home/eder/MEGAsync/mis_notas/Programación/JavaScript/Ejercicios/weather_app/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js\\n- /home/eder/MEGAsync/mis_notas/Programación/JavaScript/Ejercicios/weather_app/node_modules/webpack/lib/template/ChunkTemplate.js\\n- /home/eder/MEGAsync/mis_notas/Programación/JavaScript/Ejercicios/weather_app/node_modules/webpack/lib/Compilation.js\\n- /home/eder/MEGAsync/mis_notas/Programación/JavaScript/Ejercicios/weather_app/node_modules/webpack/lib/Compiler.js\\n- /home/eder/MEGAsync/mis_notas/Programación/JavaScript/Ejercicios/weather_app/node_modules/webpack/lib/webpack.js\\n- /home/eder/MEGAsync/mis_notas/Programación/JavaScript/Ejercicios/weather_app/node_modules/webpack/lib/index.js\\n    at Function._resolveFilename (node:internal/modules/cjs/loader)\\n    at Function._load (node:internal/modules/cjs/loader)\\n    at TracingChannel.traceSync (node:diagnostics_channel)\\n    at wrapModuleLoad (node:internal/modules/cjs/loader)\\n    at Module.require (node:internal/modules/cjs/loader)\\n    at require (node:internal/modules/helpers)\\n    at ./node_modules/webpack/lib/module/NormalModule.js\\n    at ./node_modules/webpack/lib/util/memoize.js\\n    at Object.getOptions (./node_modules/webpack/lib/module/NormalModule.js)\\n    at Object.pitch (./node_modules/style-loader/dist/index.js:22:24)\");\n\n//# sourceURL=webpack://weather_app/./src/style.css?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getTodayDate: () => (/* binding */ getTodayDate)\n/* harmony export */ });\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n\n\nfunction getLocation() {\n    // <<getLocation>>\n    if (\"geolocation\" in navigator) {\n        console.info(\"Geolocation is available\");\n        return new Promise((resolve, reject) => {\n\n            navigator.geolocation.getCurrentPosition(\n                (position) => {\n                    const latitude = position.coords.latitude;\n                    const longitude = position.coords.longitude;\n                    resolve({latitude, longitude});\n                }\n                ,\n                (error) => {\n                    reject(error);\n                });\n        });\n\n    } else {\n        console.error(\"Geolocation NOT available\")\n    }\n}\n\nfunction getTodayDate() {\n    // <<getTodayDate>>\n    const todayDate = new Date();\n    let year = todayDate.getFullYear();\n    let month = (todayDate.getMonth()+1)<10\n                ? `0${todayDate.getMonth()+1}`\n                : todayDate.getMonth()+1;\n    let day = todayDate.getDate();\n    return `${year}-${month}-${day}`;\n}\n\nasync function getGiphyImage(climate) {\n\n    const giphyAPI = \"6Mu6lZq2Vnp6I5V1o7UCVxgKtudubpHV\";\n    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPI}&s=${climate}&rating=g&remove_low_contrast=true`;\n    // const url = `https://api.giphy.com/v1/gifs/random?api_key=${giphyAPI}&tag=${climate}s&rating=g&remove_low_contrast=true`;\n    // const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPI}&q=${climate}&rating=g&limit=1`;\n\n    const response = await fetch(url);\n    if (!response.ok) {\n        throw new Error(\"Problem getting data\");\n    }\n    const data = await response.json();\n    // const imgUrl = data.data[0]?.images.original.url;\n    const imgUrl = data.data?.images.original.url;\n\n    return imgUrl;\n\n}\n\nasync function getDataAPI({location, position, date, unitGroup = \"metric\"}) {\n\n    // <<getDataAPI>>\n    const API = \"FT97ERZJPFZVY6KTHVSR2KG77\";\n    const params = new URLSearchParams({\n        unitGroup: [unitGroup], // metric, us\n        key: [API]\n    });\n    let url = \"\";\n    if(location) {\n\n        location = encodeURIComponent(location);\n\n        url = \"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/\" +\n            location +\"/\" +date+\"/\" +\"?\" + params;\n        console.log(url);\n    } else if (position){\n\n        let coor = position.latitude.toString() +\",\" + position.longitude.toString()\n\n        url = \"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/\" +\n            coor +\"/\" +date+\"/\" +\"?\" + params;\n    }\n\n    let response = await fetch(url);\n    if (!response.ok) {\n        throw new Error(\"Problem getting data\");\n    }\n    let data = await response.json();\n\n    console.log(data);\n\n    // console.log(data.days[0]?.datetime);\n    // console.log(data.timezone);\n    // // Alertas\n    // console.log(data?.alerts[0]?.event);\n    // console.log(data?.alerts[0]?.headline);\n\n    // console.log(data?.alerts[0]?.description);\n    // console.log(data?.alerts[0]?.link);\n\n    //  console.log(data.days[0]?.conditions);\n    //  console.log(data.days[0]?.description);\n\n    //  console.log(data.days[0]?.icon);\n\n    // console.log(data.days[0]?.tempmax);\n    // console.log(data.days[0]?.tempmin);\n\n\n    // console.log(data.days[0]?.feelslike);\n    // console.log(data.days[0]?.humidity);\n\n\n    // console.log(\"-\".repeat(30))\n\n    return data;\n\n}\n\nfunction setUnitGroup() {\n    if(temperatureOptions[0].checked) return \"metric\";\n    if(temperatureOptions[1].checked) return \"us\";\n}\n\nasync function main(weatherData) {\n    let gif = encodeURIComponent(\"weather \" + weatherData.days[0]?.icon);\n    let backgroundUrl = await getGiphyImage(gif);\n    mainElement.setAttribute(\"src\", backgroundUrl);\n\n    let date = weatherData?.days[0]?.datetime;\n    let temperature =  weatherData?.days[0]?.temp;\n    // cityNameHtml.textContent = cityName;\n    dateHtml.textContent = \"Date : \" + date.split(\"-\").join(\"/\");\n    temperatureHtml.textContent = `Temperature : ${temperature} ${unitGroup === \"metric\" ? \"°C\" : \"°F\"}`;\n    description.textContent =  \"Description : \" + weatherData?.days[0]?.description\n\n    // Make Weather details grid\n    html=\"\";\n    gridInfo.textContent=\"\";\n    let infoText = [\n        {title:\"Feels like\", info: `${weatherData?.days[0]?.feelslike} ${unitGroup === \"metric\" ? \"°C\" : \"°F\"}` },\n        {title:\"Wind\", info: `${weatherData?.days[0]?.windspeed} ${unitGroup === \"metric\" ? \"km/h\" : \"mi/h\"}`},\n        {title:\"Humidity\", info: `${weatherData?.days[0]?.humidity} %`},\n        {title:\"UV\", info: weatherData?.days[0]?.uvindex} ,\n        {title:\"Visibility\", info: `${weatherData?.days[0]?.visibility} ${unitGroup === \"metric\" ? \"km\" : \"mi\"}`} ,\n        {title:\"Pressure\", info: `${weatherData?.days[0]?.pressure} hPa`},\n    ]\n    for (let x =0 ; x <6; x++) {\n        html = `\n                <span class=\"item-${x}\">\n                    <span>${infoText[x].title}</span>\n                    <span>${infoText[x].info}</span>\n                </span>\n        `;\n        gridInfo.insertAdjacentHTML(\"beforeend\", html)\n    }\n\n}\n\nconst mainElement = document.querySelector(\"main > .img-container > img\");\nlet searchInput = document.querySelector(\"#city\");\nconst searchBtn = document.querySelector(\".search-btn\")\n// const cityNameHtml = document.querySelector(\".city-name\");\nconst dateHtml = document.querySelector(\".today-date\");\nconst temperatureHtml = document.querySelector(\".temperature\");\nconst description = document.querySelector(\".description\");\nconst temperatureOptions = document.querySelectorAll(\"input[type='radio']\")\nlet today = getTodayDate();\nlet unitGroup = setUnitGroup();\nlet position = await getLocation();\nlet weatherData = await getDataAPI({position, date:today, unitGroup});\nconst gridInfo = document.querySelector(\".sec-2 > .grid-info\");\nlet html = \"\";\n\nsearchBtn.onclick = async () => {\n    unitGroup = setUnitGroup();\n    weatherData = await getDataAPI({location: searchInput.value, date:today, unitGroup});\n    main(weatherData);\n};\n\nsearchInput.addEventListener(\"keydown\", async (event) => {\n    if (event.key === \"Enter\") {\n        event.preventDefault();\n        unitGroup = setUnitGroup();\n        weatherData = await getDataAPI({location: searchInput.value, date:today, unitGroup});\n        main(weatherData);\n    }\n})\n\ntemperatureOptions.forEach((option) => {\n    option.addEventListener(\"click\", async () => {\n        unitGroup = setUnitGroup();\n        if(searchInput.value) {\n            weatherData = await getDataAPI({location: searchInput.value, date:today, unitGroup});\n        } else {\n            weatherData = await getDataAPI({position, date:today, unitGroup});\n        }\n        main(weatherData);\n    })\n})\n\n\ntry {\n    searchInput.value = \"\"; //clean search\n    main(weatherData);\n}catch(error) {\n    console.error(`ERROR(${error.code}): ${error.message}`)\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://weather_app/./src/index.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		const webpackQueues = Symbol("webpack queues");
/******/ 		const webpackExports = Symbol("webpack exports");
/******/ 		const webpackError = Symbol("webpack error");
/******/ 		
/******/ 		const resolveQueue = (queue) => {
/******/ 			if(queue?.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		const wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 		
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					const queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					const obj = {};
/******/ 		
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			const ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			let queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			const depQueues = new Set();
/******/ 			const exports = module.exports;
/******/ 			let currentDeps;
/******/ 			let outerResolve;
/******/ 			let reject;
/******/ 			const promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			const handle = (deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				let fn;
/******/ 				const getResult = () => (currentDeps.map((d) => {
/******/ 		
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				const promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					const fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.forEach((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}
/******/ 			const done = (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue))
/******/ 		
/******/ 			body(handle, done);
/******/ 			queue?.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;