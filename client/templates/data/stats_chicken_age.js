Template.stats_chicken_age.onCreated(function () {

});

Template.stats_chicken_age.onRendered(function () {

  Meteor.call('chicken_age_by_city.get', function (error, res) {
    if (error) {
      console.log(error);
    } else {
      Session.setPersistent('chicken_age', res);
    }
  });

  var txt = "전국";

  function unit10K(x) {
    return Math.round(x / 10000);
  }

  var time = [];
  var age_total = [];
  var age_under_3_total = [];
  var age_3_6_total = [];
  var age_over_6_total = [];

  function drawPlot(curCity) {
    var currnet_City = curCity;
    var series = Session.get('chicken_age');

    var d3 = Plotly.d3;
    var g = d3.select('div[id="plot_1"]');
    var gd = g.node();
    var g2 = d3.select('div[id="plot_2"]');
    var gd2 = g2.node();

    //  FREQ : Q 분기
    // ITEM  : T01 합계 / T02 3개월미만 / T03	3~6개월 / T04	6개월이상 /
    // C_A : 시도별
    // 14STD04410	마리

    $.each(series, function (i, val) {
      if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City) {
        $.each(series[i].Obs, function (iv, val) {
          time[iv] = series[i].Obs[iv].$.TIME_PERIOD;
          age_under_3_total[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      } else if (series[i].$.ITEM === "T03" && series[i].$.C_A === currnet_City) {
        $.each(series[i].Obs, function (iv, val) {
          age_3_6_total[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      } else if (series[i].$.ITEM === "T04" && series[i].$.C_A === currnet_City) {
        $.each(series[i].Obs, function (iv, val) {
          age_over_6_total[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      }
    });

    function stringToDate(x) {
      return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
    }
    var period = [];
    for (i = 0; i < 5; i++) {
      period[i] = stringToDate(time[i]);
    }
    var trace2_y = [];
    for (i = 0; i < 5; i++) {
      trace2_y[i] = unit10K(age_under_3_total[i]);
    }
    var trace3_y = [];
    for (i = 0; i < 5; i++) {
      trace3_y[i] = unit10K(age_3_6_total[i]);
    }
    var trace4_y = [];
    for (i = 0; i < 5; i++) {
      trace4_y[i] = unit10K(age_over_6_total[i]);
    }
    var total_stack = [];
    for (i = 0; i < 5; i++) {
      total_stack[i] = trace2_y[i] + trace3_y[i] + trace4_y[i];
    }

    var percent1 = [];
    var percent2 = [];
    var percent3 = [];
    for (var i = 0; i < 5; i++) {

      percent1[i] = trace2_y[i] / total_stack[i] * 100;
      if (percent1[i] <= 5) {
        percent1[i] = " ";
      } else {
        percent1[i] = (Math.round(percent1[i] * 10) / 10) + '%';
      }

      percent2[i] = trace3_y[i] / total_stack[i] * 100;
      if (percent2[i] <= 5) {
        percent2[i] = " ";
      } else {
        percent2[i] = (Math.round(percent2[i] * 10) / 10) + '%';
      }

      percent3[i] = trace4_y[i] / total_stack[i] * 100;
      if (percent3[i] <= 5) {
        percent3[i] = " ";
      } else {
        percent3[i] = (Math.round(percent3[i] * 10) / 10) + '%';
      }
    }

    var trace2 = {
      x: period,
      y: trace2_y,
      name: '3개월 미만',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace3 = {
      x: period,
      y: trace3_y,
      name: '3~6개월',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace4 = {
      x: period,
      y: trace4_y,
      name: '6개월 이상',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace5 = {
      x: period,
      y: trace2_y,
      name: '3개월 미만',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace6 = {
      x: period,
      y: trace3_y,
      name: '3~6개월',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace7 = {
      x: period,
      y: trace4_y,
      name: '6개월 이상',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };

    var data = [trace2, trace3, trace4];
    var data2 = [trace5, trace6, trace7];

    var layout = {
      title: txt + ' 닭 월령별 사육 동향',
      titlefont: {
        family: 'Jeju Gothic, serif',
        size: 22,
        color: '#2c3e50'
      },
      annotations: [{
        yanchor: 'top',
        y: 1.1,
        yref: 'paper',
        xanchor: 'right',
        x: 0.98,
        xref: 'paper',
        text: '사육 두수(만 마리)',
        showarrow: false,
        font: {
          size: 16
        }
      }],
      showlegend: false
    };
    Plotly.newPlot(gd, data, layout);

    var layout2 = {
      title: txt + " 닭 월령별 사육 비율",
      titlefont: {
        family: 'Jeju Gothic, serif',
        size: 22,
        color: '#2c3e50'
      },
      annotations: [{
          yanchor: 'top',
          y: 1.1,
          yref: 'paper',
          xanchor: 'right',
          x: 0.98,
          xref: 'paper',
          text: '사육 두수(만 마리)',
          showarrow: false,
          font: {
            size: 16
          }
        },

      ],
      barmode: 'stack',
      showlegend: false
    };

    for (var i = 0; i < period.length; i++) {
      var add_annotation = {
        x: period[i],
        y: total_stack[i],
        text: total_stack[i],
        xanchor: 'center',
        yanchor: 'top',
        yref: 'y',
        showarrow: true,
        arrowhead: 0,
        ax: 0,
        ay: -20,
        font: {
          size: 13,
        }
      };
      var add_annotation1 = {
        x: period[i],
        y: trace2_y[i],
        text: percent1[i],
        yref: 'y',
        showarrow: true,
        arrowhead: 0,
        ax: 0,
        ay: 10,
        font: {
          size: 13,
          color: 'ffffff',
        }
      };
      var add_annotation2 = {
        x: period[i],
        y: trace2_y[i] + trace3_y[i],
        text: percent2[i],
        yref: 'y',
        showarrow: true,
        arrowhead: 0,
        ax: 0,
        ay: 7,
        font: {
          size: 13,
          color: 'ffffff',
        }
      };
      var add_annotation3 = {
        x: period[i],
        y: trace2_y[i] + trace3_y[i] + trace4_y[i],
        text: percent3[i],
        yref: 'y',
        showarrow: true,
        arrowhead: 0,
        ax: 0,
        ay: 10,
        font: {
          size: 13,
          color: 'ffffff',
        }
      };
      // add_annotation2,
      layout2.annotations.push(add_annotation, add_annotation1, add_annotation2, add_annotation3);
    }

    Plotly.newPlot(gd2, data2, layout2);

    window.onresize = function () {
      Plotly.Plots.resize(gd);
      Plotly.Plots.resize(gd2);
    };
  }

  var setCity = "00";
  drawPlot(setCity);

  $('.citySelect').change(function () {
    var currentCity = this.value;
    txt = $('.citySelect option:selected').text();

    drawPlot(currentCity);
  });
});