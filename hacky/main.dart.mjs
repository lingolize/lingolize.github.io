
// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

_1: (x0,x1,x2) => x0.set(x1,x2),
_2: (x0,x1,x2) => x0.set(x1,x2),
_6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
_7: x0 => new window.FinalizationRegistry(x0),
_8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_9: (x0,x1) => x0.unregister(x1),
_10: (x0,x1,x2) => x0.slice(x1,x2),
_11: (x0,x1) => x0.decode(x1),
_12: (x0,x1) => x0.segment(x1),
_13: () => new TextDecoder(),
_14: x0 => x0.buffer,
_15: x0 => x0.wasmMemory,
_16: () => globalThis.window._flutter_skwasmInstance,
_17: x0 => x0.rasterStartMilliseconds,
_18: x0 => x0.rasterEndMilliseconds,
_19: x0 => x0.imageBitmaps,
_167: x0 => x0.select(),
_168: (x0,x1) => x0.append(x1),
_169: x0 => x0.remove(),
_172: x0 => x0.unlock(),
_177: x0 => x0.getReader(),
_189: x0 => new MutationObserver(x0),
_208: (x0,x1,x2) => x0.addEventListener(x1,x2),
_209: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_212: x0 => new ResizeObserver(x0),
_215: (x0,x1) => new Intl.Segmenter(x0,x1),
_216: x0 => x0.next(),
_217: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
_294: x0 => x0.close(),
_295: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
_296: x0 => new window.ImageDecoder(x0),
_297: x0 => x0.close(),
_298: x0 => ({frameIndex: x0}),
_299: (x0,x1) => x0.decode(x1),
_302: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._302(f,arguments.length,x0) }),
_303: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._303(f,arguments.length,x0) }),
_304: (x0,x1) => ({addView: x0,removeView: x1}),
_305: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._305(f,arguments.length,x0) }),
_306: f => finalizeWrapper(f, function() { return dartInstance.exports._306(f,arguments.length) }),
_307: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
_308: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._308(f,arguments.length,x0) }),
_309: x0 => ({runApp: x0}),
_310: x0 => new Uint8Array(x0),
_312: x0 => x0.preventDefault(),
_313: x0 => x0.stopPropagation(),
_314: (x0,x1) => x0.addListener(x1),
_315: (x0,x1) => x0.removeListener(x1),
_316: (x0,x1) => x0.prepend(x1),
_317: x0 => x0.remove(),
_318: x0 => x0.disconnect(),
_319: (x0,x1) => x0.addListener(x1),
_320: (x0,x1) => x0.removeListener(x1),
_322: (x0,x1) => x0.append(x1),
_323: x0 => x0.remove(),
_324: x0 => x0.stopPropagation(),
_328: x0 => x0.preventDefault(),
_329: (x0,x1) => x0.append(x1),
_330: x0 => x0.remove(),
_331: x0 => x0.preventDefault(),
_336: (x0,x1) => x0.appendChild(x1),
_337: (x0,x1,x2) => x0.insertBefore(x1,x2),
_338: (x0,x1) => x0.removeChild(x1),
_339: (x0,x1) => x0.appendChild(x1),
_340: (x0,x1) => x0.transferFromImageBitmap(x1),
_341: (x0,x1) => x0.append(x1),
_342: (x0,x1) => x0.append(x1),
_343: (x0,x1) => x0.append(x1),
_344: x0 => x0.remove(),
_345: x0 => x0.remove(),
_346: x0 => x0.remove(),
_347: (x0,x1) => x0.appendChild(x1),
_348: (x0,x1) => x0.appendChild(x1),
_349: x0 => x0.remove(),
_350: (x0,x1) => x0.append(x1),
_351: (x0,x1) => x0.append(x1),
_352: x0 => x0.remove(),
_353: (x0,x1) => x0.append(x1),
_354: (x0,x1) => x0.append(x1),
_355: (x0,x1,x2) => x0.insertBefore(x1,x2),
_356: (x0,x1) => x0.append(x1),
_357: (x0,x1,x2) => x0.insertBefore(x1,x2),
_358: x0 => x0.remove(),
_359: x0 => x0.remove(),
_360: (x0,x1) => x0.append(x1),
_361: x0 => x0.remove(),
_362: (x0,x1) => x0.append(x1),
_363: x0 => x0.remove(),
_364: x0 => x0.remove(),
_365: x0 => x0.getBoundingClientRect(),
_366: x0 => x0.remove(),
_367: x0 => x0.blur(),
_368: x0 => x0.remove(),
_369: x0 => x0.blur(),
_370: x0 => x0.remove(),
_383: (x0,x1) => x0.append(x1),
_384: x0 => x0.remove(),
_385: (x0,x1) => x0.append(x1),
_386: (x0,x1,x2) => x0.insertBefore(x1,x2),
_387: x0 => x0.preventDefault(),
_388: x0 => x0.preventDefault(),
_389: x0 => x0.preventDefault(),
_390: x0 => x0.preventDefault(),
_391: x0 => x0.remove(),
_392: (x0,x1) => x0.observe(x1),
_393: x0 => x0.disconnect(),
_394: (x0,x1) => x0.appendChild(x1),
_395: (x0,x1) => x0.appendChild(x1),
_396: (x0,x1) => x0.appendChild(x1),
_397: (x0,x1) => x0.append(x1),
_398: x0 => x0.remove(),
_399: (x0,x1) => x0.append(x1),
_401: (x0,x1) => x0.appendChild(x1),
_402: (x0,x1) => x0.append(x1),
_403: x0 => x0.remove(),
_404: (x0,x1) => x0.append(x1),
_408: (x0,x1) => x0.appendChild(x1),
_409: x0 => x0.remove(),
_969: () => globalThis.window.flutterConfiguration,
_970: x0 => x0.assetBase,
_975: x0 => x0.debugShowSemanticsNodes,
_976: x0 => x0.hostElement,
_977: x0 => x0.multiViewEnabled,
_978: x0 => x0.nonce,
_980: x0 => x0.fontFallbackBaseUrl,
_981: x0 => x0.useColorEmoji,
_985: x0 => x0.console,
_986: x0 => x0.devicePixelRatio,
_987: x0 => x0.document,
_988: x0 => x0.history,
_989: x0 => x0.innerHeight,
_990: x0 => x0.innerWidth,
_991: x0 => x0.location,
_992: x0 => x0.navigator,
_993: x0 => x0.visualViewport,
_994: x0 => x0.performance,
_995: (x0,x1) => x0.fetch(x1),
_1000: (x0,x1) => x0.dispatchEvent(x1),
_1001: (x0,x1) => x0.matchMedia(x1),
_1002: (x0,x1) => x0.getComputedStyle(x1),
_1004: x0 => x0.screen,
_1005: (x0,x1) => x0.requestAnimationFrame(x1),
_1006: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1006(f,arguments.length,x0) }),
_1010: (x0,x1) => x0.warn(x1),
_1013: () => globalThis.window,
_1014: () => globalThis.Intl,
_1015: () => globalThis.Symbol,
_1018: x0 => x0.clipboard,
_1019: x0 => x0.maxTouchPoints,
_1020: x0 => x0.vendor,
_1021: x0 => x0.language,
_1022: x0 => x0.platform,
_1023: x0 => x0.userAgent,
_1024: x0 => x0.languages,
_1025: x0 => x0.documentElement,
_1026: (x0,x1) => x0.querySelector(x1),
_1029: (x0,x1) => x0.createElement(x1),
_1031: (x0,x1) => x0.execCommand(x1),
_1035: (x0,x1) => x0.createTextNode(x1),
_1036: (x0,x1) => x0.createEvent(x1),
_1040: x0 => x0.head,
_1041: x0 => x0.body,
_1042: (x0,x1) => x0.title = x1,
_1045: x0 => x0.activeElement,
_1047: x0 => x0.visibilityState,
_1048: () => globalThis.document,
_1049: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1050: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1051: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1052: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1055: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1055(f,arguments.length,x0) }),
_1056: x0 => x0.target,
_1058: x0 => x0.timeStamp,
_1059: x0 => x0.type,
_1061: x0 => x0.preventDefault(),
_1065: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
_1070: x0 => x0.firstChild,
_1076: x0 => x0.parentElement,
_1078: x0 => x0.parentNode,
_1081: (x0,x1) => x0.removeChild(x1),
_1082: (x0,x1) => x0.removeChild(x1),
_1083: x0 => x0.isConnected,
_1084: (x0,x1) => x0.textContent = x1,
_1087: (x0,x1) => x0.contains(x1),
_1092: x0 => x0.firstElementChild,
_1094: x0 => x0.nextElementSibling,
_1095: x0 => x0.clientHeight,
_1096: x0 => x0.clientWidth,
_1097: x0 => x0.offsetHeight,
_1098: x0 => x0.offsetWidth,
_1099: x0 => x0.id,
_1100: (x0,x1) => x0.id = x1,
_1103: (x0,x1) => x0.spellcheck = x1,
_1104: x0 => x0.tagName,
_1105: x0 => x0.style,
_1107: (x0,x1) => x0.append(x1),
_1108: (x0,x1) => x0.getAttribute(x1),
_1109: x0 => x0.getBoundingClientRect(),
_1112: (x0,x1) => x0.closest(x1),
_1114: (x0,x1) => x0.querySelectorAll(x1),
_1115: x0 => x0.remove(),
_1116: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1118: (x0,x1) => x0.removeAttribute(x1),
_1119: (x0,x1) => x0.tabIndex = x1,
_1121: (x0,x1) => x0.focus(x1),
_1122: x0 => x0.scrollTop,
_1123: (x0,x1) => x0.scrollTop = x1,
_1124: x0 => x0.scrollLeft,
_1125: (x0,x1) => x0.scrollLeft = x1,
_1126: x0 => x0.classList,
_1127: (x0,x1) => x0.className = x1,
_1131: (x0,x1) => x0.getElementsByClassName(x1),
_1132: x0 => x0.click(),
_1133: (x0,x1) => x0.hasAttribute(x1),
_1136: (x0,x1) => x0.attachShadow(x1),
_1140: (x0,x1) => x0.getPropertyValue(x1),
_1142: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
_1144: (x0,x1) => x0.removeProperty(x1),
_1146: x0 => x0.offsetLeft,
_1147: x0 => x0.offsetTop,
_1148: x0 => x0.offsetParent,
_1150: (x0,x1) => x0.name = x1,
_1151: x0 => x0.content,
_1152: (x0,x1) => x0.content = x1,
_1165: (x0,x1) => x0.nonce = x1,
_1170: x0 => x0.now(),
_1172: (x0,x1) => x0.width = x1,
_1174: (x0,x1) => x0.height = x1,
_1178: (x0,x1) => x0.getContext(x1),
_1256: x0 => x0.status,
_1257: x0 => x0.headers,
_1258: x0 => x0.body,
_1259: x0 => x0.arrayBuffer(),
_1262: (x0,x1) => x0.get(x1),
_1264: x0 => x0.read(),
_1265: x0 => x0.value,
_1266: x0 => x0.done,
_1268: x0 => x0.name,
_1269: x0 => x0.x,
_1270: x0 => x0.y,
_1273: x0 => x0.top,
_1274: x0 => x0.right,
_1275: x0 => x0.bottom,
_1276: x0 => x0.left,
_1285: x0 => x0.height,
_1286: x0 => x0.width,
_1287: (x0,x1) => x0.value = x1,
_1289: (x0,x1) => x0.placeholder = x1,
_1290: (x0,x1) => x0.name = x1,
_1291: x0 => x0.selectionDirection,
_1292: x0 => x0.selectionStart,
_1293: x0 => x0.selectionEnd,
_1296: x0 => x0.value,
_1298: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1303: x0 => x0.readText(),
_1304: (x0,x1) => x0.writeText(x1),
_1305: x0 => x0.altKey,
_1306: x0 => x0.code,
_1307: x0 => x0.ctrlKey,
_1308: x0 => x0.key,
_1309: x0 => x0.keyCode,
_1310: x0 => x0.location,
_1311: x0 => x0.metaKey,
_1312: x0 => x0.repeat,
_1313: x0 => x0.shiftKey,
_1314: x0 => x0.isComposing,
_1315: (x0,x1) => x0.getModifierState(x1),
_1316: x0 => x0.state,
_1319: (x0,x1) => x0.go(x1),
_1320: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
_1321: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
_1322: x0 => x0.pathname,
_1323: x0 => x0.search,
_1324: x0 => x0.hash,
_1327: x0 => x0.state,
_1333: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1333(f,arguments.length,x0,x1) }),
_1335: (x0,x1,x2) => x0.observe(x1,x2),
_1338: x0 => x0.attributeName,
_1339: x0 => x0.type,
_1340: x0 => x0.matches,
_1344: x0 => x0.matches,
_1345: x0 => x0.relatedTarget,
_1346: x0 => x0.clientX,
_1347: x0 => x0.clientY,
_1348: x0 => x0.offsetX,
_1349: x0 => x0.offsetY,
_1352: x0 => x0.button,
_1353: x0 => x0.buttons,
_1354: x0 => x0.ctrlKey,
_1355: (x0,x1) => x0.getModifierState(x1),
_1356: x0 => x0.pointerId,
_1357: x0 => x0.pointerType,
_1358: x0 => x0.pressure,
_1359: x0 => x0.tiltX,
_1360: x0 => x0.tiltY,
_1361: x0 => x0.getCoalescedEvents(),
_1362: x0 => x0.deltaX,
_1363: x0 => x0.deltaY,
_1364: x0 => x0.wheelDeltaX,
_1365: x0 => x0.wheelDeltaY,
_1366: x0 => x0.deltaMode,
_1371: x0 => x0.changedTouches,
_1373: x0 => x0.clientX,
_1374: x0 => x0.clientY,
_1375: x0 => x0.data,
_1376: (x0,x1) => x0.type = x1,
_1377: (x0,x1) => x0.max = x1,
_1378: (x0,x1) => x0.min = x1,
_1379: (x0,x1) => x0.value = x1,
_1380: x0 => x0.value,
_1381: x0 => x0.disabled,
_1382: (x0,x1) => x0.disabled = x1,
_1383: (x0,x1) => x0.placeholder = x1,
_1384: (x0,x1) => x0.name = x1,
_1385: (x0,x1) => x0.autocomplete = x1,
_1386: x0 => x0.selectionDirection,
_1387: x0 => x0.selectionStart,
_1388: x0 => x0.selectionEnd,
_1392: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1399: (x0,x1) => x0.add(x1),
_1402: (x0,x1) => x0.noValidate = x1,
_1403: (x0,x1) => x0.method = x1,
_1404: (x0,x1) => x0.action = x1,
_1431: x0 => x0.orientation,
_1432: x0 => x0.width,
_1433: x0 => x0.height,
_1434: (x0,x1) => x0.lock(x1),
_1451: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1451(f,arguments.length,x0,x1) }),
_1461: x0 => x0.length,
_1462: (x0,x1) => x0.item(x1),
_1463: x0 => x0.length,
_1464: (x0,x1) => x0.item(x1),
_1465: x0 => x0.iterator,
_1466: x0 => x0.Segmenter,
_1467: x0 => x0.v8BreakIterator,
_1470: x0 => x0.done,
_1471: x0 => x0.value,
_1472: x0 => x0.index,
_1476: (x0,x1) => x0.adoptText(x1),
_1478: x0 => x0.first(),
_1479: x0 => x0.next(),
_1480: x0 => x0.current(),
_1493: x0 => x0.hostElement,
_1494: x0 => x0.viewConstraints,
_1496: x0 => x0.maxHeight,
_1497: x0 => x0.maxWidth,
_1498: x0 => x0.minHeight,
_1499: x0 => x0.minWidth,
_1500: x0 => x0.loader,
_1501: () => globalThis._flutter,
_1502: (x0,x1) => x0.didCreateEngineInitializer(x1),
_1503: (x0,x1,x2) => x0.call(x1,x2),
_1504: () => globalThis.Promise,
_1505: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1505(f,arguments.length,x0,x1) }),
_1508: x0 => x0.length,
_1511: x0 => x0.tracks,
_1515: x0 => x0.image,
_1520: x0 => x0.codedWidth,
_1521: x0 => x0.codedHeight,
_1524: x0 => x0.duration,
_1528: x0 => x0.ready,
_1529: x0 => x0.selectedTrack,
_1530: x0 => x0.repetitionCount,
_1531: x0 => x0.frameCount,
_1576: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1577: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_1578: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1578(f,arguments.length,x0) }),
_1579: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1580: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1580(f,arguments.length,x0) }),
_1581: x0 => x0.send(),
_1582: () => new XMLHttpRequest(),
_1600: (x0,x1) => x0.querySelector(x1),
_1601: (x0,x1) => x0.createElement(x1),
_1602: (x0,x1) => x0.querySelector(x1),
_1629: () => new Array(),
_1630: x0 => new Array(x0),
_1632: (o, t) => typeof o === t,
_1633: (o, c) => o instanceof c,
_1634: (x0,x1,x2,x3,x4,x5) => x0.call(x1,x2,x3,x4,x5),
_1637: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1637(f,arguments.length,x0) }),
_1638: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1638(f,arguments.length,x0) }),
_1639: (x0,x1,x2) => x0.call(x1,x2),
_1643: (o, a) => o + a,
_1653: (o, a) => o == a,
_1664: (decoder, codeUnits) => decoder.decode(codeUnits),
_1665: () => new TextDecoder("utf-8", {fatal: true}),
_1666: () => new TextDecoder("utf-8", {fatal: false}),
_1667: v => v.toString(),
_1668: (d, digits) => d.toFixed(digits),
_1672: x0 => new WeakRef(x0),
_1673: x0 => x0.deref(),
_1674: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1674(f,arguments.length,x0) }),
_1675: x0 => new FinalizationRegistry(x0),
_1676: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_1678: (x0,x1) => x0.unregister(x1),
_1679: Date.now,
_1681: s => new Date(s * 1000).getTimezoneOffset() * 60 ,
_1682: s => {
      if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
        return NaN;
      }
      return parseFloat(s);
    },
