function search(url) {
     return $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp',
        success: (data) => {
            searchResults(data.query.pages);
        }
    });
}
search('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=Main+Page&rvprop=content');


function searchResults(results) {

}