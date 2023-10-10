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

### Ruby

| **Library**                    | **Website**                                                                                            | **Notable Features**                                                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `csv` Built-in library         | [Ruby `csv` Documentation](https://ruby-doc.org/stdlib-3.0.0/libdoc/csv/rdoc/CSV.html)                 | - Standard CSV library in Ruby. Provides a comprehensive set of features for reading and writing CSV files.                                                                         |
| `smarter_csv` Ruby Gem Library | [Ruby Gem `smarter_csv` Documentation](https://rubygems.org/gems/smarter_csv/versions/1.1.4?locale=en) | - A wrapper around the CSV library that provides additional features, such as support for header rows and automatic type conversion.                                                |
| `fastcsv` Ruby Gem Library     | [Ruby Gem `fastcsv` Documentation](https://rubygems.org/gems/fastcsv)                                  | - A fork of FasterCSV that is actively maintained and has a number of improvements, such as support for single-byte delimiters, skipping rows, and reading CSV files from a string. |
| `fastercsv` Ruby Gem Library   | [Ruby Gem `fastercsv` Documentation](https://rubygems.org/gems/fastercsv/versions/1.5.5?locale=en)     | - A fast and memory-efficient CSV parser. It is based on the Ragel library, which is a fast parser generator.                                                                       |

Example program for `csv`:

```ruby
require 'csv'

# Read a CSV file
csv = CSV.open('data.csv', 'r')
csv.each do |row|
  # Do something with the row
end

# Write a CSV file
csv = CSV.open('data.csv', 'w')
csv << ['name', 'age']
csv << ['John Doe', 30]
csv << ['Jane Doe', 25]
```

Example program for `smarter_csv`:

```Ruby
require 'smarter_csv'

# Read a CSV file with a header row
csv = SmarterCSV.open('data.csv', 'r', headers: true)
csv.each do |row|
  # Do something with the row
end

# Write a CSV file with automatic type conversion
csv = SmarterCSV.open('data.csv', 'w')
csv << ['name', 'age']
csv << ['John Doe', 30]
csv << ['Jane Doe', 25]
```

Example program for `fastcsv`:

```Ruby
require 'fastcsv'

# Read a CSV file with a single-byte delimiter
csv = FastCSV.open('data.csv', 'r', col_sep: ',', row_sep: '\n')
csv.each do |row|
  # Do something with the row
end

# Skip the first row of a CSV file
csv = FastCSV.open('data.csv', 'r', skip_lines: 1)
csv.each do |row|
  # Do something with the row
end

# Read a CSV file from a string
csv_string = <<-CSV
name,age
John Doe,30
Jane Doe,25
CSV

csv = FastCSV.parse(csv_string)
csv.each do |row|
  # Do something with the row
end
```

Example program for `fastercsv`:

```Ruby
require 'fastercsv'

# Read a CSV file with FasterCSV
csv = FasterCSV.open('data.csv', 'r')
csv.each do |row|
# Do something with the row
end
```


## Retour d'expérience ChatGPT/Copilot

## Diagramme de classe (métamodèle)
