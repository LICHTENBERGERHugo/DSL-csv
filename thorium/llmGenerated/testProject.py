import pandas as pd

csv1 = "data.csv"
table = pd.read_csv(csv1)

table = table["name"]
table = table[["name","age"]]

table.to_csv("data2.csv", index=False)