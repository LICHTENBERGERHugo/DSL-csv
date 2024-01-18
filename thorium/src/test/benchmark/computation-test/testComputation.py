import pandas as pd
table = pd.read_csv("./src/test/benchmark/computation-test/data.csv")
table['age_SUM'] = table["age"].sum()
table['age_COUNT'] = table.shape[0]
table.to_csv("./src/test/benchmark/computation-test/Python-computation.csv",index=False)