_1683: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_1684: () => typeof dartUseDateNowForTicks !== "undefined",
_1685: () => 1000 * performance.now(),
_1686: () => Date.now(),
_1687: () => {
      // On browsers return `globalThis.location.href`
      if (globalThis.location != null) {
        return globalThis.location.href;
      }
      return null;
    },
_1688: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
_1689: () => new WeakMap(),
_1690: (map, o) => map.get(o),
_1691: (map, o, v) => map.set(o, v),
_1692: () => globalThis.WeakRef,
_1697: () => globalThis.FinalizationRegistry,
_1703: s => JSON.stringify(s),
_1704: s => printToConsole(s),
_1705: a => a.join(''),
_1706: (o, a, b) => o.replace(a, b),
_1708: (s, t) => s.split(t),
_1709: s => s.toLowerCase(),
_1710: s => s.toUpperCase(),
_1711: s => s.trim(),
_1712: s => s.trimLeft(),
_1713: s => s.trimRight(),
_1715: (s, p, i) => s.indexOf(p, i),
_1716: (s, p, i) => s.lastIndexOf(p, i),
_1717: (s) => s.replace(/\$/g, "$$$$"),
_1718: Object.is,
_1719: s => s.toUpperCase(),
_1720: s => s.toLowerCase(),
_1721: (a, i) => a.push(i),
_1725: a => a.pop(),
_1726: (a, i) => a.splice(i, 1),
_1728: (a, s) => a.join(s),
_1729: (a, s, e) => a.slice(s, e),
_1731: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
_1732: a => a.length,
_1734: (a, i) => a[i],
_1735: (a, i, v) => a[i] = v,
_1737: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_1738: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_1739: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_1740: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_1741: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_1742: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_1743: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_1744: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_1746: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
_1747: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_1748: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_1749: (t, s) => t.set(s),
_1751: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_1752: o => o.byteLength,
_1753: o => o.buffer,
_1754: o => o.byteOffset,
_1755: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_1756: (b, o) => new DataView(b, o),
_1757: (b, o, l) => new DataView(b, o, l),
_1758: Function.prototype.call.bind(DataView.prototype.getUint8),
_1759: Function.prototype.call.bind(DataView.prototype.setUint8),
_1760: Function.prototype.call.bind(DataView.prototype.getInt8),
_1761: Function.prototype.call.bind(DataView.prototype.setInt8),
_1762: Function.prototype.call.bind(DataView.prototype.getUint16),
_1763: Function.prototype.call.bind(DataView.prototype.setUint16),
_1764: Function.prototype.call.bind(DataView.prototype.getInt16),
_1765: Function.prototype.call.bind(DataView.prototype.setInt16),
_1766: Function.prototype.call.bind(DataView.prototype.getUint32),
_1767: Function.prototype.call.bind(DataView.prototype.setUint32),
_1768: Function.prototype.call.bind(DataView.prototype.getInt32),
_1769: Function.prototype.call.bind(DataView.prototype.setInt32),
_1772: Function.prototype.call.bind(DataView.prototype.getBigInt64),
_1773: Function.prototype.call.bind(DataView.prototype.setBigInt64),
_1774: Function.prototype.call.bind(DataView.prototype.getFloat32),
_1775: Function.prototype.call.bind(DataView.prototype.setFloat32),
_1776: Function.prototype.call.bind(DataView.prototype.getFloat64),
_1777: Function.prototype.call.bind(DataView.prototype.setFloat64),
_1778: (x0,x1) => x0.getRandomValues(x1),
_1779: x0 => new Uint8Array(x0),
_1780: () => globalThis.crypto,
_1791: (x0,x1) => x0.postMessage(x1),
_1793: x0 => new Worker(x0),
_1796: x0 => ({create: x0}),
_1797: (x0,x1,x2) => x0.getFileHandle(x1,x2),
_1805: (x0,x1,x2) => x0.open(x1,x2),
_1819: (x0,x1) => new SharedWorker(x0,x1),
_1820: x0 => x0.start(),
_1821: (x0,x1,x2) => x0.postMessage(x1,x2),
_1822: (x0,x1,x2) => x0.postMessage(x1,x2),
_1823: x0 => x0.close(),
_1824: x0 => x0.terminate(),
_1825: () => new MessageChannel(),
_1831: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1831(f,arguments.length,x0) }),
_1832: x0 => x0.close(),
_1833: x0 => new BroadcastChannel(x0),
_1834: x0 => globalThis.Array.isArray(x0),
_1835: (x0,x1) => x0.postMessage(x1),
_1836: x0 => x0.close(),
_1838: (x0,x1) => ({kind: x0,table: x1}),
_1839: x0 => x0.kind,
_1840: x0 => x0.table,
_1841: (x0,x1) => ({i: x0,p: x1}),
_1842: (x0,x1) => ({c: x0,r: x1}),
_1843: x0 => x0.i,
_1844: x0 => x0.p,
_1845: x0 => x0.c,
_1846: x0 => x0.r,
_1848: (o, t) => o instanceof t,
_1850: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1850(f,arguments.length,x0) }),
_1851: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1851(f,arguments.length,x0) }),
_1852: o => Object.keys(o),
_1853: (ms, c) =>
              setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
