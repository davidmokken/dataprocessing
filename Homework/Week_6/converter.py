# Name: David Mokken
# Student Number: 10770798
# Purpose of the file: Converts the csv data into json

import csv
import pandas as pd
import json

def load_data(filename):
    """
    Load csv data into pandas
    """
    # Load the necessary columns from the csv into pandas
    data = pd.read_csv(filename, sep=';')

    # Multi indexframe??
    # Cleans the data
    data = data[["Regio's", "Perioden",\
        "Kerkelijke gezindte/Geen kerkelijke gezindte (% van de bevolking)",\
        "Kerkelijke gezindte/Totaal kerkelijke gezindte (% van de bevolking)",\
        "Kerkelijke gezindte/Rooms-Katholiek (% van de bevolking)",\
        "Kerkelijke gezindte/Protestantse Kerk in Nederland (% van de bevolking)",\
        "Kerkelijke gezindte/Nederlands Hervormd (% van de bevolking)",\
        "Kerkelijke gezindte/Gereformeerd (% van de bevolking)",\
        "Kerkelijke gezindte/Islam (% van de bevolking)",\
        "Kerkelijke gezindte/Overige gezindte (% van de bevolking)",\
        "Bezoek religieuze dienst/Een keer per week of vaker (% van de bevolking)",\
        "Bezoek religieuze dienst/Twee tot drie keer per maand (% van de bevolking)",\
        "Bezoek religieuze dienst/Een keer per maand (% van de bevolking)",\
        "Bezoek religieuze dienst/Minder dan een keer per maand (% van de bevolking)",\
        "Bezoek religieuze dienst/Zelden of nooit (% van de bevolking)"]]

    # Creates new columns for renaming purposes
    data["Region"] = data["Regio's"]
    data["Year"] = data["Perioden"]
    data["Athiest"] = data["Kerkelijke gezindte/Geen kerkelijke gezindte (% van de bevolking)"]
    data["Total"] = data["Kerkelijke gezindte/Totaal kerkelijke gezindte (% van de bevolking)"]
    data["Roman Catholic"] = data["Kerkelijke gezindte/Rooms-Katholiek (% van de bevolking)"]
    data["Protestant"] = data["Kerkelijke gezindte/Protestantse Kerk in Nederland (% van de bevolking)"]
    data["Dutch Reformed"] = data["Kerkelijke gezindte/Nederlands Hervormd (% van de bevolking)"]
    data["Reformed"] = data["Kerkelijke gezindte/Gereformeerd (% van de bevolking)"]
    data["Islam"] = data["Kerkelijke gezindte/Islam (% van de bevolking)"]
    data["Other"] = data["Kerkelijke gezindte/Overige gezindte (% van de bevolking)"]
    data["OneWeek"] = data["Bezoek religieuze dienst/Een keer per week of vaker (% van de bevolking)"]
    data["TwoMonth"] = data["Bezoek religieuze dienst/Twee tot drie keer per maand (% van de bevolking)"]
    data["OneMonth"] = data["Bezoek religieuze dienst/Een keer per maand (% van de bevolking)"]
    data["LessMonth"] = data["Bezoek religieuze dienst/Minder dan een keer per maand (% van de bevolking)"]
    data["Never"] = data["Bezoek religieuze dienst/Zelden of nooit (% van de bevolking)"]

    # Deletes doubles
    # How to write better?
    data.drop(data.columns[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]], axis = 1, inplace=True)

    print(data)
    return data

if __name__ == '__main__':
    data = load_data('religion.csv')
    # Add orient
    data.to_json("data.json")
