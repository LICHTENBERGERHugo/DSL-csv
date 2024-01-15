import pandas as pd
table = pd.read_csv("./src/test/benchmark/project-test/data.csv")
table = table[["name","age"]]
table.to_csv("./src/test/benchmark/project-test/Python-project.csv",index=False)
