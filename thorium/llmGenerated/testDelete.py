```python
import pandas as pd
table = pd.read_csv("data.csv")
table = table.drop(1)
table = pd.read_csv("data.csv")
table = table.drop("age", axis=1)
table = pd.read_csv("data.csv")
rows = [1,2,3]
table = table.drop(rows)
table = pd.read_csv("data.csv")
cols = ["name","department"]
table = table.drop(cols, axis=1)
table.to_csv("data2.csv", index=False)
```