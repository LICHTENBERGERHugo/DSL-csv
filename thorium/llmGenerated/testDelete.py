import pandas as pd

table = pd.read_csv("data.csv")
table = table.drop(1)
table.to_csv("data2.csv",index=False)

table = pd.read_csv("data.csv")
table = table.drop("age", axis=1)
table.to_csv("data2.csv",index=False)

table = pd.read_csv("data.csv")
table = table.drop([0,1,2])
table.to_csv("data2.csv",index=False)

table = pd.read_csv("data.csv")
table = table.drop(["name","department"], axis=1)
table.to_csv("data2.csv",index=False)