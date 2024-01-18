The translated code in Python would be:

```python
import pandas as pd

csv = "data.csv"
table = pd.read_csv(csv)

values = "pierre, 21, rennes,GMA".split(",")
new_row = pd.DataFrame([values], columns=table.columns)
table = pd.concat([table, new_row], ignore_index=True)

new_values = ["serge,21,rennes,GMA", "paul, 22, paris,GMA", "herve, 23, lyon,INFO"]
for row in new_values:
    values = row.split(",")
    new_row = pd.DataFrame([values], columns=table.columns)
    table = pd.concat([table, new_row], ignore_index=True)

table.to_csv("data2.csv", index=False)
```

This code reads the CSV file "data.csv" into a DataFrame `table`. It then adds a row with values "pierre, 21, rennes, GMA" to the table. It also adds multiple rows with values "serge,21,rennes,GMA", "paul, 22, paris,GMA", "herve, 23, lyon,INFO" to the table. Finally, it writes the updated table to a new CSV file "data2.csv".