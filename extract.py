
import requests
import csv
from datetime import datetime

data = requests.get("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json").json()
with open('src/assets/dati_regioni.csv', mode='w') as csv_file:
    csv_file_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_ALL)

    csv_file_writer.writerow(['date', 'name', 'value'])
    for row in data:
        date = None
        try:
            date = datetime.strptime(row['data'], "%Y-%m-%d %H:%M:%S")
        except:
            pass
        try:
            date = datetime.strptime(row['data'], "%Y-%m-%dT%H:%M:%S")
        except:
            pass
        if date == None:
            raise Exception("date format: " + row['data'])
        csv_file_writer.writerow([date.strftime("%Y-%m-%d"), row['denominazione_regione'], row['totale_casi']])


data = requests.get("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json").json()
with open('src/assets/dati_province.csv', mode='w') as csv_file:
    csv_file_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_ALL)

    csv_file_writer.writerow(['date', 'name', 'value'])
    for row in data:
        date = None
        try:
            date = datetime.strptime(row['data'], "%Y-%m-%d %H:%M:%S")
        except:
            pass
        try:
            date = datetime.strptime(row['data'], "%Y-%m-%dT%H:%M:%S")
        except:
            pass
        if date == None:
            raise Exception("date format: " + row['data'])
        date = date.strftime("%Y-%m-%d")
        # al 24/2/2020 sono tutti a zero
        if date != "2020-02-24" and row['denominazione_provincia'].encode('utf8') != "In fase di definizione/aggiornamento":
            csv_file_writer.writerow([date, row['denominazione_provincia'].encode('utf8'), row['totale_casi']])