_1854: (handle) => clearTimeout(handle),
_1855: (ms, c) =>
          setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
_1856: (handle) => clearInterval(handle),
_1857: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_1858: () => Date.now(),
_1862: x0 => new URL(x0),
_1863: (x0,x1) => new URL(x0,x1),
_1864: (x0,x1) => globalThis.fetch(x0,x1),
_1865: (x0,x1,x2,x3) => x0.call(x1,x2,x3),
_1866: x0 => ({initial: x0}),
_1867: x0 => new WebAssembly.Memory(x0),
_1868: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1868(f,arguments.length,x0) }),
_1869: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._1869(f,arguments.length,x0,x1,x2,x3,x4) }),
_1870: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1870(f,arguments.length,x0,x1,x2) }),
_1871: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1871(f,arguments.length,x0,x1,x2,x3) }),
_1872: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1872(f,arguments.length,x0,x1,x2,x3) }),
_1873: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1873(f,arguments.length,x0,x1,x2) }),
_1874: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1874(f,arguments.length,x0,x1) }),
_1875: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1875(f,arguments.length,x0,x1) }),
_1876: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1876(f,arguments.length,x0) }),
_1877: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1877(f,arguments.length,x0) }),
_1878: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1878(f,arguments.length,x0,x1,x2,x3) }),
_1879: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1879(f,arguments.length,x0,x1,x2,x3) }),
_1880: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1880(f,arguments.length,x0,x1) }),
_1881: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1881(f,arguments.length,x0,x1) }),
_1882: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1882(f,arguments.length,x0,x1) }),
_1883: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1883(f,arguments.length,x0,x1) }),
_1884: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1884(f,arguments.length,x0,x1) }),
_1885: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1885(f,arguments.length,x0,x1) }),
_1886: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1886(f,arguments.length,x0,x1,x2) }),
_1887: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1887(f,arguments.length,x0,x1,x2) }),
_1888: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1888(f,arguments.length,x0,x1,x2) }),
_1889: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1889(f,arguments.length,x0) }),
_1890: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1890(f,arguments.length,x0) }),
_1891: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1891(f,arguments.length,x0) }),
_1892: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._1892(f,arguments.length,x0,x1,x2,x3,x4) }),
_1893: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._1893(f,arguments.length,x0,x1,x2,x3,x4) }),
_1894: (x0,x1,x2,x3,x4,x5,x6) => x0.call(x1,x2,x3,x4,x5,x6),
_1895: (x0,x1,x2,x3,x4,x5,x6,x7) => x0.call(x1,x2,x3,x4,x5,x6,x7),
_1896: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4),
_1897: x0 => x0.continue(),
_1898: () => globalThis.indexedDB,
_1900: x0 => x0.arrayBuffer(),
_1901: x0 => new SharedArrayBuffer(x0),
_1902: x0 => new SharedArrayBuffer(x0),
_1903: x0 => ({at: x0}),
_1911: x0 => x0.synchronizationBuffer,
_1912: x0 => x0.communicationBuffer,
_1913: (x0,x1,x2,x3) => ({clientVersion: x0,root: x1,synchronizationBuffer: x2,communicationBuffer: x3}),
_1914: x0 => new SharedArrayBuffer(x0),
_1915: (x0,x1) => globalThis.IDBKeyRange.bound(x0,x1),
_1916: x0 => ({autoIncrement: x0}),
_1917: (x0,x1,x2) => x0.createObjectStore(x1,x2),
_1918: x0 => ({unique: x0}),
_1919: (x0,x1,x2,x3) => x0.createIndex(x1,x2,x3),
_1920: (x0,x1) => x0.createObjectStore(x1),
_1921: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1921(f,arguments.length,x0) }),
_1922: x0 => x0.close(),
_1923: (x0,x1,x2) => x0.transaction(x1,x2),
_1926: (x0,x1) => x0.objectStore(x1),
_1927: (x0,x1) => x0.index(x1),
_1928: x0 => x0.openKeyCursor(),
_1929: (x0,x1) => x0.objectStore(x1),
_1930: (x0,x1) => x0.index(x1),
_1931: (x0,x1) => x0.getKey(x1),
_1932: (x0,x1) => x0.objectStore(x1),
_1933: (x0,x1) => ({name: x0,length: x1}),
_1934: (x0,x1) => x0.put(x1),
_1935: (x0,x1) => x0.objectStore(x1),
_1936: (x0,x1) => x0.get(x1),
_1937: (x0,x1) => x0.objectStore(x1),
_1938: (x0,x1) => x0.openCursor(x1),
_1940: (x0,x1) => x0.objectStore(x1),
_1941: x0 => globalThis.IDBKeyRange.only(x0),
_1942: x0 => new Blob(x0),
_1943: (x0,x1,x2) => x0.put(x1,x2),
_1944: (x0,x1) => x0.update(x1),
_1945: (x0,x1) => x0.objectStore(x1),
_1946: (x0,x1) => x0.update(x1),
_1947: (x0,x1) => x0.objectStore(x1),
_1948: (x0,x1) => x0.objectStore(x1),
_1949: (x0,x1) => x0.delete(x1),
_1950: (x0,x1) => x0.update(x1),
_1951: (x0,x1) => x0.objectStore(x1),
_1952: (x0,x1) => x0.delete(x1),
_1953: (x0,x1) => x0.objectStore(x1),
_1954: (x0,x1) => x0.delete(x1),
_1957: x0 => x0.name,
_1958: x0 => x0.length,
_1959: x0 => x0.createSyncAccessHandle(),
_1960: (x0,x1) => x0.truncate(x1),
_1961: (x0,x1) => x0.truncate(x1),
_1962: x0 => x0.close(),
_1963: x0 => x0.close(),
_1964: x0 => x0.flush(),
_1965: x0 => x0.getSize(),
_1966: x0 => x0.flush(),
_1967: (x0,x1) => x0.truncate(x1),
_1969: x0 => globalThis.BigInt(x0),
_1970: x0 => globalThis.Number(x0),
_1973: x0 => globalThis.Object.keys(x0),
_1978: (x0,x1) => globalThis.WebAssembly.instantiateStreaming(x0,x1),
_1979: x0 => x0.call(),
_1980: x0 => x0.exports,
_1981: x0 => x0.instance,
_1985: x0 => x0.buffer,
_1986: () => globalThis.WebAssembly.Global,
_1989: () => globalThis.navigator,
_1990: x0 => x0.getDirectory(),
_1991: (x0,x1) => x0.read(x1),
_1992: (x0,x1,x2) => x0.read(x1,x2),
_1993: (x0,x1) => x0.write(x1),
_1994: (x0,x1,x2) => x0.write(x1,x2),
_1995: x0 => ({create: x0}),
_1996: (x0,x1,x2) => x0.getDirectoryHandle(x1,x2),
_1997: () => new XMLHttpRequest(),
_1998: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_1999: (x0,x1) => x0.send(x1),
_2000: x0 => x0.abort(),
_2001: x0 => x0.getAllResponseHeaders(),
_2016: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2016(f,arguments.length,x0) }),
_2017: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2017(f,arguments.length,x0) }),
_2018: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_2019: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
_2045: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_2046: (x0,x1) => x0.exec(x1),
_2047: (x0,x1) => x0.test(x1),
_2048: (x0,x1) => x0.exec(x1),
_2049: (x0,x1) => x0.exec(x1),
_2050: x0 => x0.pop(),
_2054: (x0,x1,x2) => x0[x1] = x2,
_2056: o => o === undefined,
_2057: o => typeof o === 'boolean',
_2058: o => typeof o === 'number',
_2060: o => typeof o === 'string',
_2063: o => o instanceof Int8Array,
_2064: o => o instanceof Uint8Array,
_2065: o => o instanceof Uint8ClampedArray,
_2066: o => o instanceof Int16Array,
_2067: o => o instanceof Uint16Array,
_2068: o => o instanceof Int32Array,
_2069: o => o instanceof Uint32Array,
_2070: o => o instanceof Float32Array,
_2071: o => o instanceof Float64Array,
_2072: o => o instanceof ArrayBuffer,
_2073: o => o instanceof DataView,
_2074: o => o instanceof Array,
_2075: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_2077: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_2078: o => o instanceof RegExp,
_2079: (l, r) => l === r,
_2080: o => o,
_2081: o => o,
_2082: o => o,
_2083: b => !!b,
_2084: o => o.length,
_2087: (o, i) => o[i],
_2088: f => f.dartFunction,
_2089: l => arrayFromDartList(Int8Array, l),
_2090: (data, length) => {
          const jsBytes = new Uint8Array(length);
          const getByte = dartInstance.exports.$uint8ListGet;
          for (let i = 0; i < length; i++) {
            jsBytes[i] = getByte(data, i);
          }
          return jsBytes;
        },
