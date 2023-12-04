import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
values = "pierre,21,Rennes,GMA".split(",")
new_row = pd.DataFrame([values],columns=table.columns)
table = pd.concat([table,new_row], ignore_index=True)
new_values = ["serge,21,Rennes,GMA","paul,22,Paris,GMA","herve,23,Lyon,INFO"]
for row in new_values:
	values = row.split(",")
	new_row = pd.DataFrame([values],columns=table.columns)
	table = pd.concat([table,new_row], ignore_index=True)
table.to_csv("./src/test/integration/add/generated.csv",index=False)
