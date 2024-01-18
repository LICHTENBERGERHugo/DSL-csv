import pandas as pd
csv = "./src/test/benchmark/write-test/data.csv"
table = pd.read_csv(csv)
table.to_csv("./src/test/benchmark/write-test/Python-write.csv",index=False)
