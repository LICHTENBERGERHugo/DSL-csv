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

### C#

| **Library**                    | **Website**                                                                                                                                  | **Notable Features**                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CsvHelper` .NET library       | [C# `CsvHelper` Documentation](https://joshclose.github.io/CsvHelper/)                                                                       | - A .NET library for reading and writing CSV files. Extremely fast, flexible, and easy to use.                                                                                                                                                                                                                                                                |
| `TextFieldParser` .NET Library | [C# `TextFieldParser` Documentation](https://learn.microsoft.com/en-us/dotnet/api/microsoft.visualbasic.fileio.textfieldparser?view=net-7.0) | - TextFieldParser is a part of the Microsoft.VisualBasic.FileIO namespace and is included in the .NET Framework. It provides a simple and straightforward way to parse and manipulate CSV files in C#. TextFieldParser is known for its ease of use and can be a good choice for basic CSV file processing needs.                                             |
| `FileHelpers` .NET Library     | [C# `FileHelpers` Documentation](https://www.filehelpers.net/)                                                                               | - FileHelpers is a versatile C# library for handling various flat file formats, including CSV. It offers features for parsing and generating CSV files with a focus on flexibility and extensibility. FileHelpers allows you to define record classes with attributes to specify the file format, making it a powerful tool for complex CSV processing tasks. |

Example program for `CsvHelper`:

```c#
using CsvHelper;
using CsvHelper.Configuration;

var csvPath = "sample.csv";

using (var reader = new StreamReader(csvPath))
using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
{
    var records = csv.GetRecords<Person>().ToList();
}
```

Example program for `TextFieldParser`:

```C#
using Microsoft.VisualBasic.FileIO;
using System;

var csvPath = "sample.csv";

using (TextFieldParser parser = new TextFieldParser(csvPath))
{
    parser.TextFieldType = FieldType.Delimited;
    parser.SetDelimiters(",");

    while (!parser.EndOfData)
    {
        string[] fields = parser.ReadFields();
    }
}
```

Example program for `FileHelpers`:

```C#
using FileHelpers;

[DelimitedRecord(",")]
public class Person
{
    public string Name;
    public int Age;
}
var engine = new FileHelperEngine<Person>();
var records = engine.ReadFile("sample.csv");

foreach (var person in records)
{
    Console.WriteLine($"Name: {person.Name}, Age: {person.Age}");
}
```

### Java

| **Library Name**       | **Documentation Link**                                                             | **Notable Features**                                                                                                                                                                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenCSV**            | [OpenCSV Documentation](http://opencsv.sourceforge.net/)                           | - Read and write CSV files<br> - Supports RFC 4180 Standard<br> - Custom separators<br> - Reading and writing with headers<br> - Escaping quotes<br> - Custom object mapping<br> - Rich configuration options<br> - Streaming API<br> - Customizable error handling<br> - Active development |
| **Apache Commons CSV** | [Apache Commons CSV Documentation](https://commons.apache.org/proper/commons-csv/) | - Read and write CSV files<br> - Supports RFC 4180 Standard<br> - Custom separators<br> - Reading and writing with headers<br> - Escaping quotes<br> - Limited configuration options<br> - Streaming API<br> - Limited error handling<br> - Less active development                          |

#### **OpenCSV**

**Reading CSV file**

```Java
import com.opencsv.CSVReader;
import java.io.FileReader;
import java.io.IOException;

