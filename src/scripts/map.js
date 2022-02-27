let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [57.708870, 11.974560],
   zoom: 11,
   controls: [],
   garg: false,
 });
 
 let coords = [
     [57.78092897893155, 11.989493586343999],
     [57.72747991234878, 11.95783423148954],
     [57.68380486944938, 11.936570485691767],
     [57.663843251732786, 12.031548550255145],     
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: '/images/marker.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);