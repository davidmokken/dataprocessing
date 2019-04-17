#!/usr/bin/env python
# Name: David Mokken
# Student number: 10770798


import csv
import pandas as pd
import json
import numpy
import matplotlib.pyplot as plt


def load_data(filename):
    """
    Load csv data into panda
    """


    # Loads the necessary columns from the csv into panda
    data = (pd.read_csv(filename, na_values = ['no info', '.', 'unknown']))

    # Cleans the data
    data = data[['Country', 'Region', 'Pop. Density (per sq. mi.)', \
        'Infant mortality (per 1000 births)', 'GDP ($ per capita) dollars']]
    data['Region'] = data['Region'].str.strip()
    data['GDP ($ per capita) dollars'] = data['GDP ($ per capita) dollars'].str.replace(' dollars', '')
    data['Pop. Density (per sq. mi.)'] = data['Pop. Density (per sq. mi.)'].str.replace(',', '.')
    data['Infant mortality (per 1000 births)'] = data['Infant mortality (per 1000 births)'].str.replace(',', '.')

    data['Pop. Density (per sq. mi.)'] = pd.to_numeric(data['Pop. Density (per sq. mi.)'], errors = 'coerce')
    data['Infant mortality (per 1000 births)'] = pd.to_numeric(data['Infant mortality (per 1000 births)'], errors = 'coerce')
    data['GDP ($ per capita) dollars'] = pd.to_numeric(data['GDP ($ per capita) dollars'], errors = 'coerce')

    # Drops the country of Suriname since its values are not correct
    data = data.drop(data.index[193])
    print(data)

    return data

def des_stat(column):
    """
    Calculates descriptive statistics for columns
    """

    # Calculates the mean
    mean = column.mean()

    # Calculates the median
    median = column.median()

    # Calculates the mode
    mode = column.mode()[0]

    # Calculates the standard deviation of a column
    stan_dev = column.std()

    print("The mean is:", mean)
    print("The median is:", median)
    print("The mode is:", mode)
    print("The standard deviation is:", stan_dev)

    column.describe()
    #quanitles


def plot_hist(column):
    """
    Plots a histogram of the inserted data
    """
    column.plot.hist()
    plt.title('GDP Data')
    plt.grid(True)
    plt.show()

if __name__ == '__main__':
    data = load_data('input.csv')
    des_stat(data['GDP ($ per capita) dollars'])
    plot_hist(data['GDP ($ per capita) dollars'])


