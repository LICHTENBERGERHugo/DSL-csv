import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
table[["name","age"]]
table.to_csv("./src/test/integration/project/generated.csv",index=False)
