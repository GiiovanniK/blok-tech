const activeFilters = [];

// Define all filter options
document.querySelector('#jazz').addEventListener('click', (e) => {
    filter('jazz');
});

document.querySelector('#pop').addEventListener('click', (e) => {
    filter('pop');
});

document.querySelector('#edm').addEventListener('click', (e) => {
    filter('edm');
});

document.querySelector('#rock').addEventListener('click', (e) => {
    filter('rock');
});

document.querySelector('#hiphop').addEventListener('click', (e) => {
    filter('hiphop');
});


function filter(genre) {
    const index = activeFilters.indexOf(genre);
    if (index === -1) {
        activeFilters.push(genre);
    } else {
        activeFilters.splice(index, 1);
    }

    const trs = document.getElementsByTagName('tr');
    const genreTds = trs.get;

    for (let i = 0; i < trs.length; i++) {
        const tr = trs[i];
        if (i > 0) {
            tr.classList.add('hidden');
        }
        const tds = tr.getElementsByTagName('td');
        let showRow = false;

        for (let x = 0; x < tds.length; x++) {
            const td = tds[3];
            console.log(td.innerText);
            if (activeFilters.includes(td.innerText.toLowerCase())) {
                showRow = true;
                break;
            } else if (activeFilters.length === 0) {
                showRow = true;
            }
        }
        if (showRow) {
            tr.classList.remove('hidden');
        }
    }
}