```python
import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
print(table.to_string())
```