import pandas as pd

csv = "data.csv"
table = pd.read_csv(csv)
table.to_csv("./generated.csv", index=False)