_2091: l => arrayFromDartList(Uint8ClampedArray, l),
_2092: l => arrayFromDartList(Int16Array, l),
_2093: l => arrayFromDartList(Uint16Array, l),
_2094: l => arrayFromDartList(Int32Array, l),
_2095: l => arrayFromDartList(Uint32Array, l),
_2096: l => arrayFromDartList(Float32Array, l),
_2097: l => arrayFromDartList(Float64Array, l),
_2098: (data, length) => {
          const read = dartInstance.exports.$byteDataGetUint8;
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, read(data, i));
          }
          return view;
        },
_2099: l => arrayFromDartList(Array, l),
_2100:       (s, length) => {
        if (length == 0) return '';

        const read = dartInstance.exports.$stringRead1;
        let result = '';
        let index = 0;
        const chunkLength = Math.min(length - index, 500);
        let array = new Array(chunkLength);
        while (index < length) {
          const newChunkLength = Math.min(length - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(s, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      }
      ,
_2101:     (s, length) => {
      if (length == 0) return '';

      const read = dartInstance.exports.$stringRead2;
      let result = '';
      let index = 0;
      const chunkLength = Math.min(length - index, 500);
      let array = new Array(chunkLength);
      while (index < length) {
        const newChunkLength = Math.min(length - index, 500);
        for (let i = 0; i < newChunkLength; i++) {
          array[i] = read(s, index++);
        }
        if (newChunkLength < chunkLength) {
          array = array.slice(0, newChunkLength);
        }
        result += String.fromCharCode(...array);
      }
      return result;
    }
    ,
_2102:     (s) => {
      let length = s.length;
      let range = 0;
      for (let i = 0; i < length; i++) {
        range |= s.codePointAt(i);
      }
      const exports = dartInstance.exports;
      if (range < 256) {
        if (length <= 10) {
          if (length == 1) {
            return exports.$stringAllocate1_1(s.codePointAt(0));
          }
          if (length == 2) {
            return exports.$stringAllocate1_2(s.codePointAt(0), s.codePointAt(1));
          }
          if (length == 3) {
            return exports.$stringAllocate1_3(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2));
          }
          if (length == 4) {
            return exports.$stringAllocate1_4(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3));
          }
          if (length == 5) {
            return exports.$stringAllocate1_5(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4));
          }
          if (length == 6) {
            return exports.$stringAllocate1_6(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5));
          }
          if (length == 7) {
            return exports.$stringAllocate1_7(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6));
          }
          if (length == 8) {
            return exports.$stringAllocate1_8(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7));
          }
          if (length == 9) {
            return exports.$stringAllocate1_9(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8));
          }
          if (length == 10) {
            return exports.$stringAllocate1_10(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8), s.codePointAt(9));
          }
        }
        const dartString = exports.$stringAllocate1(length);
        const write = exports.$stringWrite1;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.codePointAt(i));
        }
        return dartString;
      } else {
        const dartString = exports.$stringAllocate2(length);
        const write = exports.$stringWrite2;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.charCodeAt(i));
        }
        return dartString;
      }
    }
    ,
