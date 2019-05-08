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
    data = pd.read_csv(filename, usecols = [0, 5, 6])

    # Cleans the data
    data = data[['LOCATION', 'TIME', 'Value']]
    data['TIME'] = pd.to_numeric(data['TIME'], errors = 'coerce')
    data['Value'] = pd.to_numeric(data['Value'], errors = 'coerce')

    return data

if __name__ == '__main__':
    data = load_data('data.csv')
    data.to_json("data.json", orient = "records")
