let googleMapsAPiKey = 'AIzaSyCJAxT2quBXtK4M4hPpnyXky6kYWPlaRO8';
let listItemHoverBackground = '#919191';
let listItemRegularBackground = '#dadada';
let bookID = '';
let bookTitle = '';
let bookTitleEl = $('#book-title');
// read book section
document.getElementById("back-button").addEventListener('click', function () {
  window.location.href = './index.html';
});

let getBookTitle = function(item){
  return item.volumeInfo.title;
}

let getBookID = function (item) {
  for (let i = 0; i < item.volumeInfo.industryIdentifiers.length; i++) {
    let ident = item.volumeInfo.industryIdentifiers[i];
    if (ident.type == 'ISBN_10' || ident.type == 'ISBN_13') {
      return `ISBN:${ident.identifier}`;
    }
  }
}

let loadBookList = function () {
  let list = $('<ul>');
  var items = JSON.parse(sessionStorage.getItem(bookList));
  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    let searchResult = $('<li>');
    let searchResultAnchor = $('<div>');
    searchResultAnchor.hover(function () {
      $(this).css('cursor', 'pointer');
      $(this).css('background-color', listItemHoverBackground);
    }, function () {
      $(this).css('cursor', 'auto');
      $(this).css('background-color', listItemRegularBackground);
    });
    searchResultAnchor.attr(dataBookID, JSON.stringify(item));
    searchResultAnchor.addClass(bookLink);
    searchResultAnchor.text(item.volumeInfo.title);
    searchResult.append(searchResultAnchor);
    list.append(searchResult);
  }
  searchResults.append(list);

}

function bookFound() {
    
}
function bookNotFound() {
  $('#viewerCanvas').text('Not found');
}

let handleLoadBook = function (event) {
  let anchor = $(event.currentTarget);
  let item = JSON.parse(anchor.attr(dataBookID));
  bookID = getBookID(item);
  bookTitle = getBookTitle(item);
  loadBook();
}

let loadBook = function () {
  bookTitleEl.text(bookTitle);
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'), {
    showLinkChrome: false
  });
  viewer.load(bookID, bookNotFound, bookFound);
}


//map section
function initMap() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const userLocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              // const map = new google.maps.Map($('#map'), {
              const map = new google.maps.Map(document.getElementById('map'), {
                  center: userLocation,
                  zoom: 13,
              });
              const placesService = new google.maps.places.PlacesService(map);
              const request = {
                  location: userLocation,
                  radius: 5000,
                  types: ['book_store'],
              };
              placesService.nearbySearch(request, (results, status) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                      for (let i = 0; i < results.length; i++) {
                          const place = results[i];
                          createMarker(place, map);
                      }
                  }
              });
          },
          (error) => {
              console.error('Error getting user location:', error);
              const defaultLocation = { lat: -37.8136, lng: 144.9631 };
              const map = new google.maps.Map(document.getElementById('map'), {
                  center: defaultLocation,
                  zoom: 13,
              });
          }
      );
  } else {
      console.error('Geolocation is not supported by this browser.');
      const defaultLocation = { lat: -37.8136, lng: 144.9631 };
      const map = new google.maps.Map(document.getElementById('map'), {
          center: defaultLocation,
          zoom: 13,
      });
  }
}
function createMarker(place, map) {
  const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
  });
  const infowindow = new google.maps.InfoWindow({
      content: place.name,
  });
  marker.addListener('click', () => {
      infowindow.open(map, marker);
  });
}

// init section
searchResults.on('click', '.bookLink', handleLoadBook);
loadBookList();

if ('google' in window && 'maps' in google) {
  initMap();
} else {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPiKey}&libraries=places&callback=initMap`;
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
}