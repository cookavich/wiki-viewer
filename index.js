const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=';

class WikiSearch {
    searchInput() {
        $('#search').keypress((e) => {
            if ( e.which == 13 )
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
        results.query.search.map((result) => {
            // removes html from the snippet result
            $(`
                <li>
                    <h3>${result.title}</h3>
                    <p>${this.santitizeString(result.snippet)}</p>
                </li>
            `).prependTo('#searchResults');
        });
    }

    /**
     * Strips out Wikipedia's HTML and returns a clean string.
     *
     * @param string
     * @returns string
     */
    santitizeString(string) {
        let rex = /(<([^>]+)>)/ig;
        return string.replace(rex, "");
    }
}

let wikiSearch = new WikiSearch();
$(document).ready(() => {
    wikiSearch.searchInput();
});