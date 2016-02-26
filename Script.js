$(document).ready(function(){
var url = "http://api.worldbank.org/countries/indicators/1.0.HCount.Poor4uds?per_page=1000&date=2013&format=jsonP&prefix=wbcallback";
$.ajax({
    url: url,
    jsonpCallback: "wbcallback",
    dataType: "jsonp"
  })
    .then(function(response){
      results = (response[1])
      console.log(results)
      return results
    })

    .then(function(results){
      var country = _.map(results, function(singleObject){
        return singleObject.country.value
        })
        console.log(country)
      var indicator = _.map(results, function(singleObject){
        return singleObject.indicator.value
        })
        console.log(indicator)
      var headCount = _.map(results, function(singleObject){
        return parseInt(singleObject.value)
        console.log(headCount)
        })
      var data = {
          title:  results[0].date + " " + results[0].indicator.value,
          categories: country,
          series: headCount,
          seriesName:  results[0].country.value,
          yAxisTitle: "Head Count",
          xAxisTitle: "Country"
        }
      $('#poverty-headcount').highcharts({
        chart: {
          type: "column"
        },
        title:{
          text: data.title,
        },
        xAxis: {
            title: {
              text: data.xAxisTitle
            },
            categories: data.categories
          },
        yAxis: {
          title: {
            text: data.yAxisTitle
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderdata: 0
        },
        series: [{
          name: "Country",
          data: data.series
        }]
      })
    })
})
