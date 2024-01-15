import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
print(table.to_string())

values = "pierre, 21, rennes,GMA".split(",")
new_row = pd.DataFrame([values],columns=table.columns)
table = pd.concat([table,new_row], ignore_index=True)

new_values = ["serge,21,rennes,GMA","paul, 22, paris,GMA","herve, 23, lyon,INFO"]
for row in new_values:
    values = row.split(",")
    new_row = pd.DataFrame([values],columns=table.columns)
    table = pd.concat([table,new_row], ignore_index=True)

print(table.to_string())

table2 = table[table["department"] == "GMA"]
table2 = table2[["name","age"]]
print(table2.to_string())

table.at[2,4] = "GPM"
table = table.drop(7)
print(table.to_string())

table.to_csv("data2.csv",index=False)