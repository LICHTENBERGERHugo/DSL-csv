import pandas as pd
table = pd.read_csv("./src/test/comparison/modif-test/data.csv")
table.at[2, 3] = "GMA"
table.to_csv("./src/test/comparison/modif-test/Python-modif.csv",index=False)
