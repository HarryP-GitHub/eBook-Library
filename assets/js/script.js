//let userQuery = 'harry potter';
// let userQuery = 'Mark';
//let subsetQuery = 'fiction';
let dataBookID = 'data-bookID';
let bookLink = 'bookLink';
let subsetQuery = 'art';
let submitSearchEl = $('#submit-search');
let searchTextEl = $('#book-search');
let searchResults = $('#search-results');
let bookReader = $('#book-reader');
let categoryList = [
    'ANTIQUES & COLLECTIBLES',
    'ARCHITECTURE',
    'ART',
    'BIBLES',
    'BIOGRAPHY & AUTOBIOGRAPHY',
    'BODY, MIND & SPIRIT',
    'BUSINESS & ECONOMICS',
    'COMICS & GRAPHIC NOVELS',
    'COMPUTERS',
    'COOKING',
    'CRAFTS & HOBBIES',
    'DESIGN',
    'DRAMA',
    'EDUCATION',
    'FAMILY & RELATIONSHIPS',
    'FICTION',
    'FOREIGN LANGUAGE STUDY',
    'GAMES & ACTIVITIES',
    'GARDENING',
    'HEALTH & FITNESS',
    'HISTORY',
    'HOUSE & HOME',
    'HUMOR',
    'JUVENILE FICTION',
    'JUVENILE NONFICTION',
    'LANGUAGE ARTS & DISCIPLINES',
    'LAW',
    'LITERARY COLLECTIONS',
    'LITERARY CRITICISM',
    'MATHEMATICS',
    'MEDICAL',
    'MUSIC',
    'NATURE',
    'PERFORMING ARTS',
    'PETS',
    'PHILOSOPHY',
    'PHOTOGRAPHY',
    'POETRY',
    'POLITICAL SCIENCE',
    'PSYCHOLOGY',
    'REFERENCE',
    'RELIGION',
    'SCIENCE',
    'SELF-HELP',
    'SOCIAL SCIENCE',
    'SPORTS & RECREATION',
    'STUDY AIDS',
    'TECHNOLOGY & ENGINEERING',
    'TRANSPORTATION',
    'TRAVEL',
    'TRUE CRIME',
    'YOUNG ADULT FICTION',
    'YOUNG ADULT NONFICTION',
];
let searchOption = '';//'inauthor';
// let volumeQuery = `https://www.googleapis.com/books/v1/volumes?q=${userQuery}`;
let bookQuery = 'https://www.googleapis.com/books/v1/volumes?q=';
let queryBook = function () {
    searchResults.empty();
    let searchText = searchTextEl.val();

    subsetQuery = '';// categoryList[4];//will get from search options
    if (searchText || subsetQuery) {
        let query = bookQuery;
        if (searchText) {
            query += searchOption ? `${searchOption}:"${searchText}"` : searchText;
        }
        if (subsetQuery) {
            query += searchText ? `&subject:${subsetQuery}` : `subject:${subsetQuery}`;
        }

        //query += '&key=AIzaSyBRstUHLjo49Sig-AjKPCFR_EKfiq29W2M';
        //query = 'https://www.googleapis.com/books/v1/myLibrary/bookshelves?key=AIzaSyBRstUHLjo49Sig-AjKPCFR_EKfiq29W2M';
        //query = 'https://www.googleapis.com/books/v1/volumes/volumeId?key=AIzaSyBRstUHLjo49Sig-AjKPCFR_EKfiq29W2M';
        getVolume(query);
    }
}
function alertNotFound() {
    // alert("could not embed the book!");
}
let getBookID = function (item) {
    for (let i = 0; i < item.volumeInfo.industryIdentifiers.length; i++) {
        let ident = item.volumeInfo.industryIdentifiers[i];
        if (ident.type == 'ISBN_10' || ident.type == 'ISBN_13') {
            return `ISBN:${ident.identifier}`;
        }
    }
}
let bookID = 'ISBN:9780596805524';
let handleLoadBook = function(event){
    let anchor = $(event.currentTarget);
    bookID = anchor.attr(dataBookID);
    //initialize(bookID);
    loadBook();
    //let viewerCanvas = $('<div>');
    //bookReader.append(viewerCanvas);
    //initialize(isbn, alertNotFound);
}
let loadBook = function(){
    // let viewerCanvas = $('#viewerCanvas');
    // var viewer = new google.books.DefaultViewer(viewerCanvas);
    // let viewerCanvas = $('<div>');
    // bookReader.append(viewerCanvas);
     var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'), {
    //    var viewer = new google.books.DefaultViewer(viewerCanvas, {
            showLinkChrome: false
    });
    viewer.load(bookID, bookNotFound, bookFound);
}
let getVolume = function (url) {
    fetch(url).then(function (response) {
        if (response.status === 200) {
        }
        return response.json();
    })
        .then(function (response) {
            if (response) {

                let list = $('<ul>');
                for (var i = 0; i < response.items.length; i++) {
                    let item = response.items[i];
                    //let searchResult = $('<button>');
                    let searchResult = $('<li>');
                    let searchResultAnchor = $('<a>');
                    searchResultAnchor.attr(dataBookID, getBookID(item));
                    searchResultAnchor.attr('href', '#');
                    searchResultAnchor.addClass(bookLink);
                    searchResultAnchor.text(item.volumeInfo.title);
                    searchResult.append(searchResultAnchor);
                    // searchResult.addClass('link');
                    // searchResult.attr(bookID, getBookID(item));
                    // searchResult.text(item.volumeInfo.title);
                    list.append(searchResult);
                    // for (let j = 0; j < item.volumeInfo.industryIdentifiers.length; j++) {
                    //     let ident = item.volumeInfo.industryIdentifiers[j];
                    //     // if (ident.type == 'ISBN_10')
                    //     if (ident.type == 'ISBN_10' || ident.type == 'ISBN_13') {
                    //         let isbn = `ISBN:${ident.identifier}`;
                    //         initialize(isbn, alertNotFound);
                    //         break;
                    //     }
                    // }
                    // break;
                    //console.log(item.volumeInfo.title);
                }
                searchResults.append(list);
            }
        });

}
// queryBook();

