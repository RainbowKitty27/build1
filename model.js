AFRAME.registerComponent("models",{
  init:async function(){
    var build=await this.getStuff()
    var barcode = Object.keys(build);

    barcode.map(barcode => {
      var element = build[barcode];
      this.creatModel(element);
    });
  },
  getStuff: function() {
    return fetch("js/build.json")
      .then(res => res.json())
      .then(data => data);
  },
  creatModel:function(model){
    var barcodeValue=model.barcode_value
    var modelUrl=model.model_url
var modelName=model.model_name
var scene=document.querySelector("a-scene")
var marker=document.createElement("a-marker")
marker.setAttribute("id",`marker-${modelName}`)
marker.setAttribute("type","barcode")
marker.setAttribute("model_name",modelName)
marker.setAttribute("value",barcodeValue)
marker.setAttribute("markerhandler",{})
scene.appendChild(marker)
if(barcodeValue===0){
    var modelEl=document.createElement("a-entity")
    modelEl.setAttribute("id",`${modelName}`)
    modelEl.setAttribute("geometry",{
        primitiv:"box",
        width:model.width,
        height:model.height
    })
    modelEl.setAttribute("position",model.position)
    modelEl.setAttribute("rotation",model.rotation)
    modelEl.setAttribute("material",{
        color:model.color
    })
    marker.appendChild(modelEl)
}else{
    var modelEl=document.createElement("a-entity")
    modelEl.setAttribute("id",`${modelName}`)
    modelEl.setAttribute("gltf-model",`url(${modelUrl})`)
    modelEl.setAttribute("position",model.position)
    modelEl.setAttribute("rotation",model.rotation)
    modelEl.setAttribute("scale",model.scale)
    marker.appendChild(modelEl)
}
}})