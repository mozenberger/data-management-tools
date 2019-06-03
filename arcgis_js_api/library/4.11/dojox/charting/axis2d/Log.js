//>>built
define("dojo/_base/lang dojo/_base/array dojo/_base/sniff dojo/_base/declare dojo/_base/connect dojo/dom-geometry ./Invisible ../scaler/common ../scaler/linear ../scaler/log ./common dojox/gfx dojox/lang/utils dojox/lang/functional".split(" "),function(y,K,Y,aa,M,ba,ca,fa,da,ea,U,x,R,S){return aa("dojox.charting.axis2d.Log",ca,{defaultParams:{vertical:!1,fixUpper:"none",fixLower:"none",natural:!1,leftBottom:!0,includeZero:!1,fixed:!0,majorLabels:!0,minorTicks:!0,minorLabels:!0,microTicks:!1,rotation:0,
htmlLabels:!0,enableCache:!1,dropLabels:!0,labelSizeChange:!1,log:10},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],labelFunc:null,maxLabelSize:0,maxLabelCharCount:0,trailingSymbol:null,stroke:{},majorTick:{},minorTick:{},microTick:{},tick:{},font:"",fontColor:"",title:"",titleGap:0,titleFont:"",titleFontColor:"",titleOrientation:""},constructor:function(a,c){this.opt=y.clone(this.defaultParams);R.updateWithObject(this.opt,c);R.updateWithPattern(this.opt,
c,this.optionalParams);this.opt.enableCache&&(this._textFreePool=[],this._lineFreePool=[],this._textUsePool=[],this._lineUsePool=[]);this._invalidMaxLabelSize=!0;1<this.opt.log?(this.scalerType=ea,this.scalerType.setBase(this.opt.log)):this.scalerType=da},setWindow:function(a,c){a!=this.scale&&(this._invalidMaxLabelSize=!0);return this.inherited(arguments)},_groupLabelWidth:function(a,c,g){if(!a.length)return 0;50<a.length&&(a.length=50);y.isObject(a[0])&&(a=S.map(a,function(a){return a.text}));g&&
(a=S.map(a,function(a){return 0==y.trim(a).length?"":a.substring(0,g)+this.trailingSymbol},this));a=a.join("\x3cbr\x3e");return x._base._getTextBox(a,{font:c}).w||0},_getMaxLabelSize:function(a,c,g,h,f,l){if(null==this._maxLabelSize&&6==arguments.length){var m=this.opt;this.scaler.minMinorStep=this._prevMinMinorStep=0;var b=y.clone(m);delete b.to;delete b.from;var k=this.scalerType.buildScaler(a,c,g,b,m.to-m.from);k.minMinorStep=0;this._majorStart=k.major.start;m=this.scalerType.buildTicks(k,m);if(l&&
m){var p=k=0,d=function(a){a.label&&this.push(a.label)},e=[];this.opt.majorLabels&&(K.forEach(m.major,d,e),k=this._groupLabelWidth(e,f,b.maxLabelCharCount),b.maxLabelSize&&(k=Math.min(b.maxLabelSize,k)));e=[];this.opt.dropLabels&&this.opt.minorLabels&&(K.forEach(m.minor,d,e),p=this._groupLabelWidth(e,f,b.maxLabelCharCount),b.maxLabelSize&&(p=Math.min(b.maxLabelSize,p)));this._maxLabelSize={majLabelW:k,minLabelW:p,majLabelH:l,minLabelH:l}}else this._maxLabelSize=null}return this._maxLabelSize},calculate:function(a,
c,g){this.inherited(arguments,[a,c,g,this.scalerType]);this.scaler.minMinorStep=this._prevMinMinorStep;if((this._invalidMaxLabelSize||g!=this._oldSpan)&&Infinity!=a&&-Infinity!=c){this._invalidMaxLabelSize=!1;this.opt.labelSizeChange&&(this._maxLabelSize=null);this._oldSpan=g;var h=this.opt,f=this.chart.theme.axis,l=h.rotation%360,m=this.chart.theme.axis.tick.labelGap,b=h.font||f.majorTick&&f.majorTick.font||f.tick&&f.tick.font,f=b?x.normalizedLength(x.splitFontString(b).size):0,b=this._getMaxLabelSize(a,
c,g,l,b,f);"number"!=typeof m&&(m=4);if(b&&h.dropLabels){var h=Math.abs(Math.cos(l*Math.PI/180)),k=Math.abs(Math.sin(l*Math.PI/180));0>l&&(l+=360);switch(l){case 0:case 180:this.vertical?l=f:(l=b.majLabelW,f=b.minLabelW);break;case 90:case 270:this.vertical?(l=b.majLabelW,f=b.minLabelW):l=f;break;default:l=this.vertical?Math.min(b.majLabelW,f/h):Math.min(b.majLabelW,f/k),f=Math.min(Math.sqrt(b.minLabelW*b.minLabelW+f*f),this.vertical?f*h+b.minLabelW*k:b.minLabelW*h+f*k)}this.scaler.minMinorStep=this._prevMinMinorStep=
Math.max(l,f)+m;this._skipInterval=this.scaler.minMinorStep<=this.scaler.minor.tick*this.scaler.bounds.scale?0:Math.floor((l+m)/(this.scaler.major.tick*this.scaler.bounds.scale))}else this._skipInterval=0}this.ticks=this.scalerType.buildTicks(this.scaler,this.opt);return this},getOffsets:function(){var a={l:0,r:0,t:0,b:0};if(!this.scaler)return a;var c=this.opt,g=this.chart.theme.axis,h=this.chart.theme.axis.tick.labelGap,f=c.titleFont||g.title&&g.title.font,g=0==c.titleGap?0:c.titleGap||g.title&&
g.title.gap,l=this.chart.theme.getTick("major",c),m=this.chart.theme.getTick("minor",c),f=f?x.normalizedLength(x.splitFontString(f).size):0,b=c.rotation%360,k=c.leftBottom,p=Math.abs(Math.cos(b*Math.PI/180)),d=Math.abs(Math.sin(b*Math.PI/180));this.trailingSymbol=void 0===c.trailingSymbol||null===c.trailingSymbol?this.trailingSymbol:c.trailingSymbol;"number"!=typeof h&&(h=4);0>b&&(b+=360);var e=this._getMaxLabelSize();if(e){var r=Math.ceil(Math.max(e.majLabelW,e.minLabelW))+1,n=Math.ceil(Math.max(e.majLabelH,
e.minLabelH))+1;if(this.vertical)switch(e=k?"l":"r",b){case 0:case 180:a[e]=r;a.t=a.b=n/2;break;case 90:case 270:a[e]=n;a.t=a.b=r/2;break;default:45>=b||180<b&&225>=b?(a[e]=n*d/2+r*p,a[k?"t":"b"]=n*p/2+r*d,a[k?"b":"t"]=n*p/2):315<b||180>b&&135<b?(a[e]=n*d/2+r*p,a[k?"b":"t"]=n*p/2+r*d,a[k?"t":"b"]=n*p/2):90>b||180<b&&270>b?(a[e]=n*d+r*p,a[k?"t":"b"]=n*p+r*d):(a[e]=n*d+r*p,a[k?"b":"t"]=n*p+r*d)}else switch(e=k?"b":"t",b){case 0:case 180:a[e]=n;a.l=a.r=r/2;break;case 90:case 270:a[e]=r;a.l=a.r=n/2;break;
default:45<=b&&90>=b||225<=b&&270>=b?(a[e]=n*p/2+r*d,a[k?"r":"l"]=n*d/2+r*p,a[k?"l":"r"]=n*d/2):90<=b&&135>=b||270<=b&&315>=b?(a[e]=n*p/2+r*d,a[k?"l":"r"]=n*d/2+r*p,a[k?"r":"l"]=n*d/2):45>b||180<b&&225>b?(a[e]=n*p+r*d,a[k?"r":"l"]=n*d+r*p):(a[e]=n*p+r*d,a[k?"l":"r"]=n*d+r*p)}a[e]+=h+Math.max(l.length,m.length)+(c.title?f+g:0)}return a},cleanGroup:function(a){this.opt.enableCache&&this.group&&(this._lineFreePool=this._lineFreePool.concat(this._lineUsePool),this._lineUsePool=[],this._textFreePool=this._textFreePool.concat(this._textUsePool),
this._textUsePool=[]);this.inherited(arguments)},createText:function(a,c,g,h,f,l,m,b,k){if(!this.opt.enableCache||"html"==a)return U.createText[a](this.chart,c,g,h,f,l,m,b,k);0<this._textFreePool.length?(a=this._textFreePool.pop(),a.setShape({x:g,y:h,text:l,align:f}),c.add(a)):a=U.createText[a](this.chart,c,g,h,f,l,m,b);this._textUsePool.push(a);return a},createLine:function(a,c){var g;this.opt.enableCache&&0<this._lineFreePool.length?(g=this._lineFreePool.pop(),g.setShape(c),a.add(g)):g=a.createLine(c);
this.opt.enableCache&&this._lineUsePool.push(g);return g},render:function(a,c){var g,h,f,l,m,b,k,p,d,e,r,n,F,G;if(!this.dirty||!this.scaler)return this;var u=this.opt;d=this.chart.theme.axis;var B=u.leftBottom,t=u.rotation%360,w=0,C,q,w=this.chart.theme.axis.tick.labelGap,z=u.font||d.majorTick&&d.majorTick.font||d.tick&&d.tick.font,y=u.titleFont||d.title&&d.title.font,M=u.fontColor||d.majorTick&&d.majorTick.fontColor||d.tick&&d.tick.fontColor||"black",R=u.titleFontColor||d.title&&d.title.fontColor||
"black";m=0==u.titleGap?0:u.titleGap||d.title&&d.title.gap||15;var H=u.titleOrientation||d.title&&d.title.orientation||"axis",N=this.chart.theme.getTick("major",u),O=this.chart.theme.getTick("minor",u),V=this.chart.theme.getTick("micro",u),S="stroke"in u?u.stroke:d.stroke,v=z?x.normalizedLength(x.splitFontString(z).size):0;b=Math.abs(Math.cos(t*Math.PI/180));C=Math.abs(Math.sin(t*Math.PI/180));var L=y?x.normalizedLength(x.splitFontString(y).size):0;"number"!=typeof w&&(w=4);0>t&&(t+=360);var P=this._getMaxLabelSize(),
P=P&&P.majLabelW;if(this.vertical){F=a.height-c.b;G=void 0;r=c.t;n=void 0;d=(a.height-c.b+c.t)/2;e=void 0;C=v*C+(P||0)*b+w+Math.max(N.length,O.length)+L+m;k=0;p=-1;h=g=0;m=1;b=0;f=w;l=0;switch(t){case 0:q="end";h=.4*v;break;case 90:q="middle";g=-v;break;case 180:q="start";h=.4*-v;break;case 270:q="middle";break;default:45>t?(q="end",h=.4*v):90>t?(q="end",h=.4*v):135>t?q="start":225>t?(q="start",h=.4*-v):270>t?(q="start",g=B?0:.4*v):315>t?(q="end",g=B?0:.4*v):(q="end",h=.4*v)}if(B)G=n=c.l,w=H&&"away"==
H?90:270,e=c.l-C+(270==w?L:0),m=-1,f=-f;else switch(G=n=a.width-c.r,w=H&&"axis"==H?90:270,e=a.width-c.r+C-(270==w?0:L),q){case "start":q="end";break;case "end":q="start";break;case "middle":g+=v}}else{G=c.l;F=void 0;n=a.width-c.r;r=void 0;e=(a.width-c.r+c.l)/2;d=void 0;C=v*b+(P||0)*C+w+Math.max(N.length,O.length)+L+m;k=1;m=h=g=p=0;b=1;f=0;l=w;switch(t){case 0:q="middle";h=v;break;case 90:q="start";g=.4*-v;break;case 180:q="middle";break;case 270:q="end";g=.4*v;break;default:45>t?(q="start",h=B?v:
0):135>t?(q="start",g=.4*-v):180>t?(q="start",h=B?0:-v):225>t?(q="end",h=B?0:-v):315>t?(q="end",h=B?.4*v:0):(q="end",h=B?v:0)}if(B)F=r=a.height-c.b,w=H&&"axis"==H?180:0,d=a.height-c.b+C-(w?L:0);else switch(F=r=c.t,w=H&&"away"==H?180:0,d=c.t-C+(w?0:L),b=-1,l=-l,q){case "start":q="end";break;case "end":q="start";break;case "middle":h-=v}}this.cleanGroup();var I=this.group;a=this.scaler;var J=this.ticks,W=this.scalerType.getTransformerFromModel(this.scaler),A=u.title&&w||t||!this.opt.htmlLabels||Y("ie")||
Y("opera")?"gfx":"html",D=m*N.length,E=b*N.length,T=this._skipInterval;I.createLine({x1:G,y1:F,x2:n,y2:r}).setStroke(S);u.title&&(y=U.createText[A](this.chart,I,e,d,"middle",u.title,y,R),"html"==A?this.htmlElements.push(y):y.setTransform(x.matrix.rotategAt(w,e,d)));if(null==J)return this.dirty=!1,this;var X=this.opt.majorLabels;K.forEach(J.major,function(a,b){var d=W(a.value),c=G+k*d,d=F+p*d;this.createLine(I,{x1:c,y1:d,x2:c+D,y2:d+E}).setStroke(N);if(a.label&&(!T||0==(b-(1+T))%(1+T))){var e=u.maxLabelCharCount?
this.getTextWithLimitCharCount(a.label,z,u.maxLabelCharCount):{text:a.label,truncated:!1},e=u.maxLabelSize?this.getTextWithLimitLength(e.text,z,u.maxLabelSize,e.truncated):e;b=this.createText(A,I,c+D+f+(t?0:g),d+E+l+(t?0:h),q,e.text,z,M);this.chart.truncateBidi&&e.truncated&&this.chart.truncateBidi(b,a.label,A);e.truncated&&this.labelTooltip(b,this.chart,a.label,e.text,z,A);"html"==A?this.htmlElements.push(b):t&&b.setTransform([{dx:g,dy:h},x.matrix.rotategAt(t,c+D+f,d+E+l)])}},this);D=m*O.length;
E=b*O.length;if(X=this.opt.minorLabels&&!T&&10===this.opt.log&&J.minor.length){var Q=1,Z=Math.log(10);K.forEach(J.minor,function(a,b){a=Math.log(a.value)/Z;Q=Math.min(Q,a-Math.floor(a),Math.ceil(a)-a);b&&(Q=Math.min(Q,a-Math.log(J.minor[b-1].value)/Z))});X=a.minMinorStep<=Q*a.bounds.scale}K.forEach(J.minor,function(a){var b=W(a.value),d=G+k*b,c=F+p*b;this.createLine(I,{x1:d,y1:c,x2:d+D,y2:c+E}).setStroke(O);if(X&&a.label){var e=u.maxLabelCharCount?this.getTextWithLimitCharCount(a.label,z,u.maxLabelCharCount):
{text:a.label,truncated:!1},e=u.maxLabelSize?this.getTextWithLimitLength(e.text,z,u.maxLabelSize,e.truncated):e,b=this.createText(A,I,d+D+f+(t?0:g),c+E+l+(t?0:h),q,e.text,z,M);this.chart.getTextDir&&e.truncated&&this.chart.truncateBidi(b,a.label,A);e.truncated&&this.labelTooltip(b,this.chart,a.label,e.text,z,A);"html"==A?this.htmlElements.push(b):t&&b.setTransform([{dx:g,dy:h},x.matrix.rotategAt(t,d+D+f,c+E+l)])}},this);D=m*V.length;E=b*V.length;K.forEach(J.micro,function(a){var b=W(a.value);a=G+
k*b;b=F+p*b;this.createLine(I,{x1:a,y1:b,x2:a+D,y2:b+E}).setStroke(V)},this);this.dirty=!1;return this},labelTooltip:function(a,c,g,h,f,l){var m=["dijit/Tooltip"],b={type:"rect"},k=["above","below"];h=x._base._getTextBox(h,{font:f}).w||0;f=f?x.normalizedLength(x.splitFontString(f).size):0;"html"==l?(y.mixin(b,ba.position(a.firstChild,!0)),b.width=Math.ceil(h),b.height=Math.ceil(f),this._events.push({shape:dojo,handle:M.connect(a.firstChild,"onmouseover",this,function(a){require(m,function(a){a.show(g,
b,k)})})}),this._events.push({shape:dojo,handle:M.connect(a.firstChild,"onmouseout",this,function(a){require(m,function(a){a.hide(b)})})})):(l=a.getShape(),c=c.getCoords(),b=y.mixin(b,{x:l.x-h/2,y:l.y}),b.x+=c.x,b.y+=c.y,b.x=Math.round(b.x),b.y=Math.round(b.y),b.width=Math.ceil(h),b.height=Math.ceil(f),this._events.push({shape:a,handle:a.connect("onmouseenter",this,function(a){require(m,function(a){a.show(g,b,k)})})}),this._events.push({shape:a,handle:a.connect("onmouseleave",this,function(a){require(m,
function(a){a.hide(b)})})}))},isNullValue:function(a){return 0>=a},naturalBaseline:1})});