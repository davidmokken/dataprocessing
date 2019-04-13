#!/usr/bin/env python
# Name: David Mokken
# Student number: 10770798
"""
This script visualizes data obtained from a .csv file
"""

import csv
import matplotlib.pyplot as plt

# Global constants for the input file, first and last year
INPUT_CSV = "movies.csv"
START_YEAR = 2008
END_YEAR = 2018

# Global dictionary for the data
data_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}

def csv_dict(infile):
    """
    Inputs a CSV into a dict
    """
    reader = csv.DictReader(infile)
    for row in reader:
        data_dict[row['Year']].append(float(row['Rating']))



def avg_keys(infile):
    """
    Calculates the averages
    """
    averages = dict()
    
    # Averages are calculated per key
    for keys, values in data_dict.items():
        averages[keys] = sum(values) / float(len(values))

    # Return a list that is sorted by key
    keys_list = sorted(averages.items())
    year, rating = zip(*keys_list)

    return year, rating

def plot_graph(year, rating):
    """
    Plots the graph.
    """
    plt.plot(year, rating, 'k', year, rating, 'go')
    plt.title('Average movie rating per year', fontweight='bold')
    plt.xlabel('Year of Release', fontweight='bold')
    plt.ylabel('IMDB Rating', fontweight='bold')
    plt.ylim(8,9)
    plt.grid(True)
    plt.show()

if __name__ == "__main__":
    with open(INPUT_CSV, newline='') as infile:
        csv_dict(infile)
        year, rating = avg_keys(data_dict)
        plot_graph(year, rating)