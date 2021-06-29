
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// CBOR (https://github.com/paroga/cbor-js/blob/master/cbor.js)
!function(e,r){"use strict";var n=5.960464477539063e-8,t=4294967296,i=9007199254740992;var u={encode:function(e){var n,u=new ArrayBuffer(256),f=new DataView(u),a=0;function o(e){for(var r=u.byteLength,t=a+e;r<t;)r<<=1;if(r!==u.byteLength){var i=f;u=new ArrayBuffer(r),f=new DataView(u);for(var o=a+3>>2,s=0;s<o;++s)f.setUint32(s<<2,i.getUint32(s<<2))}return n=e,f}function s(){a+=n}function c(e){s(o(1).setUint8(a,e))}function h(e){for(var r=o(e.length),n=0;n<e.length;++n)r.setUint8(a+n,e[n]);s()}function l(e,r){var n;r<24?c(e<<5|r):r<256?(c(e<<5|24),c(r)):r<65536?(c(e<<5|25),n=r,s(o(2).setUint16(a,n))):r<4294967296?(c(e<<5|26),function(e){s(o(4).setUint32(a,e))}(r)):(c(e<<5|27),function(e){var r=e%t,n=(e-r)/t,i=o(8);i.setUint32(a,n),i.setUint32(a+4,r),s()}(r))}if(function e(n){var t;if(!1===n)return c(244);if(!0===n)return c(245);if(null===n)return c(246);if(n===r)return c(247);switch(typeof n){case"number":if(Math.floor(n)===n){if(0<=n&&n<=i)return l(0,n);if(-i<=n&&n<0)return l(1,-(n+1))}return c(251),function(e){s(o(8).setFloat64(a,e))}(n);case"string":var u=[];for(t=0;t<n.length;++t){var f=n.charCodeAt(t);f<128?u.push(f):f<2048?(u.push(192|f>>6),u.push(128|63&f)):f<55296?(u.push(224|f>>12),u.push(128|f>>6&63),u.push(128|63&f)):(f=(1023&f)<<10,f|=1023&n.charCodeAt(++t),f+=65536,u.push(240|f>>18),u.push(128|f>>12&63),u.push(128|f>>6&63),u.push(128|63&f))}return l(3,u.length),h(u);default:var v;if(Array.isArray(n))for(l(4,v=n.length),t=0;t<v;++t)e(n[t]);else if(n instanceof Uint8Array)l(2,n.length),h(n);else{var g=Object.keys(n);for(l(5,v=g.length),t=0;t<v;++t){var w=g[t];e(w),e(n[w])}}}}(e),"slice"in u)return u.slice(0,a);for(var v=new ArrayBuffer(a),g=new DataView(v),w=0;w<a;++w)g.setUint8(w,f.getUint8(w));return v},decode:function(e,i,u){var f=new DataView(e),a=0;function o(e,r){return a+=e,r}function s(r){return o(r,new Uint8Array(e,a,r))}function c(){return o(1,f.getUint8(a))}function h(){return o(2,f.getUint16(a))}function l(){return o(4,f.getUint32(a))}function v(){return 255===f.getUint8(a)&&(a+=1,!0)}function g(e){if(e<24)return e;if(24===e)return c();if(25===e)return h();if(26===e)return l();if(27===e)return l()*t+l();if(31===e)return-1;throw"Invalid length encoding"}function w(e){var r=c();if(255===r)return-1;var n=g(31&r);if(n<0||r>>5!==e)throw"Invalid indefinite length element";return n}function p(e,r){for(var n=0;n<r;++n){var t=c();128&t&&(t<224?(t=(31&t)<<6|63&c(),r-=1):t<240?(t=(15&t)<<12|(63&c())<<6|63&c(),r-=2):(t=(15&t)<<18|(63&c())<<12|(63&c())<<6|63&c(),r-=3)),t<65536?e.push(t):(t-=65536,e.push(55296|t>>10),e.push(56320|1023&t))}}"function"!=typeof i&&(i=function(e){return e}),"function"!=typeof u&&(u=function(){return r});var d=function e(){var t,l,d=c(),y=d>>5,U=31&d;if(7===y)switch(U){case 25:return function(){var e=new ArrayBuffer(4),r=new DataView(e),t=h(),i=32768&t,u=31744&t,f=1023&t;if(31744===u)u=261120;else if(0!==u)u+=114688;else if(0!==f)return(i?-1:1)*f*n;return r.setUint32(0,i<<16|u<<13|f<<13),r.getFloat32(0)}();case 26:return o(4,f.getFloat32(a));case 27:return o(8,f.getFloat64(a))}if((l=g(U))<0&&(y<2||6<y))throw"Invalid length";switch(y){case 0:return l;case 1:return-1-l;case 2:if(l<0){for(var A=[],b=0;(l=w(y))>=0;)b+=l,A.push(s(l));var m=new Uint8Array(b),B=0;for(t=0;t<A.length;++t)m.set(A[t],B),B+=A[t].length;return m}return s(l);case 3:var C=[];if(l<0)for(;(l=w(y))>=0;)p(C,l);else p(C,l);return String.fromCharCode.apply(null,C);case 4:var D;if(l<0)for(D=[];!v();)D.push(e());else for(D=new Array(l),t=0;t<l;++t)D[t]=e();return D;case 5:var V={};for(t=0;t<l||l<0&&!v();++t)V[e()]=e();return V;case 6:return i(e(),l);case 7:switch(l){case 20:return!1;case 21:return!0;case 22:return null;case 23:return r;default:return u(l)}}}();if(a!==e.byteLength)throw"Remaining bytes";return d}};"function"==typeof define&&define.amd?define("cbor/cbor",u):"undefined"!=typeof module&&module.exports?module.exports=u:e.CBOR||(e.CBOR=u)}(this);

