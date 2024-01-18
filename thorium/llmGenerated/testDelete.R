import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
table = table.drop(1)
table = table.drop("age", axis=1)
table = table.drop([1,2,3])
table = table.drop(["name","department"], axis=1)
table.to_csv("data2.csv",index=False)