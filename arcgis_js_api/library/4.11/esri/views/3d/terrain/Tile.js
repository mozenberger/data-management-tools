// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/arrayUtils ../../../core/libs/gl-matrix-2/vec2 ../../../core/libs/gl-matrix-2/vec2f64 ../../../core/libs/gl-matrix-2/vec3 ../../../core/libs/gl-matrix-2/vec3f64 ../../../core/libs/gl-matrix-2/vec4 ../../../core/libs/gl-matrix-2/vec4f64 ../../../geometry/support/aaBoundingRect ../support/mathUtils ./ElevationTileAgent ./MapTileAgent ./TerrainConst ./terrainUtils ./TileAgent ./TilePerLayerInfo ./tileUtils ../../vectorTiles/VectorTileDisplayObject ../../webgl/Texture ../../webgl/Util".split(" "),
function(K,L,z,q,D,m,p,E,F,u,r,v,w,f,G,l,A,B,H,I,C){function x(c){c.dispose();c instanceof v?v.Pool.release(c):c instanceof w&&w.Pool.release(c)}var y=G.weakAssert,t=p.vec3f64.create(),n=p.vec3f64.create(),h=F.vec4f64.create(),J=p.vec3f64.create();return function(){function c(a){this._numSubdivisionAtLevel=a;this.lij=[0,0,0];this._dirty=!0;this.extent=u.create();this._elevationBounds=D.vec2f64.create();this.children=[null,null,null,null];this.layerInfo=Array(f.LayerClass.COUNT);this.extentWGS84Rad=
u.create();this.centerAtSeaLevel=p.vec3f64.create();this.center=p.vec3f64.create();this.tileUp=J;this.intersectsClippingArea=this._isWithinClippingArea=!0;this.clippingArea=null;this._memoryUsed=this.radius=this.edgeLen2=this.edgeLen=this.renderOrder=this.screenDepth=this._maxTesselation=0}Object.defineProperty(c.prototype,"memoryUsed",{get:function(){return this._memoryUsed},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"maxTesselation",{get:function(){return this._maxTesselation},
enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"numSubdivisionsAtLevel",{get:function(){return this._numSubdivisionAtLevel},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"isWithinClippingArea",{get:function(){return this._isWithinClippingArea},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"parent",{get:function(){return this._parent},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"surface",{get:function(){return this._surface},
enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"elevationBounds",{get:function(){return this._elevationBounds},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"visible",{get:function(){if(this._dirty){var a=this._isVisible();a!==this._visible&&(this._visible=a,this.updateAgentSuspension(),this._visible=a);this._dirty=!1}return this._visible},enumerable:!0,configurable:!0});c.prototype.init=function(a,b,d){this.lij[0]=a[0];this.lij[1]=a[1];this.lij[2]=a[2];d.tilingScheme.getExtent(a[0],
a[1],a[2],this.extent,this.extentWGS84Rad);this.intersectsClippingArea=this._isWithinClippingArea=!0;this.clippingArea=null;this.radius=this.edgeLen2=this.edgeLen=0;this.vlevel=a?a[0]:0;b&&b._elevationBounds?q.vec2.copy(this.elevationBounds,b.elevationBounds):q.vec2.set(this.elevationBounds,0,0);this._pendingUpdates=0;this.renderData=null;this.screenDepth=0;this._visible=!1;this._dirty=!0;this._parent=b;this._surface=d;for(a=0;4>a;a++)this.children[a]=null;for(a=0;a<f.LayerClass.COUNT;a++){b=d.numLayers(a);
var e=this.layerInfo[a];this.layerInfo[a]?e.length=b:(e=Array(b),this.layerInfo[a]=e);for(var c=0;c<b;c++)e[c]=A.TilePerLayerInfo.makeEmptyLayerInfo(a,this._surface.upsampleInfoPool,e[c]),a===f.LayerClass.ELEVATION&&this.findElevationBoundsForLayer(c,-1)}this.computeElevationBounds();this._maxTesselation=Math.min(d.tilingScheme.pixelSize[0],f.MAX_TILE_TESSELATION)};c.prototype.dispose=function(){y(!this.renderData,"tile.renderData was not unloaded");this._parent&&y(-1===this._parent.children.indexOf(this),
"still linked");for(var a=0;a<f.LayerClass.COUNT;a++)for(var b=0,d=this.layerInfo[a];b<d.length;b++)d[b].dispose();this._surface=this._parent=null;this._memoryUsed=0};c.prototype.updateMemoryUsed=function(){for(var a=this._surface.tilingScheme.pixelSize,a=a[0]*a[1]*4,b=this._memoryUsed=0,d=this.layerInfo[f.LayerClass.MAP];b<d.length;b++){var e=d[b],e=e.data;e instanceof I?this._memoryUsed+=C.getGpuMemoryUsage(e):e instanceof HTMLImageElement?this._memoryUsed+=a:e instanceof H&&(this._memoryUsed+=
e.getGpuMemoryUsage()+e.getCpuMemoryUsage())}b=0;for(d=this.layerInfo[f.LayerClass.ELEVATION];b<d.length;b++)e=d[b],this._memoryUsed+=e.data?a:0;this.renderData&&(this._memoryUsed+=this.renderData.estimatedGeometryMemoryUsage,a=this.renderData.textureDescriptor)&&(this._memoryUsed+=C.getGpuMemoryUsage(a))};c.prototype.updateScreenDepth=function(a){m.vec3.copy(h,this.center);h[3]=1;E.vec4.transformMat4(h,h,a);this.screenDepth=h[2]/h[3]};c.prototype.shouldSplit=function(a,b){var d=this.lij[0];m.vec3.subtract(t,
this.center,b);var e=m.vec3.squaredLength(t),c=a[4];if(e<this.edgeLen2&&d<c)return f.TileUpdate.SPLIT;var k=a[1],e=2*Math.sqrt(e),h=this.edgeLen/(a[0]*e);return h<k?this.vlevel!==this.lij[0]?(this.vlevel=this.lij[0],f.TileUpdate.VSPLITMERGE):f.TileUpdate.NONE:d>=c?(a=d+Math.ceil(-r.log2(k/h)),a!==this.vlevel?(this.vlevel=a,f.TileUpdate.VSPLITMERGE):f.TileUpdate.NONE):6<d&&(m.vec3.scale(n,this.tileUp,m.vec3.dot(this.tileUp,t)),m.vec3.subtract(n,n,t),d=m.vec3.squaredLength(n),d>this.radius*this.radius&&
(m.vec3.scale(n,n,this.radius/Math.sqrt(d)),m.vec3.add(n,n,this.center),m.vec3.subtract(n,b,n),b=this._elevationBounds[1]-this._elevationBounds[0],Math.min(1,(Math.abs(m.vec3.dot(n,this.tileUp))+.5*b+this.curvatureHeight)/m.vec3.length(n))*(this.edgeLen/(a[2]*e))<.1/a[5]*a[3]))?f.TileUpdate.NONE:f.TileUpdate.SPLIT};c.prototype.getWGS84Extent=function(){var a=this.extentWGS84Rad;return u.fromValues(r.rad2deg(a[0]),r.rad2deg(a[1]),r.rad2deg(a[2]),r.rad2deg(a[3]))};c.prototype.load=function(a){for(var b=
null==this.renderData&&a.loadCachedElevationData(this),d=0;d<f.LayerClass.COUNT;d++)if(this.layerInfo[d])if(d===f.LayerClass.ELEVATION&&b)for(var e=0,c=this.layerInfo[d];e<c.length;e++)c[e].loadingAgent=l.DONE;else this._createOrUpdateAgents(0,d);a.loadTile(this)};c.prototype.unload=function(a){a.unloadTile(this,this.elevationDone);for(a=0;a<f.LayerClass.COUNT;a++)for(var b=0,d=this.layerInfo[a];b<d.length;b++){var e=d[b];e.loadingAgent&&e.loadingAgent!==l.DONE&&(x(e.loadingAgent),e.loadingAgent=
null);e.pendingUpdates=0}this._pendingUpdates&=~f.TileUpdate.GEOMETRY;this._pendingUpdates&=~f.TileUpdate.TEXTURE};c.prototype.updateClippingStatus=function(a){if(z.equals(a,this.clippingArea))return!1;var b=this.intersectsClippingArea,d=this._isWithinClippingArea;a?(this.intersectsClippingArea=this.intersectsExtent(a),this._isWithinClippingArea=this.isWithinExtent(a)):this._isWithinClippingArea=this.intersectsClippingArea=!0;this.clippingArea=a;this._dirty=!0;a=d&&this._isWithinClippingArea;b=!d&&
!b&&!this._isWithinClippingArea&&!this.intersectsClippingArea;!this.renderData||a||b||this.setPendingUpdate(f.TileUpdate.GEOMETRY);return!0};c.prototype.updateVisibility=function(){this._dirty=!0};c.prototype.getLayerInfo=function(a,b){return this.layerInfo[b][a]};c.prototype.hasLayerData=function(a,b){return(a=this.layerInfo[b][a])&&a.data&&!a.dataInvalidated};c.prototype.hasDataAvailable=function(a,b,d){return(b=this.layerInfo[d][b].tilemap)?"unavailable"!==b.getAvailability(a.lij[1],a.lij[2]):
!0};Object.defineProperty(c.prototype,"hasPendingUpdates",{get:function(){return 0!==this._pendingUpdates},enumerable:!0,configurable:!0});c.prototype.isSuspended=function(a){return this.hasPendingUpdate(f.TileUpdate.SPLIT)?!0:a===f.LayerClass.ELEVATION?!1:!this.visible};Object.defineProperty(c.prototype,"elevationDone",{get:function(){if(this.hasPendingUpdate(f.TileUpdate.GEOMETRY))return!1;for(var a=0,b=this.layerInfo[f.LayerClass.ELEVATION];a<b.length;a++){var d=b[a];if(d.loadingAgent!==l.DONE||
!d.upsampleFromTile)return!1}return!0},enumerable:!0,configurable:!0});c.prototype.hasPendingUpdate=function(a){return(this._pendingUpdates&a)===a};c.prototype.setPendingUpdate=function(a){this._pendingUpdates|=a;this._surface.setPendingUpdates()};c.prototype.resetPendingUpdate=function(a){return this.hasPendingUpdate(a)?(this._pendingUpdates&=~a,!0):!1};c.prototype.requestLayerData=function(a,b,d){f.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d requested by tile %s",this.lij.toString(),
b,a,d.tile.lij.toString());var e=this.layerInfo[b][a];if(-1<e.waitingAgents.indexOf(d))return console.warn("agent already requested this piece of map data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),d.tile.lij.toString(),b,a),!0;e.waitingAgents.push(d);if(e.data&&!e.dataInvalidated)return console.warn("agent requested existing data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),d.tile.lij.toString(),b,a),setTimeout(d.dataArrived.bind(d,this),0),!0;if(e.requestPromise)return!0;
var c=this._surface.requestTileData(this,a,b);if(!c||c.isFulfilled())return!1;a=function(){e.requestPromise===c&&(e.requestPromise=null)};e.requestPromise=c;c.then(a,a);return!0};c.prototype.descendants=function(a){a||(a=[]);for(var b=0;4>b;b++){var d=this.children[b];d&&(d.descendants(a),a.unshift(this.children[b]))}return a};Object.defineProperty(c.prototype,"isLeaf",{get:function(){return!this.children[0]&&!this.children[1]&&!this.children[2]&&!this.children[3]},enumerable:!0,configurable:!0});
c.prototype.hasLij=function(a){return this.lij[0]===a[0]&&this.lij[1]===a[1]&&this.lij[2]===a[2]};c.prototype.findByLij=function(a){if(this.hasLij(a))return this;for(var b=0;4>b;b++){var d=this.children[b];if(d&&(d=d.findByLij(a)))return d}return null};c.prototype.unrequestLayerData=function(a,b,d){f.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d canceled by tile %s",this.lij.toString(),b,a,d.tile.lij.toString());var c=this.layerInfo[b][a],g=c.waitingAgents;d=null!=z.removeUnordered(g,d);
y(d,"agent has not requested this piece of map data");1>g.length&&((g=c.requestPromise)&&!g.isFulfilled()&&(g.cancel(),c.requestPromise=null),f.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d request/loading canceled",this.lij.toString(),b,a),this.updateMemoryUsed())};c.prototype.dataArrived=function(a,b,d){a=this.layerInfo[b][a];a.data=d;a.dataInvalidated=!1;for(d=0;d<a.waitingAgents.length;d++)a.waitingAgents[d].dataArrived(this);a.waitingAgents.length=0;this.updateMemoryUsed()};c.prototype.dataMissing=
function(a,b,d){d.notInTilemap||console.error("Tile %s layer %d/%d error",this.lij.toString(),b,a);a=this.layerInfo[b][a];a.dataMissing=!0;for(b=0;b<a.waitingAgents.length;b++)a.waitingAgents[b].dataMissing(this);a.waitingAgents.length=0;this.updateMemoryUsed()};c.prototype.updateRenderData=function(a){switch(a){case f.LayerClass.MAP:return this.updateTexture();case f.LayerClass.ELEVATION:return this.updateGeometry()}};c.prototype.updateTexture=function(){this.renderData&&(this._pendingUpdates|=f.TileUpdate.TEXTURE,
this._surface.setPendingUpdates())};c.prototype.updateGeometry=function(){this.setPendingUpdate(f.TileUpdate.GEOMETRY);for(var a=0,b=this.layerInfo[f.LayerClass.ELEVATION];a<b.length;a++)b[a].pendingUpdates|=f.TileUpdate.GEOMETRY;this._surface.setPendingUpdates()};c.prototype.invalidateLayerData=function(a,b){this.layerInfo[b][a].invalidateSourceData();this.restartAgents(b)};c.prototype.computeElevationBounds=function(){q.vec2.set(this._elevationBounds,Number.MAX_VALUE,-Number.MAX_VALUE);for(var a=
!1,b=0,d=this.layerInfo[f.LayerClass.ELEVATION];b<d.length;b++){var c=d[b];c.elevationBounds&&(this._elevationBounds[0]=Math.min(this._elevationBounds[0],c.elevationBounds[0]),this._elevationBounds[1]=Math.max(this._elevationBounds[1],c.elevationBounds[1]),a=!0)}a||q.vec2.set(this._elevationBounds,0,0);this.updateRadiusAndCenter()};c.prototype.updateRadiusAndCenter=function(){m.vec3.scale(n,this.tileUp,.5*(this._elevationBounds[0]+this._elevationBounds[1]));m.vec3.add(this.center,this.centerAtSeaLevel,
n)};c.prototype.findElevationBoundsForLayer=function(a,b){var d=this.layerInfo[f.LayerClass.ELEVATION][a];if(!d.elevationBounds||d.elevationBounds[2]<b)if(b=this._surface.layerViewByIndex(a,f.LayerClass.ELEVATION),B.fallsWithinLayer(this,b.layer,!1)){b=!1;if(d.data){var c=d.data;q.vec2.copy(h,c.bounds);h[2]=this.lij[0];b=!0}else{for(var g=0,k=void 0,c=void 0,l=this._parent;l&&(!c||g<f.ELEVATION_DESIRED_RESOLUTION_LEVEL)&&!(g=this.vlevel-l.lij[0],k=c||k,c=l.layerInfo[f.LayerClass.ELEVATION][a].data,
!c&&k&&g>=f.ELEVATION_DESIRED_RESOLUTION_LEVEL);l=l._parent);if(c=c||k)c.computeMinMaxValue(this.lij[0],this.lij[1],this.lij[2],h),Infinity!==h[0]&&(h[2]=c.level,b=!0)}b&&(d.elevationBounds?m.vec3.copy(d.elevationBounds,h):d.elevationBounds=[h[0],h[1],h[2]])}};c.prototype.modifyLayers=function(a,b,d){for(var c=this.layerInfo[d],g=0;g<c.length;g++){var k=c[g];k.loadingAgent&&k.loadingAgent!==l.DONE&&(x(k.loadingAgent),k.loadingAgent=null);k.waitingAgents.length=0}if(d===f.LayerClass.MAP)for(g=0;g<
c.length;++g)void 0===a[g]&&c[g].dispose();a=b.length;k=Array(a);for(g=0;g<a;g++){var h=b[g];k[g]=-1<h?c[h]:A.TilePerLayerInfo.makeEmptyLayerInfo(d,this._surface.upsampleInfoPool)}this.layerInfo[d]=k;this.updateMemoryUsed()};c.prototype.restartAgents=function(a){this.renderData&&(this._createOrUpdateAgents(0,a),this.updateRenderData(a))};c.prototype.updateAgents=function(a){if(this.renderData){for(var b=this.layerInfo[a],c=0;c<b.length;c++){var e=b[c];e.loadingAgent===l.DONE&&(e.loadingAgent=null)}this._createOrUpdateAgents(0,
a)}};c.prototype.updateAgentSuspension=function(){for(var a=0;a<f.LayerClass.COUNT;a++)for(var b=this.isSuspended(a),c=0,e=this.layerInfo[a];c<e.length;c++){var g=e[c];g.loadingAgent&&g.loadingAgent!==l.DONE&&(g.loadingAgent.setSuspension(b),g.loadingAgent===l.DONE&&this.updateRenderData(a))}};c.prototype.removeLayerAgent=function(a,b){a=this.layerInfo[b][a];a.loadingAgent&&a.loadingAgent!==l.DONE&&a.loadingAgent.dispose();a.loadingAgent=null};c.prototype.agentDone=function(a,b){var c=this.layerInfo[b][a];
c.loadingAgent=l.DONE;c.data||c.upsampleFromTile||this._createOrUpdateAgents(a+1,b)};c.prototype._createOrUpdateAgents=function(a,b){for(var c=this.isSuspended(b),e=this.layerInfo[b];a<e.length;++a){var g=e[a],k=!1,h=this._surface.layerViewByIndex(a,b);if(g.loadingAgent)g.loadingAgent!==l.DONE&&g.loadingAgent.setSuspension(c),g.loadingAgent!==l.DONE&&(k=g.loadingAgent.update());else if(B.fallsWithinLayer(this,h.layer,!1)){var k=g,m=a,n=b,q=c,p=n===f.LayerClass.ELEVATION?v.Pool.acquire():w.Pool.acquire();
p.init(this,m,n,q);k.loadingAgent=p;(k=g.loadingAgent.startLoading())?g.loadingAgent===l.DONE&&this.setPendingUpdate(f.TileUpdate.GEOMETRY):(x(g.loadingAgent),g.loadingAgent=l.DONE)}g.loadingAgent===l.DONE&&this.updateRenderData(b);if(k&&h.isOpaque)break}};c.prototype.isWithinExtent=function(a){var b=this.extent;return b[0]>=a[0]&&a[2]>=b[2]&&b[1]>=a[1]&&a[3]>=b[3]};c.prototype.intersectsExtent=function(a){var b=this.extent;return b[2]>=a[0]&&a[2]>=b[0]&&b[3]>=a[1]&&a[3]>=b[1]};return c}()});