//domJSON
!function(e,t){if("function"==typeof define&&define.amd)define(function(){return t(e)});else if("undefined"!=typeof exports){var r=t(e);"undefined"!=typeof module&&module.exports&&(module.exports=r),exports=dmoJSON}else window.domJSON=t(e)}(this,function(e){"use strict";var t={},r={href:e.location.href||null,userAgent:window.navigator&&window.navigator.userAgent?window.navigator.userAgent:null,version:"0.1.2"},n={absolutePaths:["action","data","href","src"],attributes:!0,computedStyle:!1,cull:!0,deep:!0,domProperties:!0,filter:!1,htmlOnly:!1,metadata:!0,serialProperties:!1,stringify:!1},o={noMeta:!1},i=["link","script"],a=["nodeType","nodeValue","tagName"],s=["attributes","childNodes","children","classList","dataset","style"],u=["innerHTML","innerText","outerHTML","outerText","prefix","text","textContent","wholeText"],l=function(e){if(!arguments.length)return arguments[0]||{};for(var t in arguments[1])e[t]=arguments[1][t];if(arguments.length>2){var r=[e].concat(Array.prototype.slice.call(arguments,2));return l.apply(null,r)}return e},c=function(){if(!arguments.length)return[];for(var e=Array.prototype.concat.apply([],arguments),t=0;t<e.length;t++)e.indexOf(e[t])<t&&(e.splice(t,1),t--);return e},f=function(e){if(e instanceof Array)return e.slice();var t={};for(var r in e)t[r]=e[r];return t},d=function(e,t){var r;if(e instanceof Array)r=c(e.filter(function(e){return t.indexOf(e)>-1}));else{r={};for(var n in t)e.hasOwnProperty(t[n])&&(r[t[n]]=e[t[n]])}return r},p=function(e,t){var r;if(e instanceof Array)r=c(e.filter(function(e){return-1===t.indexOf(e)}));else{r={};for(var n in e)r[n]=e[n];for(var o in t)r.hasOwnProperty(t[o])&&delete r[t[o]]}return r},y=function(e,t){return t===!1?e instanceof Array?[]:{}:t instanceof Array&&t.length?"boolean"==typeof t[0]?1==t.length&&"boolean"==typeof t[0]?t[0]===!0?f(e):e instanceof Array?[]:{}:t[0]===!0?p(e,t.slice(1)):d(e,t.slice(1)):d(e,t):f(e)},m=function(e){var t;return"boolean"==typeof e?e:"object"==typeof e&&null!==e?e instanceof Array?e.filter(function(e,t){return"string"==typeof e||0===t&&e===!0?!0:!1}):e.values instanceof Array?(t=e.values.filter(function(e){return"string"==typeof e?!0:!1}),t.length?(e.exclude&&t.unshift(e.exclude),t):!1):!1:e?!0:!1},g=function(e,t){var r,n,o;if(e.match(/(?:^data\:|^[\w\-\+\.]*?\:\/\/|^\/\/)/i))return e;if("/"===e.charAt(0))return t+e.substr(1);r=t.indexOf("://")>-1?t.substring(0,t.indexOf("://")+3):"",n=(r.length?t.substring(r.length):t).split("/"),o=e.split("/"),n.pop();for(var i=0;i<o.length;i++)"."!=o[i]&&(".."==o[i]?n.length>1&&n.pop():n.push(o[i]));return r+n.join("/")},h=function(e,t){var r={};for(var n in e)"undefined"!=typeof e[n]&&"function"!=typeof e[n]&&n.charAt(0).toLowerCase()===n.charAt(0)&&("object"!=typeof e[n]||e[n]instanceof Array)&&(t.cull?(e[n]||0===e[n]||e[n]===!1)&&(r[n]=e[n]):r[n]=e[n]);return r=y(r,t.domProperties)},v=function(e,t){for(var r,n={},o=e.attributes,i=o.length,a=0;i>a;a++)n[o[a].name]=o[a].value;n=t.attributes?y(n,t.attributes):null,r=y(n,t.absolutePaths);for(var a in r)n[a]=g(r[a],t.absoluteBase);return n},b=function(t,r){var n,o={};if(!(r.computedStyle&&t.style instanceof CSSStyleDeclaration))return null;n=e.getComputedStyle(t);for(var i in n)"cssText"!==i&&!i.match(/\d/)&&"string"==typeof n[i]&&n[i].length&&(o[i]=n[i]);return r.computedStyle instanceof Array?y(o,r.computedStyle):o},w=function(e,t,r){var n,o,a,s,u,l=h(e,t);if(1===e.nodeType){for(var c in i)if(e.tagName.toLowerCase()===i[c])return null}else if(3===e.nodeType&&!e.nodeValue.trim())return null;if(t.attributes&&e.attributes&&(l.attributes=v(e,t)),t.computedStyle&&(n=b(e,t))&&(l.style=n),t.deep===!0||"number"==typeof t.deep&&t.deep>r){u=[],o=t.htmlOnly?e.children:e.childNodes,a=o.length;for(var f=0;a>f;f++)s=w(o[f],t,r+1),s&&u.push(s);l.childNodes=u}return l};t.toJSON=function(t,o){var i,f={},y={},g=(new Date).getTime(),h=a.slice(),v=s.slice();return f=l({},n,o),f.absolutePaths=m(f.absolutePaths),f.attributes=m(f.attributes),f.computedStyle=m(f.computedStyle),f.domProperties=m(f.domProperties),f.serialProperties=m(f.serialProperties),f.absoluteBase=e.location.origin+"/",f.serialProperties!==!0&&(v=v.concat(f.serialProperties instanceof Array&&f.serialProperties.length?f.serialProperties[0]===!0?p(u,f.serialProperties):d(u,f.serialProperties):u)),f.domProperties=f.domProperties instanceof Array?f.domProperties[0]===!0?p(c(f.domProperties,v),h):p(c(f.domProperties,h),v):f.domProperties===!1?h:[!0].concat(v),i=w(t,f,0),f.metadata?(y.meta=l({},r,{clock:(new Date).getTime()-g,date:(new Date).toISOString(),dimensions:{inner:{x:window.innerWidth,y:window.innerHeight},outer:{x:window.outerWidth,y:window.outerHeight}},options:f}),y.node=i):y=i,f.stringify?JSON.stringify(y):y};var P=function(e,t,r){switch(t instanceof DocumentFragment&&(t=t.ownerDocument),e){case 1:return"string"==typeof r.tagName?t.createElement(r.tagName):!1;case 3:return t.createTextNode("string"==typeof r.nodeValue&&r.nodeValue.length?r.nodeValue:"");case 7:return r.hasOwnProperty("target")&&r.hasOwnProperty("data")?t.createProcessingInstruction(r.target,r.data):!1;case 8:return t.createComment("string"==typeof r.nodeValue?r.nodeValue:"");case 9:return t.implementation.createHTMLDocument(r);case 11:return t;default:return!1}},x=function(e,t,r){if(!e.nodeType)return!1;var n=P(e.nodeType,r,e);t.appendChild(n);for(var o in e)if("object"!=typeof e[o]&&"isContentEditable"!==o&&"childNodes"!==o)try{n[o]=e[o]}catch(i){continue}if(1===e.nodeType&&e.tagName&&e.attributes)for(var a in e.attributes)n.setAttribute(a,e.attributes[a]);if(e.childNodes&&e.childNodes.length)for(var s in e.childNodes)x(e.childNodes[s],n,r)};return t.toDOM=function(e,t){var r,n;return"string"==typeof e&&(e=JSON.parse(e)),r=l({},o,t),n=document.createDocumentFragment(),r.noMeta?x(e,n,n):x(e.node,n,n),n},t});

