const ITEMS_PER_PAGE = 5;

// Index of how far we've loaded
let idList = new Array(800);
for (let i = 1; i < 800; i++) {
    idList[i-1] = i;
}

let startIndex = 0;
let lastScrollIndex = 1;

function renderItems(itemsToRender) {
    itemsToRender.forEach(item => {
        document.getElementById("images").innerHTML += `
            <img class="target" src="${item.sprites.front_default}" alt="sprite">
        `;
    });
}

function getBatch(items, options) {
    let promises = [];
    let results = [];
    let localIndex = 0;

    // page 0 -> 1-5
    // page 1 -> 6-10 -> page + itemsPerPAge * 1
    // page 2 -> 11-15 -> page + itemsPerPage * 2
    // page 3 -> 16-20 -> page + itemsPerPage * 3
    // console.log(options);

    const startIndex = options.start;
    const endIndex = startIndex + options.itemsPerPage;

    // console.log(startIndex, endIndex);

    const itemsToFetch = items.slice(startIndex, endIndex);
    const urls = itemsToFetch.map(item => {
        return `https://fizal.me/pokeapi/api/v2/id/${item}.json`;
    });

    // console.log('Fetching:');
    // console.log(urls);

    // Empty promise!
    Promise.all(urls.map(url => {
        // console.log(url);
        return fetch(url);
    }))
    .then(r => {
        // console.log(r);
        return Promise.all(r.map(r => r.json()) );
    })
    .then(function(data) {
        // console.log(data)
        renderItems(data);
    });
}

const results = getBatch(idList, {start: startIndex, itemsPerPage: ITEMS_PER_PAGE});
startIndex += ITEMS_PER_PAGE;

let lastPageY = 0;
document.addEventListener("scroll", function(e) {

    const scrollIndex = parseInt(window.scrollY / 500);

    if(scrollIndex >= lastScrollIndex) {
        getBatch(idList, {start: startIndex, itemsPerPage: ITEMS_PER_PAGE});
        startIndex += ITEMS_PER_PAGE;
        lastScrollIndex++;
    }

});