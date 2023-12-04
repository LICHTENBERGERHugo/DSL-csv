import pandas as pd
csv1 = "data.csv"
table1 = pd.read_csv(csv1)
table2 = pd.read_csv("data.csv")
csv2 = csv1
table2.to_csv("./src/test/integration/declaration/generated.csv",index=False)