// 2nd argument indicates the 'protocol' (channel).
var connection = new WebSocket('ws://localhost:8081', ['events'] );

connection.onerror = function (error) {
    console.log('WebSocket Error ' + error);
};

window.addEventListener("load", (e) => {

    let walker = document.createTreeWalker(
        document.documentElement, 
        NodeFilter.SHOW_ELEMENT, 
        { acceptNode: function(node) { return !node.getAttribute('identifier') } },
        null, 
        false

        ),
    node = walker.currentNode;

    while(node) {
        node.setAttribute('identifier',uuidv4())
        node = walker.nextNode();
    }

    // Form Observer
    //      These are the events we want to observe in the document.
    let eventTypes = [ 'change', 'input', 'invalid', 'reset', 'submit', 'select']  /* 'blur', 'contextmenu', 'focus', 'search' */
    let elementTypes = [ 'input', 'select', 'datalist', 'textarea', 'option', 'button']
    eventTypes.forEach(function(eventType) {
        window.addEventListener(eventType, (event) => {
            if(elementTypes.includes(event.target.nodeName.toLowerCase())) {
                event.target.setAttribute('value', Number(event.target.value))
            }
        });
    })

});

connection.onopen = function(event) {

    // Mutation Observer
    const observer = new MutationObserver(async (mutations, observer) => {

        mutations.forEach(mutation => {

            if(mutation.type === 'attributes') {
            /* if(mutation.attributeName === 'identifier') {
                    return;
                }*/
            }

            let documentMutation = {};
            for(property in mutation) {
                if(
                    mutation[property] !== null && 
                    !(  (property === 'addedNodes' || property === 'removedNodes') &&
                        (mutation[property].constructor.name === 'NodeList' && mutation[property].length === 0)
                    )
                    ) {    
                        if(property === 'addedNodes' || property === 'removedNodes') {
                            documentMutation[property] = Array.from(mutation[property])
                            documentMutation[property].forEach(node => {
                                // Filter out Comments & Text Nodes
                                if(![2,3,4,7,8].includes(node.nodeType)) {
                                    node.setAttribute('identifier', uuidv4())
                                }

                                node = domJSON.toJSON(node)

                            })
                        }  else {
                            documentMutation[property] = mutation[property]
                        }  
                }

                if(property === 'previousSibling' || property === 'nextSibling') {
                    if(mutation[property] !== null) {
                        if(![2,3,4,7,8].includes(mutation[property].nodeType)) {
                            documentMutation[property] = mutation[property].getAttribute('identifier');
                        } else {
                            documentMutation[property] = ''
                        }
                    }
                }

                if(property === 'target') {
                    // Modify the 'target' property of the mutation.
                    // Rather than the DOM Element, merely point to the target's identifier.
                    if(![2,3,4,7,8].includes(mutation[property].nodeType)) {
                        documentMutation[property] = mutation[property].getAttribute('identifier');
                    }
                    
                    documentMutation[property] = domJSON.toJSON(mutation[property], {
                        metadata:false,
                        deep: 2,
                        domProperties: false
                    })

                    // Should we use https://www.npmjs.com/package/mutation-summary here?
                }

            }

            let mutationRecord =  {
                htmlDocumentIdentifier: window.document.documentElement.getAttribute('identifier'), 
                mutationRecord: documentMutation 
            } 

            let output = JSON.stringify({mutationRecord});
            // window.mutation = mutation;
            let cbor = CBOR.encode(mutationRecord)
            connection.send(cbor)
            // console.log(output)
            console.log(cbor)
        })
         //   let hash = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(document.documentElement.innerHTML));
    });

    const config = { attributes: true, childList: true, subtree: true, characterData: true};
    observer.observe(document, config); 

}

connection.onmessage = function (e) {
    /*
var chat = document.getElementById("chat");
var msg = document.createElement("div");
msg.appendChild(document.createTextNode(e.data));
var child = chat.appendChild(msg);
child.scrollIntoView(false);
*/
console.log({e})
};
  
/*
function sendChat(msg) {
  connection.send(msg);
}
*/