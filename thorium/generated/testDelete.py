import pandas as pd
csv1= data.csv
table = pd.read_csv("[object Object]")
table = table.drop(2)
table = table.drop("age", axis=1)
table = table.drop([1,2,3])
table = table.drop(["name","departement"], axis=1)
