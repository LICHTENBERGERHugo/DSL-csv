# Domain analysis

## Présentation et explications textuelles

## Comparatif des langages

### Python

#### Comparative Table of Options

| **Library**           | **Website**                                                              | **Notable Features**                                                                                                                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `csv` Module (Python) | [Python `csv` Documentation](https://docs.python.org/3/library/csv.html) | - Simple reading/writing of CSV files. - Limited data processing capabilities.                                                                                                                                                                   |
| `pandas` Library      | [pandas Documentation](https://pandas.pydata.org/)                       | - Advanced CSV reading/writing with customization. - Powerful DataFrames for data processing, indexing, and filtering. - Built-in aggregation and handling of missing data. - Support for various file formats. - Efficiency for large datasets. |

#### Example of File Reading in this Language

Sample File Opening

With the `csv` module in Python:

```python
import csv
# Open the CSV file in read mode
with open('example.csv', mode='r') as csv_file:
    csv_reader = csv.reader(csv_file)

    # Read and display each line from the file
    for row in csv_reader:
        print(', '.join(row))
```

With the "pandas" library:

```python
import pandas as pd

# Read the CSV file into a DataFrame
data = pd.read_csv('example.csv')

# Display the first five rows of the DataFrame
print(data.head())
```

### Javascript

| Library            | Programming Language | Website                                                            | Notable Features                                                                     |
| ------------------ | -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `csv-parser`       | JavaScript (Node.js) | [csv-parser](https://www.npmjs.com/package/csv-parser)             | - Efficient reading of CSV files line by line<br>- Automatic handling of CSV headers |
| `csv-write-stream` | JavaScript (Node.js) | [csv-write-stream](https://www.npmjs.com/package/csv-write-stream) | - Writing data to a CSV file<br>- Customization of delimiters and headers            |
| `PapaParse`        | JavaScript (Browser) | [PapaParse](https://www.papaparse.com/)                            | - Parsing CSV files in a browser<br>- Error handling and formatting options          |
| `fast-csv`         | JavaScript (Node.js) | [fast-csv](https://www.npmjs.com/package/fast-csv)                 | - High performance for CSV reading/writing<br>- Support for streams and promises     |
| `csvtojson`        | JavaScript (Node.js) | [csvtojson](https://www.npmjs.com/package/csvtojson)               | - Conversion of CSV to JSON<br>- Support for various CSV dialects                    |

Example program for `csv-parser`:

```javascript
const fs = require("fs");
const csv = require("csv-parser");
fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (row) => {
    console.log(row);
  })
  .on("end", () => {
    console.log("CSV reading completed.");
  });
```

Example program for `csv-write-stream`:

```javascript
const fs = require("fs");
const csvWriter = require("csv-write-stream");
const writer = csvWriter();
writer.pipe(fs.createWriteStream("output.csv"));
writer.write({ Name: "John", Firstname: "Doe", Age: 30 });
writer.write({ Name: "Jane", Firstname: "Smith", Age: 25 });
writer.end();
```

Example program for `PapaParse`:

```html
<!-- Include the PapaParse library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>

<input type="file" id="csvFile" accept=".csv" />

<script>
  document.getElementById("csvFile").addEventListener("change", (event) => {
    const file = event.target.files[0];

    // Read the CSV file
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        // CSV data processing
        console.log(results.data);
      },
    });
  });
</script>
```

Example program for `fast-csv`:

```javascript
const fs = require("fs");
const fastcsv = require("fast-csv");
const ws = fs.createWriteStream("output.csv");
const data = [
  { Name: "John", Age: 30 },
  { Name: "Jane", Age: 25 },
];
fastcsv.write(data, { headers: true }).pipe(ws);
```

## Retour d'expérience ChatGPT/Copilot

## Diagramme de classe (métamodèle)
