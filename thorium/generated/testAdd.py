import pandas as pd
csv= "data.csv"
table = pd.read_csv(csv)
values = "hugo, 21, rennes"
new_row = pd.Series(values.split(","))
table = table.append(new_row, ignore_index=True)
new_values = ["hugo,21,rennes","paul, 22, paris","jean, 23, lyon"]
for row in new_values:
	values = row.split(',')
	new_row = pd.Series(values)
	table = table.append(new_row, ignore_index=True)
