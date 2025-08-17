var request = new XMLHttpRequest();
request.open('GET', 'DHAI_Referral_Guide.csv'); // previous CT/MR protocols CSV was created by opening "CT protocols list" GSheet, Select All, Copy, Paste into Excel, Save as CSV.
request.overrideMimeType("text/plain");
request.send();
request.onreadystatechange = function() {
	if (request.readyState === 4) {	// have to wait for AJAX call to complete
		CSVData = CSVtoArray(request.responseText);
		CSVData.splice(0, 2);

		// console.log("start adding " + CSVData.length + " indications")
		// console.time("addProtocols()");
			addProtocols(CSVData);
		// console.timeEnd("addProtocols()");
		
		// remove the Loading.. entry
		protocolList.remove('reasonTD', '');
		protocolList.remove('reasonTD', undefined);
		}
	};

// FUNCTIONS
// Convert the XML responseText (raw data of CSV file) into an array
const CSVtoArray = (data, delimiter = ';', omitFirstRow = false) =>
	data
		.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
		.split('\n')
		.map(v => v.split(delimiter));

// Remove empty CSV data rows and label rows with 100, 200, 300, etc
function trimCSV(input) {
	for (i=0; i<input.length; i++) {
		if (input[i][0] == "" || input[i][0].length == 3)
			input.splice(i--, 1);
	}
	return input;
}

// Add CSV Data to the table
function addProtocols(data) {
// 2025-08-16 - Gemini Refactored to improve performance by reducing the number of calls to protocolList.add().
// 1. First, transform the entire 2D array into an array of objects.
//    The Array.map() method is ideal for this kind of data transformation.
	const itemsToAdd = data.map(row => {
		return {
			bodyregionTD: row[0],
			procedureTD:  row[1],
			reasonTD:     row[2],
			CPTTD:        row[3]
		};
	});

    // 2. Now, call .add() only ONCE with the complete array of new items.
    protocolList.add(itemsToAdd);
}

// VARIABLES
// vars needed for the searchable table
var options =
		{
			valueNames: ['protNum', 'protDesc', 'protIndic', 'protMDCT'],	// this seems to be necessary, but not sure what it does
			page: [2000]
		},
	protocolList = new List('protocolDIV', options);