public class OpenCSVExample {
    public static void main(String[] args) {
        try (CSVReader reader = new CSVReader(new FileReader("data.csv"))) {
            String[] nextLine;
            while ((nextLine = reader.readNext()) != null) {
                for (String value : nextLine) {
                    System.out.print(value + " ");
                }
                System.out.println();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Writing CSV file**

```Java
import com.opencsv.CSVWriter;
import java.io.FileWriter;
import java.io.IOException;

public class OpenCSVWriteExample {
    public static void main(String[] args) {
        try (CSVWriter writer = new CSVWriter(new FileWriter("output.csv"))) {
            String[] record = {"John", "Doe", "30"};
            writer.writeNext(record);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### **Apache Commons CSV**

**Reading CSV file**

```Java
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import java.io.FileReader;
import java.io.IOException;

public class ApacheCommonsCSVExample {
    public static void main(String[] args) {
        try (CSVParser parser = new CSVParser(new FileReader("data.csv"), CSVFormat.DEFAULT)) {
            for (CSVRecord record : parser) {
                for (String value : record) {
                    System.out.print(value + " ");
                }
                System.out.println();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Writing CSV file**

```Java
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import java.io.FileWriter;
import java.io.IOException;

public class ApacheCommonsCSVWriteExample {
    public static void main(String[] args) {
        try (CSVPrinter printer = new CSVPrinter(new FileWriter("output.csv"), CSVFormat.DEFAULT)) {
            printer.printRecord("John", "Doe", "30");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Feature comparison between csv library of each language

| Feature               | Pandas (Python)  | Apache Commons CSV (Java) | Standard CSV Library (Ruby) | csv-parser (JavaScript) | CsvHelper (C#) |
| --------------------- | ---------------- | ------------------------- | --------------------------- | ----------------------- | -------------- |
| Language              | Python           | Java                      | Ruby                        | JavaScript              | C#             |
| Open Source           | Yes              | Yes                       | Yes                         | Yes                     | Yes            |
| CSV Reading           | Yes              | Yes                       | Yes                         | Yes                     | Yes            |
| CSV Writing           | Yes              | Yes                       | Yes                         | Yes                     | Yes            |
| Data Manipulation     | Yes              | Limited                   | Limited                     | Limited                 | Yes            |
| Performance           | Excellent        | Good                      | Good                        | Good                    | Good           |
| Data Types Support    | Wide range       | String                    | String                      | String                  | Strongly typed |
| Handling Large Files  | Yes              | Yes                       | Limited                     | Limited                 | Yes            |
| Error Handling        | Yes              | Yes                       | Yes                         | Yes                     | Yes            |
| Streaming             | Yes              | Yes                       | Yes                         | Yes                     | Yes            |
| Easy to Learn         | Yes              | Moderate                  | Easy                        | Easy                    | Moderate       |
| External Dependencies | NumPy (optional) | None                      | Standard library            | None                    | None           |

## Features

### Opening a CSV File

Input data : CSV path

Use case : Transform the csv file into a table to modify it

### Exporting to CSV

Input data : Table with rows, columns, and a header

Use case : Generate a CSV file from the modified table

### Exporting to JSON

Input data : Table with rows, columns, and a header

Use case : Generate a JSON file from the modified table

### Filtering

Input data : Table, condition

Use case :  Select a subset of the data based on a given condition

### Adding a row

Input data : Table, new row

Use case: Add a new row to the table

### Modifying a value

Input : Table, row ID, column ID (column name), new value

Use case : Modify the value of a cell in the table

### Modifying a row

Input : Table, row Id, new Value

Use case : Modify every attributes of a record in the table

### Deleting a row

Input data : Table, row Id

Use case :  Delete a row from the table at the specified index

### Projecting a table

Input data : Table, column names to keep

Use case : Get a new table with only the specified columns

### Aggregating values in a column

Example of tasks : Count the number of values in a column, calculate a sum, etc.

Use cases:

## ChatGPT/Copilot Experience

Testing Copilot to add a row to a CSV file using the Python Pandas library :

<span style="color:green">**✓ Success !**</span>

Input: add a line to a CSV file using pandas

Output:

```python
import pandas as pd

# Load the CSV file into a pandas DataFrame
df = pd.read_csv('filename.csv')

# Create a dictionary with the new row data
new_row = {'Name': 'John', 'Age': 30, 'City': 'New York'}

# Append the new row to the DataFrame
df = df.append(new_row, ignore_index=True)

# Write the updated DataFrame back to the CSV file
df.to_csv('filename.csv', index=False)
```

## Class diagram (metamodel)

![Class diagram (metamodel)](diagram.svg)

## Benchmark
| Function | Language | Time Execution | Memory Consumption |
|----------|----------|----------------|--------------------|
| Write    | Python   | 606.03 ms   | 32.11 MB|
|          | R        | 295.36 ms   | 32.20 MB| 
| Add      | Python   | 593.49 ms   | 32.06 MB|
|          | R        | 281.29 ms   | 32.16 MB|
| Computation| Python   | 610.44 ms   | 34.35 MB|
|          | R   | 249.89 ms   | 34.44 MB|
| Project-1| Python   | 660.29 ms   | 31.65 MB|
|          | R   | 218.09 ms   | 31.74 MB|
| Project-2| Python   | 691.37 ms   | 32.31 MB|
|          | R   | 228.99 ms   | 32.40 MB|
| Filter-1 | Python   | 689.85 ms   | 34.71 MB|
|          | R   | 235.54 ms   | 34.80 MB|
| Filter-2 | Python   | 647.37 ms   | 35.45 MB|
|          | R   | 238.38 ms   | 35.54 MB|
| Modif-1 | Python   | 729.68 ms   | 29.62 MB|
|          | R   | 196.50 ms   | 29.72 MB|
| Modif-2 | Python   | 729.68 ms   | 29.62 MB|
|          | R   | 196.50 ms   | 29.72 MB|
| Modif-3 | Python   | 596.77 ms   | 30.29 MB|
|          | R   | 246.63 ms   | 30.38 MB|
| Delete-1 | Python   | 539.43 ms   | 34.41 MB|
|          | R   | 228.49 ms   | 34.51 MB|
| Delete-2 | Python   | 721.51 ms   | 35.07 MB|
|          | R   | 251.72 ms   | 35.17 MB|
| Delete-3 | Python   | 651.08 ms   | 27.64 MB|
|          | R   | 207.74 ms   | 27.74 MB|
| Delete-4 | Python   | 603.70 ms   | 28.56 MB|
|          | R   | 255.79 ms   | 28.65 MB|