import pandas as pd
table = pd.read_csv("data.csv")
table.loc[1] = ["Hugo",22,"Lyon","INFO"]
table.iloc[1, 3] = "GMA"
table.at[1, 'age'] = 40
table.to_csv("./src/test/integration/modif/generated.csv",index=False)
