let request = new Request('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=Main+Page&rvprop=content', {
    headers: new Headers({
        'Origin': 'http://localhost:3000/',
        'Content-Type': 'application/json; charset=UTF-8'
    })
});
function search(request) {
    fetch(request)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
}
search(request);