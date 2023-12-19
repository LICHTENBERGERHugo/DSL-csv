import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
table = table[(table['department'] == "INFO") & (table['age'] >= 20)]
table.to_csv("./src/test/integration/filter/generated.csv",index=False)
