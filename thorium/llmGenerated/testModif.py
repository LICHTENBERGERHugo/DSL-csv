import pandas as pd
table = pd.read_csv("data.csv")
table.loc[2] = ["Hugo",22,"Lyon","INFO"]
table.iloc[2, 3] = "GMA"
table.at[2, "age"] = 40
table.to_csv("data2.csv", index=False)