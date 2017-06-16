const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=';

class WikiSearch {
    searchInput() {
        $('#search').keypress((e) => {
            if ( e.which == 13 ) {
                this.search(apiUrl + $('#search').val());
            }
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
        if(results.query.searchinfo.totalhits === 0) {
            $(`    <hr>
                    <li id="noResults">
                        <h3>We couldn't find anything :(</h3>
                        <p>Try another search.</p>
                    </li>
                `).prependTo('#searchResults');
        } else {
            $('#noResults').remove();
        }

        results.query.search.map((result) => {
            console.log(result.title);
            let link = result.title.split(" ").join('_');
            console.log(link);
            // removes html from the snippet result
            $(`
                <li>
                    <h3><a href="http://en.wikipedia.org/wiki/${link}">${result.title}</a></h3>
                    <p>${result.snippet}</p>
                </li>
                <hr>
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

    createLink(string) {
        return Array.from(string).join('');
    }
}

let wikiSearch = new WikiSearch();
$(document).ready(() => {
    wikiSearch.searchInput();
});