import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
table['age_SUM'] = table["age"].sum()
table['age_COUNT'] = table.shape[0]
table.to_csv("./src/test/integration/compute/generated.csv",index=False)
