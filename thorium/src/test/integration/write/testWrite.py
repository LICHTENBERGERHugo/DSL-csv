import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
table.to_csv("./src/test/integration/write/generated.csv",index=False)
