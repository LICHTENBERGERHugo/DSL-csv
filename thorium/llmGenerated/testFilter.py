import pandas as pd

csv = "data.csv"
table = pd.read_csv(csv)

table = table[(table['department'] == "INFO") & (table['age'] >= 20)]

table = table[table['department'] == "GPM"]

table = table[(table['city'] == "Lyon") & (table['age'] >= 22)]

table.to_csv("data2.csv",index=False)