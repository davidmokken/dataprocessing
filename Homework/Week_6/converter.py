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

    # Cleans the data
    data = data[["Perioden", "Regio's",\
        "Kerkelijke gezindte/Geen kerkelijke gezindte (% van de bevolking)",\
        "Kerkelijke gezindte/Totaal kerkelijke gezindte (% van de bevolking)",\
        "Kerkelijke gezindte/Rooms-Katholiek (% van de bevolking)",\
        "Kerkelijke gezindte/Protestantse Kerk in Nederland (% van de bevolking)",\
        "Kerkelijke gezindte/Nederlands Hervormd (% van de bevolking)",\
        "Kerkelijke gezindte/Gereformeerd (% van de bevolking)",\
        "Kerkelijke gezindte/Islam (% van de bevolking)",\
        "Kerkelijke gezindte/Overige gezindte (% van de bevolking)"]]

    # Creates new columns for renaming purposes
    data["Year"] = data["Perioden"]
    data["Region"] = data["Regio's"]
    data["Athiest"] = data["Kerkelijke gezindte/Geen kerkelijke gezindte (% van de bevolking)"]
    data["Total"] = data["Kerkelijke gezindte/Totaal kerkelijke gezindte (% van de bevolking)"]
    data["Roman Catholic"] = data["Kerkelijke gezindte/Rooms-Katholiek (% van de bevolking)"]
    data["Protestant"] = data["Kerkelijke gezindte/Protestantse Kerk in Nederland (% van de bevolking)"]
    data["Dutch Reformed"] = data["Kerkelijke gezindte/Nederlands Hervormd (% van de bevolking)"]
    data["Reformed"] = data["Kerkelijke gezindte/Gereformeerd (% van de bevolking)"]
    data["Islam"] = data["Kerkelijke gezindte/Islam (% van de bevolking)"]
    data["Other"] = data["Kerkelijke gezindte/Overige gezindte (% van de bevolking)"]

    # Deletes doubles
    data.drop(data.columns[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], axis = 1, inplace=True)

    data = data.set_index("Region")

    print(data)
    return data

if __name__ == '__main__':
    data = load_data('data.csv')
    
    # Add orient
    data.to_json("data.json", orient='index')
