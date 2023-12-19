import pandas as pd
table = pd.read_csv("./src/test/comparison/filter-test/data.csv")
table = table[(table['department'] == "INFO") & (table['age'] >= 20)]
table.to_csv("./src/test/comparison/filter-test/Python-filter.csv",index=False)