_2103: () => ({}),
_2104: () => [],
_2105: l => new Array(l),
_2106: () => globalThis,
_2107: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_2108: (o, p) => p in o,
_2109: (o, p) => o[p],
_2110: (o, p, v) => o[p] = v,
_2111: (o, m, a) => o[m].apply(o, a),
_2113: o => String(o),
_2114: (p, s, f) => p.then(s, f),
_2115: s => {
      if (/[[\]{}()*+?.\\^$|]/.test(s)) {
          s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
      }
      return s;
    },
_2118: x0 => x0.index,
_2119: x0 => x0.groups,
_2120: x0 => x0.length,
_2122: (x0,x1) => x0[x1],
_2123: (x0,x1) => x0.exec(x1),
_2125: x0 => x0.flags,
_2126: x0 => x0.multiline,
_2127: x0 => x0.ignoreCase,
_2128: x0 => x0.unicode,
_2129: x0 => x0.dotAll,
_2130: (x0,x1) => x0.lastIndex = x1,
_2131: (o, p) => p in o,
_2132: (o, p) => o[p],
_2133: (o, p, v) => o[p] = v,
_2135: (x0,x1,x2) => globalThis.Atomics.wait(x0,x1,x2),
_2137: (x0,x1,x2) => globalThis.Atomics.notify(x0,x1,x2),
_2138: (x0,x1,x2) => globalThis.Atomics.store(x0,x1,x2),
_2139: (x0,x1) => globalThis.Atomics.load(x0,x1),
_2140: () => globalThis.Int32Array,
_2142: () => globalThis.Uint8Array,
_2144: () => globalThis.DataView,
_2147: x0 => x0.byteLength,
_2197: () => globalThis.window.flutterCanvasKit,
_2250: (x0,x1) => x0.withCredentials = x1,
_2252: x0 => x0.responseURL,
_2253: x0 => x0.status,
_2254: x0 => x0.statusText,
_2256: (x0,x1) => x0.responseType = x1,
_2257: x0 => x0.response,
_4539: x0 => x0.storage,
_4577: x0 => x0.data,
_4608: x0 => x0.port1,
_4609: x0 => x0.port2,
_4615: (x0,x1) => x0.onmessage = x1,
_4701: x0 => x0.port,
_6848: () => globalThis.document,
_7292: (x0,x1) => x0.id = x1,
_7319: x0 => x0.children,
_10865: x0 => x0.result,
_10866: x0 => x0.error,
_10877: (x0,x1) => x0.onupgradeneeded = x1,
_10879: x0 => x0.oldVersion,
_10970: x0 => x0.key,
_10971: x0 => x0.primaryKey,
_10973: x0 => x0.value
    };

    const baseImports = {
        dart2wasm: dart2wasm,


        Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };

    const jsStringPolyfill = {
        "charCodeAt": (s, i) => s.charCodeAt(i),
        "compare": (s1, s2) => {
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            return 0;
        },
        "concat": (s1, s2) => s1 + s2,
        "equals": (s1, s2) => s1 === s2,
        "fromCharCode": (i) => String.fromCharCode(i),
        "length": (s) => s.length,
        "substring": (s, a, b) => s.substring(a, b),
    };

    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
        "wasm:js-string": jsStringPolyfill,
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

