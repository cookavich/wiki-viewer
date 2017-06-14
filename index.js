const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srprop=size|wordcount|timestamp|sectionsnippet&srsearch=';
// $(document).ready(() => {
//     $('#search').keypress((e) => {
//         if ( event.which == 13 )
//             wikiSearch.search(apiUrl + $('#search').val());
//     });
// });

class WikiSearch {
    searchInput() {
        $('#search').keypress((e) => {
            if ( event.which == 13 )
                this.search(apiUrl + $('#search').val());
        });
    }

    search(url) {
        return $.ajax({
            url: url,
            method: 'GET',
            dataType: 'jsonp',
            success: (data) => {
                this.searchResults(data);
            }
        });
    }

    searchResults(results) {
        console.log(results);
        $('#searchResults').append(results);
    }
}
let wikiSearch = new WikiSearch();
$(document).ready(() => {
    wikiSearch.searchInput();
});