const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=';

/**
 * Class WikiSearch
 */
class WikiSearch {
    /**
     * Listens for the search, and calls search(url) if the user
     * presses enter on the input.
     * @returns void
     */
    searchInput() {
        $('#search').keypress((e) => {
            if ( e.which == 13 )
                this.search(apiUrl + $('#search').val());
        });
    }

    /**
     * Runs the AJAX for the search.
     * @param url string
     * @returns {*}
     */
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

    /**
     * Handles the logic for outputting the search results onto the page.
     * @param results Object
     */
    searchResults(results) {
        // Empties out the results if there are some already there.
        $('#searchResults').empty();
        // Outputs a message to the user if there are no results.
        if(results.query.searchinfo.totalhits === 0) {
            $(`    
                <hr>
                <li id="noResults">
                    <h3>We couldn't find anything :(</h3>
                    <p>Try another search.</p>
                </li>
            `).prependTo('#searchResults');
        } else {
            $('#noResults').remove();
        }

        console.log(results.query.search);
        // Outputs our search results.
        results.query.search.map((result) => {
            $(`
                <li class="result">
                    <h3><a href="http://en.wikipedia.org/wiki/${this.createLink(result.title)}">${result.title}</a></h3>
                    <p>${result.snippet}</p>
                </li>
                <hr>
            `).prependTo('#searchResults');
        });
    }

    /**
     * Takes the title of the Wiki article and converts it to a usable link.
     * @param title string
     * @returns {string}
     */
    createLink(title) {
        return title.split(" ").join('_');
    }
}

let wikiSearch = new WikiSearch();
$(document).ready(() => {
    wikiSearch.searchInput();
});