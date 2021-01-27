# Atlas

Atlas is a Django/React application designed to combine and simplify the data of the resource industry in Australia. The resource industry, like most industries in Australia, is managed independently by the states and territories. While there are similarities between the data, there are also many areas which make it very difficult to explore the countries resources as a whole. This application aims to solve this.

## Design

Atlas is a geospatial application utilising the leaflet.js library to map resource sites and titles to a map. A site could be a mine site or potential deposit to the identification of a specific mineral in a drill hole, while a title is a block of land which is associated with specific regulations. These regulations specify what work can be performed on the land from basic exploration work to an active mine site. To assist in displaying the data clearly, a filter is used to choose the data to display. Data can be selected by the name of the title holder, the resource type, the status of the title, etc.

## bundlers / Frameworks / Libraries
Webpack
React
Django (rest-framework)
leaflet.js
Redux