// init google books loader
//google.books.load();
// var gbsWidget = document.getElementById('GoogleBooksPreview');

function bookFound() {
    
}
function bookNotFound() {
}
// function initialize1() {
//     // gbsWidget.className = "";
//     var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'), {
//         showLinkChrome: false
//     });
//    viewer.load(['ISBN:9780596805524', 'OCLC:502415271'], gbsNotFound, gbsFound);
// }
google.books.load();
// google.load("books", "0");
// google.books.setOnLoadCallback(loadBook);  

// function initialize(isbn) {
//     let viewerCanvas = $('#viewerCanvas');
//     var viewer = new google.books.DefaultViewer(viewerCanvas);
//     viewer.load(bookID, alertNotFound);
//     // var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
//     // viewer.load(isbn);
//   }
  
// google.books.setOnLoadCallback(loadBook);

// function initialize(isbn) {
// }

let handleSearchSubmit = function (event) {
    event.preventDefault();
    queryBook();
}

submitSearchEl.on('click', handleSearchSubmit);
searchResults.on('click', '.bookLink', handleLoadBook);
// google.books.setOnLoadCallback(initialize);

//volumeInfo
//"https://books.google.com/books/about/The_Gospel_According_to_Mark.html?hl=&id=ca2DsmMDhpEC"
//"https://www.googleapis.com/books/v1/volumes/ca2DsmMDhpEC"

//"http://books.google.com.au/books/download/The_Gospel_According_to_Mark-sample-epub.acsm?id=ca2DsmMDhpEC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
// https://www.googleapis.com/books/v1/volumes?q=subject:fiction
// getVolume(volumeQuery);