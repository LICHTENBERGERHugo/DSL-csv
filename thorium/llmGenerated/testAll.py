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
table['age_SUM'] = table["age"].sum()
table['age_COUNT'] = table.shape[0]
table.loc[1] = ["Hugo",22,"Lyon","INFO"]
table.iloc[1, 3] = "GMA"
table.at[1, 'age'] = 40
print(table.to_string())
table = table[(table['department'] == "INFO") & (table['age'] >= 20)]
print(table.to_string())
table = table.drop(1)
table = table.drop("department", axis=1)
table = table.drop([1,2])
print(table.to_string())
table = table["name"]
table = table[["name","age"]]
table.to_csv("data2.csv",index=False)