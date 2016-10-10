$(function () {

        var options = {
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'line'
        },
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        annotations: [{
            title: {
                text: '<span style="">drag me anywhere <br> dblclick to remove</span>',
                style: {
                    color: 'red'
                }
            },
            anchorX: "left",
            anchorY: "top",
            allowDragX: true,
            allowDragY: true,
            x: 515,
            y: 155
        }, {
            title: 'drag me <br> horizontaly',
            anchorX: "left",
            anchorY: "top",
            allowDragY: false,
            allowDragX: true,
            xValue: 4,
            yValue: 10,
            shape: {
                type: 'path',
                params: {
                    d: ['M', 0, 0, 'L', 110, 0],
                    stroke: '#c55'
                }
            }
        }, {
            title: 'on point <br> drag&drop <br> disabled',
            linkedTo: 'high',
            allowDragY: false,
            allowDragX: false,
            anchorX: "center",
            anchorY: "center",
            shape: {
                type: 'circle',
                params: {
                    r: 40,
                    stroke: '#c55'
                }
            }
        }, {
            x: 100,
            y: 200,
            title: 'drag me <br> verticaly',
            anchorX: "left",
            anchorY: "top",
            allowDragY: true,
            allowDragX: false,
            shape: {
                type: 'rect',
                params: {
                    x: 0,
                    y: 0,
                    width: 55,
                    height: 40
                }
            }
        }],
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]

    };
    var chart = new Highcharts.Chart(options);
    $("#btnExport").on("click",function(e){
        console.log("button clicked");
        //chart.print();//send chart to print.
        chart.exportChart();//exports chart as PNG
    });
});
