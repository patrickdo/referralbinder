// --- 1. List.js Setup ---
const options = {
    valueNames: [
        'bodyregionTD',
        'procedureTD',
        'reasonTD',
        'CPTTD'
    ],
    page: 2000
};

const protocolList = new List('protocolDIV', options);

// Toggle "No results found" banner
protocolList.on('updated', (list) => {
    const noResultElem = document.querySelector('.no-result');
    if (!noResultElem) return;

    const hasNoMatches = list.searched && list.matchingItems.length === 0;
    noResultElem.style.display = hasNoMatches ? 'table-row-group' : 'none';
});

// Search match highlighter
protocolList.on('searchComplete', (list) => {
    const searchInput = document.querySelector('#protocolDIV .search');
    const query = searchInput ? searchInput.value.trim() : '';

    // Reset previous highlights to clean text
    document.querySelectorAll('#protocolDIV table tbody td').forEach((cell) => {
        if (cell.dataset.originalText) {
            cell.textContent = cell.dataset.originalText;
            delete cell.dataset.originalText;
        }
    });

    if (!query) return;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    list.matchingItems.forEach((item) => {
        const targetCells = item.elm.querySelectorAll('.bodyregionTD, .procedureTD, .reasonTD');
        
        targetCells.forEach((cell) => {
            const rawText = cell.textContent;
            if (regex.test(rawText)) {
                cell.dataset.originalText = rawText;
                cell.innerHTML = rawText.replace(regex, '<mark class="highlight">$1</mark>');
            }
        });
    });
});

// --- 2. Helper Functions ---
const CSVtoArray = (data, delimiter = ';', omitFirstRow = false) =>
    data
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split('\n')
        .map((v) => v.split(delimiter));

function addProtocolsToList(data) {
    const itemsToAdd = data.map((row) => ({
        bodyregionTD: row[0],
        procedureTD:  row[1],
        reasonTD:     row[2],
        CPTTD:        row[3]
    }));

    protocolList.add(itemsToAdd);
}

// --- 3. Main Data Fetch ---
async function loadProtocols() {
    try {
        const response = await fetch('DHAI_Referral_Guide.csv');
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV. Status: ${response.status}`);
        }

        const rawCSVText = await response.text();
        const csvData = CSVtoArray(rawCSVText);

        // Remove the first two rows (headers)
        csvData.splice(0, 2);

        addProtocolsToList(csvData);

        // Remove the placeholder "Loading..." entry
        protocolList.remove('bodyregionTD', '');
    } catch (error) {
        console.error('Error loading protocol list:', error);
    }
}

// --- 4. Initialize ---
loadProtocols();