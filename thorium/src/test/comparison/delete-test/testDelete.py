import pandas as pd
table = pd.read_csv("./src/test/comparison/delete-test/data.csv")
table = table.drop(["name","department"], axis=1)
table.to_csv("./src/test/comparison/delete-test/Python-delete.csv",index=False)
