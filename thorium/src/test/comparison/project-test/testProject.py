import pandas as pd
table = pd.read_csv("./src/test/comparison/project-test/data.csv")
table = table[["name","age"]]
table.to_csv("./src/test/comparison/project-test/Python-project.csv",index=False)
