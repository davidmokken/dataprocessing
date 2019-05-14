// David Mokken
// 10770798
// Purpose of the file:

window.onload = function() {

    console.log('Yes, you can!')

  };

var teensInViolentArea = "https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB11/all?startTime=2010&endTime=2017"
var teenPregnancies = "https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB46/all?startTime=1960&endTime=2017"
var GDP = "https://stats.oecd.org/SDMX-JSON/data/SNA_TABLE1/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+EU28+EU15+OECDE+OECD+OTF+NMEC+ARG+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+ROU+RUS+SAU+ZAF+FRME+DEW.B1_GE.HCPC/all?startTime=2012&endTime=2018&dimensionAtObservation=allDimensions"

var requests = [d3.json(teensInViolentArea), d3.json(teenPregnancies), d3.json(GDP)];

//var cleaned_data = {};

Promise.all(requests).then(function(response) {
    // Rename function
    clean_data(response);
}).catch(function(e){
    throw(e);
});

function clean_data(data){

    console.log(transformResponse(data[0]))
    console.log(transformResponse(data[1]))
    console.log(transformResponse2(data[2]))

    let violence = transformResponse(data[0]);
    let preg = transformResponse(data[1]);
    let gdp = transformResponse2(data[2]);
    var cleaned_data = {};

    // Create keys from data
    for (key in violence){
        cleaned_data[key] = {}
        for (year in violence[key]){
            cleaned_data[key][violence[key][year]["Time"]] = {} 
            cleaned_data[key][violence[key][year]["Time"]]["Violence"] = violence[key][year]['Datapoint']

        };  
         
    }
    for (country in preg){
        if (country in cleaned_data){
            for (year in preg[country]){
                if ((preg[country][year]["Time"]) in cleaned_data[country]){
                    cleaned_data[country][preg[country][year]["Time"]]["Pregnancy"] = preg[country][year]['Datapoint']
                }
            }  
        }
    }
    for (country in gdp){
        if (country in cleaned_data){
            for (year in gdp[country]){
                if ((gdp[country][year]["Year"]) in cleaned_data[country]){
                    cleaned_data[country][gdp[country][year]["Year"]]["GDP"] = gdp[country][year]['Datapoint']
                }
            }  
        }
    }

    // Deletes the years 2010 and 2011 from the dict
    //since they do not have all three values
    for (country in cleaned_data){
        delete cleaned_data[country]['2010']
        delete cleaned_data[country]['2011']

    }
    console.log(cleaned_data)    
    
    return cleaned_data
}

function create_scatter(data){

    
}

