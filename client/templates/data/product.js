﻿
Template.product.onRendered(function () {

  let d3 = Plotly.d3;
  let gd3 = d3.select('div[id="plot_1"]');
  let gd = gd3.node();

  let today = new Date();
  let currentYear = today.getFullYear();
  let pastYear = currentYear - 1;

  function stringToWeek(x) {
    return x + '주';
  }

  let currentWeek = 36;
  let txtMap = {
    'gCNT': '교배복수',
    'bCNT': '분만복수',
    'weaned': '이유두수'
  };

  function drawPlot() {
    Meteor.call('TWO_YEARS.get', pastYear, currentYear, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        var twoYears = result;

        var checked = $('input[name="optradio"]:checked').val();
        var txt = txtMap[checked];

        var week1 = [],
          week2 = [];

        var past_gCNT = [],
          past_bCNT = [],
          past_weaned = [],
          current_gCNT = [],
          current_bCNT = [],
          current_weaned = [];

        for (var i = 0; i < twoYears.length; i++) {
          if (twoYears[i].YEAR === pastYear.toString()) {
            if (twoYears[i].CATEGORY === 'GCNT') {
              past_gCNT.push(twoYears[i].VALUE);
              week1.push(twoYears[i].WEEK);
            } else if (twoYears[i].CATEGORY === "BCNT") {
              past_bCNT.push(twoYears[i].VALUE);
            } else if (twoYears[i].CATEGORY === "EU_DUSU") {
              past_weaned.push(twoYears[i].VALUE);
            }
          } else {
            if (twoYears[i].CATEGORY === "GCNT") {
              current_gCNT.push(twoYears[i].VALUE);
              week2.push(twoYears[i].WEEK);
            } else if (twoYears[i].CATEGORY === "BCNT") {
              current_bCNT.push(twoYears[i].VALUE);
            } else if (twoYears[i].CATEGORY === "EU_DUSU") {
              current_weaned.push(twoYears[i].VALUE);
            }
          }
        }

        for (i = 0; i < 3; i++) {
          current_bCNT.pop();
          current_gCNT.pop();
          current_weaned.pop();
        }

        var period = [];
        for (i = 0; i < 52; i++) {
          period[i] = stringToWeek(week1[i]);
        }

        var trace1 = {
          x: period,
          y: past_gCNT,
          connectgaps: true,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: pastYear + "년 교배복수"
        };

        var trace2 = {
          x: period,
          y: past_bCNT,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: pastYear + "년 분만복수"
        };

        var trace3 = {
          x: period,
          y: past_weaned,
          rotation: 90,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: pastYear + "년 이유두수"
        };

        var trace4 = {
          x: period,
          y: current_gCNT,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: currentYear + "년 교배복수"
        };

        var trace5 = {
          x: period,
          y: current_bCNT,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: currentYear + "년 분만복수"
        };

        var trace6 = {
          x: period,
          y: current_weaned,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: currentYear + "년 이유두수"
        };

        var gCNT = [trace1, trace4];
        var bCNT = [trace2, trace5];
        var _EU_DUSU = [trace3, trace6];

        var dataMap = {
          'gCNT': [trace1, trace4],
          'bCNT': [trace2, trace5],
          'weaned': [trace3, trace6]
        };
        var data = dataMap[checked];

        layout = {
          title: '돼지 사육 동향 ( ' + txt + ' )',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          showlegend: false,
          annotations: [{
            yanchor: 'top',
            y: 1.1,
            yref: 'paper',
            xanchor: 'right',
            x: 1,
            xref: 'paper',
            text: '현재 ' + currentWeek + ' 주차',
            showarrow: false,
            font: {
              size: 16
            }
          }],
        };
        Plotly.newPlot(gd, data, layout);
      }
    });
  }

  drawPlot();

  window.onresize = function () {
    Plotly.Plots.resize(gd);
  };

  $('input[name="optradio"]').click(function () {
    drawPlot();
  });

});
