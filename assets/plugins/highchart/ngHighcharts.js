angular.module('ngHighcharts', []);
angular.module('ngHighcharts').directive('highchart', function ($log, highchart) {
    var _id = 0;
    var _getId = function () {
        return 'hcid1234' + _id;
        _id++;
    }
    return {
        restrict: 'ACE',
        scope: {
            data: '=',
            options: '='
        },
        replace: true,
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var id = _getId();
            element.find('div').attr('id', id);
            var type = 'line';
            var title = '';
            var subtitle = '';
            var height = 400;
            var legend = true;
            var marker = true;
            var xAxisTitle = '';
            var yAxisTitle = '';
            if (attrs.type) {
                type = attrs.type.toLowerCase();
            }
            // Validate type
            var re = /line|area|scatter|bar|column/;
            if (!re.test(type)) {
                $log.error('highchartsDirective Error: ' + type + ' charts are not supported, a line chart will be displayed. Only line, area, scatter, bar, and column charts are supported for now.');
                type = 'line';
            }
            if (attrs.chartTitle) {
                title = attrs.chartTitle;
            }
            if (attrs.chartSubtitle) {
                subtitle = attrs.chartSubtitle;
            }
            if (attrs.xaxisTitle) {
                xAxisTitle = attrs.xaxisTitle;
            }
            if (attrs.yaxisTitle) {
                yAxisTitle = attrs.yaxisTitle;
            }
            if (attrs.height) {
                height = eval(attrs.height);
            }
            if (attrs.legend) {
                legend = eval(attrs.legend);
            }
            if (attrs.marker) {
                marker = eval(attrs.marker);
            }

            var chartOptions = highchart.defaultOptions();

            if (scope.options) {
                chartOptions = scope.options;
            }

            /*
             if(scope.colors) {
             chartOptions.colors = scope.colors;
             }
             */

            if (chartOptions) {
                chartOptions.chart.type = type;
                chartOptions.title.text = title;
                chartOptions.subtitle.text = subtitle;
                chartOptions.chart.height = height;
                chartOptions.legend.enabled = legend;
                chartOptions.plotOptions.series.marker.enabled = marker;
                chartOptions.xAxis.title.text = xAxisTitle;
                chartOptions.yAxis.title.text = yAxisTitle;
            }

            scope.$watch('data.series', function (val) {
                if (chartOptions && chartOptions.series) {
                    chartOptions.series = val;
                    element.highcharts(chartOptions);
                }
            });
            scope.$watch('data.labels', function (val) {
                if (chartOptions && chartOptions.xAxis.categories) {
                    chartOptions.xAxis.categories = val;
                    element.highcharts(chartOptions);
                }
            });

        }
    }
});

