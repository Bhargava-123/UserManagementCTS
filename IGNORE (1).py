import csv
import pandas as pd
copy_data = []
with open(r'C:\Users\bharg\Downloads\typed_comments.csv','r',encoding="utf8") as file:
    reader = csv.reader(file)
    print()
    
    i = 1000000
    for line in reader:
        if(i != 0):
            # print(line)
            copy_data.append(line)
        else:
            break
        i = i - 1

with open(r'C:\Users\bharg\Downloads\short_data.csv','w',newline='',encoding="utf8") as file:
    writer  = csv.writer(file)
    for line in copy_data:
        writer.writerow(line)
df = pd.read_csv(r'C:\Users\bharg\Downloads\short_data.csv')
df.shape()