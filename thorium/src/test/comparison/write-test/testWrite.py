import pandas as pd
csv = "./src/test/comparison/write-test/data.csv"
table = pd.read_csv(csv)
table.to_csv("./src/test/comparison/write-test/Python-write.csv",index=False)
