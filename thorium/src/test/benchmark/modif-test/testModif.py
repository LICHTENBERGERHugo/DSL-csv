import pandas as pd
table = pd.read_csv("./src/test/benchmark/modif-test/data.csv")
table.at[1, 'age'] = 40
table.to_csv("./src/test/benchmark/modif-test/Python-modif.csv",index=False)
