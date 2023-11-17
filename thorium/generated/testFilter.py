import pandas as pd
csv= data.csv
table = pd.read_csv("[object Object]")
table[(table['id'] == 123) & (table['age'] >= 25)]
table[table['id'] == 123]
table[(table['id'] == 123) & (table['age'] >= 25) & (table['name'] == 345) & (table['power'] == 100)]
