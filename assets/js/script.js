// variables section
const bookList = 'bookList';
let readerUrl = './reader.html';
let dataBookID = 'data-bookID';
let bookLink = 'bookLink';
let subsetQuery = 'art';
let submitSearchEl = $('#submit-search');
let searchTextEl = $('#book-search');
let searchResults = $('#search-results');
let bookReader = $('#book-reader');
let selectCategoryEl = $('#category');
let selectOptionEl = $('#option');
let searchOption = '';
let bookQuery = 'https://www.googleapis.com/books/v1/volumes?q=';

let optionList = [
    'intitle',
    'inauthor',
    'inpublisher',
    'lccn',
    'oclc',
];

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


//methods section
let queryBook = function () {
    searchResults.empty();
    let searchText = searchTextEl.val();
    subsetQuery = selectCategoryEl.find(":selected").text();
    if (subsetQuery.startsWith('Choose a Category')) {
        subsetQuery = '';
    }

    searchOption = selectOptionEl.find(":selected").text();
    if (searchOption.startsWith('Choose an Option')) {
        searchOption = '';
    }

    if (searchText || subsetQuery) {
        let query = bookQuery;
        if (searchText) {
            query += searchOption ? `${searchOption}:"${searchText}"` : searchText;
        }
        if (subsetQuery) {
            query += searchText ? `+subject:${subsetQuery}` : `subject:${subsetQuery}`;
        }

        getVolume(query);
    }
}

let getVolume = function (url) {

    fetch(url).then(function (response) {
        if (response.status === 200) {
        }
        return response.json();
    })
        .then(function (response) {
            if (response) {
                sessionStorage.setItem(bookList, JSON.stringify(response.items));
                window.location.href = readerUrl;
            }
        });

}
google.books.load();

let handleSearchSubmit = function (event) {
    event.preventDefault();
    queryBook();
}

let loadOptions = function () {
    $.each(categoryList, function (index, value) {
        let selectItem = $('<option>');
        selectItem.val(value);
        selectItem.text(value);
        selectCategoryEl.append(selectItem);
    });

    $.each(optionList, function (index, value) {
        let selectItem = $('<option>');
        selectItem.val(value);
        selectItem.text(value);
        selectOptionEl.append(selectItem);
    });
}

// init section
submitSearchEl.on('click', handleSearchSubmit);
loadOptions();