angular.module('ngHighcharts').factory('highchart', function () {
    return {
        defaultOptions: function () {
            return {
                chart: {
                    alignTicks: true,
                    animation: true,
                    backgroundColor: '#FFFFFF',
                    borderColor: '#4572A7',
                    borderRadius: 5,
                    borderWidth: 0,
                    className: '',
                    defaultSeriesType: 'line',
                    events: {
                        addSeries: null,
                        click: null,
                        drilldown: null,
                        drillup: null,
                        load: null,
                        redraw: null,
                        selection: null
                    },
                    height: 400,
                    ignoreHiddenSeries: true,
                    inverted: false,
                    //pinchType: null,
                    plotBackgroundColor: '',
                    plotBackgroundImage: '',
                    plotBorderColor: '#C0C0C0',
                    plotBorderWidth: 0,
                    plotShadow: false,
                    polar: false,
                    reflow: true,
                    renderTo: null,
                    resetZoomButton: {
                        position: null,
                        relativeTo: 'plot',
                        theme: null
                    },
                    selectionMarkerFill: 'rgba(69, 114, 167, 0.25)',
                    shadow: false,
                    showAxes: false,
                    spacing: [10, 10, 15, 10],
                    spacingBottom: 15,
                    spacingLeft: 10,
                    spacingRight: 10,
                    spacingTop: 10,
                    style: {
                        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif', // default font
                        fontSize: '12px'
                    },
                    type: 'line',
                    width: null //,
                    //zoomType: 'x'
                },
                colors: [
                    '#2f7ed8',
                    '#0d233a',
                    '#8bbc21',
                    '#910000',
                    '#1aadce',
                    '#492970',
                    '#f28f43',
                    '#77a1e5',
                    '#c42525',
                    '#a6c96a'
                ],
                credits: {
                    enabled: true,
                    href: 'http://www.highcharts.com',
                    position: {
                        align: 'right',
                        x: -10,
                        verticalAlign: 'bottom',
                        y: -5
                    },
                    style: {
                        cursor: 'pointer',
                        color: '#909090',
                        fontSize: '10px'

                    },
                    text: 'Highcharts.com'
                },
                legend: {
                    align: 'center',
                    backgroundColor: null,
                    borderColor: '#909090',
                    borderRadius: 5,
                    borderWidth: 1,
                    enabled: true,
                    floating: false,
                    itemDistance: 8,
                    itemHiddenStyle: {
                        color: '#CCC'
                    },
                    itemHoverStyle: {
                        color: '#000'
                    },
                    itemMarginBottom: 0,
                    itemMarginTop: 0,
                    itemStyle: {
                        cursor: 'pointer',
                        color: '#274b6d',
                        fontSize: '12px'
                    },
                    itemWidth: null,
                    labelFormat: '{name}',
                    labelFormatter: null,
                    layout: 'horizontal',
                    lineHeight: 16,
                    margin: 15,
                    maxHeight: null,
                    navigation: {
                        activeColor: '#3E576F',
                        animation: true,
                        arrowSize: 12,
                        inactiveColor: '#CCC',
                        style: null
                    }, padding: 8,
                    reversed: false,
                    rtl: false,
                    shadow: false,
                    style: null,
                    symbolHeight: 12,
                    symbolPadding: 5,
                    symbolRadius: 2,
                    symbolWidth: 16,
                    title: {
                        style: {
                            fontWeight: 'bold'
                        },
                        text: null
                    }, useHTML: false,
                    verticalAlign: 'bottom',
                    //width: null,
                    x: 0,
                    y: 0
                },
                loading: {
                    hideDuration: 100,
                    labelStyle: null,
                    showDuration: 100,
                    style: null
                },
                navigation: {
                    buttonOptions: {
                        align: 'right',
                        enabled: true,
                        height: 20,
                        symbolFill: '#E0E0E0',
                        symbolSize: 14,
                        symbolStroke: '#666',
                        symbolStrokeWidth: 1,
                        symbolX: 12.5,
                        symbolY: 10.5,
                        text: '',
                        //theme:
                        verticalAlign: 'top',
                        width: 24,
                        y: 0
                    },
                    menuItemHoverStyle: null,
                    menuItemStyle: null,
                    menuStyle: null
                },
                //pane: {...},  - advanced options, devs on their own for now
                //plotOptions: {...},  - advanced options, devs on their own for now
                plotOptions: {
                    series: {
                        marker: {
                            enabled: true,
                            symbol: 'circle',
                            radius: 3
                        }
                    }
                },
                series: [], // - passed into directive
                subtitle: {
                    align: 'center',
                    floating: false,
                    style: {
                        color: '#3E576F'
                    },
                    text: '',
                    useHTML: false,
                    verticalAlign: '',
                    x: 0,
                    y: 16
                },
                title: {
                    align: 'center',
                    floating: false,
                    margin: 15,
                    style: {
                        color: '#3E576F',
                        fontSize: '16px'
                    },
                    text: '',
                    useHTML: true,
                    verticalAlign: '',
                    x: 0,
                    y: 4
                },
                tooltip: {
                    animation: true,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    borderColor: '',
                    borderRadius: 3,
                    borderWidth: 1,
                    crosshairs: null,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y"
                    },
                    enabled: true,
                    followPointer: false,
                    followTouchMove: false,
                    footerFormat: false,
                    formatter: null,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    hideDelay: 500,
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                    positioner: null,
                    shadow: true,
                    shared: false,
                    snap: 10,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                        padding: '8px'
                    },
                    useHTML: false,
                    valueDecimals: null,
                    valuePrefix: '',
                    valueSuffix: '',
                    xDateFormat: null
                },
                xAxis: {
                    allowDecimals: true,
                    alternateGridColor: null,
                    categories: [],  //- passed in by directive
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%e. %b',
                        week: '%e. %b',
                        month: '%b \'%y',
                        year: '%Y'
                    },
                    endOnTick: false,
                    events: {
                        afterSetExtremes: null,
                        setExtremes: null
                    },
                    gridLineColor: '#C0C0C0',
                    gridLineDashStyle: 'Solid',
                    gridLineWidth: 0,
                    labels: {
                        align: 'center',
                        enabled: true,
                        format: '{value}',
                        formatter: null,
                        maxStaggerLines: 5,
                        overflow: '',
                        rotation: 0,
                        staggerLines: null,
                        step: null,
                        style: {},
                        useHTML: false,
                        x: 0,
                        y: 14,
                        zIndex: 7
                    },
                    lineColor: '#C0D0E0',
                    lineWidth: 1,
                    linkedTo: null,
                    max: null,
                    maxPadding: 0.01,
                    min: null,
                    minPadding: 0.01,
                    minRange: null,
                    minTickInterval: null,
                    minorGridLineColor: '#E0E0E0',
                    minorGridLineDashStyle: 'Solid',
                    minorGridLineWidth: 1,
                    minorTickColor: '#A0A0A0',
                    minorTickInterval: null,
                    minorTickLength: 2,
                    minorTickPosition: 'outside',
                    minorTickWidth: 0,
                    offset: 0,
                    opposite: false,
                    //plotBands: [{...}],  - Advanced option, devs are on their own
                    //plotLines: [{...}],  - Advanced option, devs are on their own
                    reversed: false,
                    showEmpty: true,
                    showFirstLabel: true,
                    showLastLabel: false,
                    startOfWeek: 1,
                    startOnTick: false,
                    tickColor: '#C0D0E0',
                    tickInterval: null,
                    tickLength: 5,
                    tickPixelInterval: null,
                    tickPosition: 'outside',
                    tickPositioner: null,
                    tickPositions: null,
                    tickWidth: 1,
                    tickmarkPlacement: 'between',
                    title: {
                        align: 'middle',
                        margin: null,
                        offset: null,
                        rotation: 0,
                        style: {
                            color: '#6D869F',
                            fontWeight: 'bold'
                        },
                        text: ''
                    },
                    type: 'linear'
                },
                yAxis: {
                    allowDecimals: true,
                    alternateGridColor: null,
                    categories: null,
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%e. %b',
                        week: '%e. %b',
                        month: '%b \'%y',
                        year: '%Y'
                    },
                    endOnTick: true,
                    events: {
                        afterSetExtremes: null,
                        setExtremes: null
                    },
                    gridLineColor: '#C0C0C0',
                    gridLineDashStyle: 'Solid',
                    gridLineWidth: 1,
                    id: null,
                    labels: {
                        align: 'right',
                        enabled: true,
                        format: '{value}',
                        formatter: null,
                        maxStaggerLines: 5,
                        overflow: null,
                        rotation: 0,
                        staggerLines: null,
                        step: null,
                        style: {
                            color: '#6D869F',
                            fontWeight: 'bold'
                        },
                        useHTML: false,
                        x: -8,
                        y: 3,
                        zIndex: 7
                    },
                    lineColor: '#C0D0E0',
                    lineWidth: 0,
                    linkedTo: null,
                    max: null,
                    maxPadding: 0.05,
                    min: null,
                    minPadding: 0.05,
                    minRange: null,
                    minTickInterval: null,
                    minorGridLineColor: '#E0E0E0',
                    minorGridLineDashStyle: 'Solid',
                    minorGridLineWidth: 1,
                    minorTickColor: '#A0A0A0',
                    minorTickInterval: null,
                    minorTickLength: 2,
                    minorTickPosition: 'outside',
                    minorTickWidth: 0,
                    offset: 0,
                    opposite: false,
                    //plotBands: {…}
                    //plotLines: {…}
                    reversed: false,
                    showEmpty: true,
                    showFirstLabel: true,
                    showLastLabel: true,
                    stackLabels: {
                        align: null,
                        enabled: false,
                        format: '{total}',
                        formatter: null,
                        rotation: 0,
                        style: {
                            color: '#666',
                            'font-size': '11px',
                            'line-height': '14px'
                        },
                        textAlign: null,
                        useHTML: false,
                        verticalAlign: null,
                        x: null,
                        y: null
                    },
                    startOfWeek: 1,
                    startOnTick: true,
                    tickColor: '#C0D0E0',
                    tickInterval: null,
                    tickLength: 5,
                    //tickPixelInterval: null,
                    tickPosition: 'outside',
                    tickPositioner: null,
                    tickPositions: null,
                    tickWidth: 0,
                    tickmarkPlacement: 'between',
                    title: {
                        align: 'middle',
                        margin: 10,
                        offset: null,
                        rotation: 270,
                        style: {
                            color: '#6D869F',
                            fontWeight: 'bold'
                        },
                        text: 'Values'
                    },
                    type: 'linear'
                }
            }
        }
    }
});


