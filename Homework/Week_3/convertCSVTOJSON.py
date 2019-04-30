#!/usr/bin/env python
# Name: David Mokken
# Student number: 10770798

import csv
import pandas as pd
import json
import matplotlib.pylot as plt

def load_data(filename):
    """
    Load csv data into panda
    """

    # Loads the necessary columns from the csv into panda
    data = (pd.read_csv(filename, na_values = ['no info', 'unknown']))

    # Cleans the data
    data = data[['year', 'film', 'actor', 'characters', 'imdb', \
        'gender', 'race', 'race_simple', 'words', 'sentences']]
    data['year'] = pd.to_numeric(data['year'], errors = 'coerce')
    data['words'] = pd.to_numeric(data['words'], errors = 'coerce')
    data['sentences'] = pd.to_numeric(data['sentences'], errors = 'coerce')

    return data
    
if __name__ == '__main__':
    data = load_data('oscarscriptdiversityanalysis.csv')
    data.to_json("oscars.json", orient="index")