//let userQuery = 'harry potter';
let userQuery = 'Mark';
//let subsetQuery = 'fiction';
let subsetQuery = 'art';
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
    subsetQuery = categoryList[4];//will get from search options
    if (userQuery || subsetQuery) {
        let query = bookQuery;
        if (userQuery) {
            query += searchOption ? `${searchOption}:"${userQuery}"`: userQuery;
        }
        if (subsetQuery) {
            query += userQuery ? `&subject:${subsetQuery}` : `subject:${subsetQuery}`;
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

let getVolume = function (url) {
    fetch(url).then(function (response) {
        if (response.status === 200) {
        }
        return response.json();
    })
        .then(function (response) {
            if (response) {
                for (var i = 0; i < response.items.length; i++) {
                    var item = response.items[i];
                    for (let j = 0; j < item.volumeInfo.industryIdentifiers.length; j++){
                        let ident = item.volumeInfo.industryIdentifiers[j];
                        // if (ident.type == 'ISBN_10')
                        if (ident.type == 'ISBN_10' || ident.type == 'ISBN_13')
                        {
                            let isbn = `ISBN:${ident.identifier}`;
                            initialize(isbn, alertNotFound);
                            break;
                        }    
                    }
                    break;
                    //console.log(item.volumeInfo.title);
                }
            }
        });

}
queryBook();

google.books.load();

function initialize(isbn) {
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load(isbn);
}

// google.books.setOnLoadCallback(initialize);

//volumeInfo
//"https://books.google.com/books/about/The_Gospel_According_to_Mark.html?hl=&id=ca2DsmMDhpEC"
//"https://www.googleapis.com/books/v1/volumes/ca2DsmMDhpEC"

//"http://books.google.com.au/books/download/The_Gospel_According_to_Mark-sample-epub.acsm?id=ca2DsmMDhpEC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
// https://www.googleapis.com/books/v1/volumes?q=subject:fiction
// getVolume(volumeQuery);