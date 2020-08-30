$(function () {
  chrome.storage.sync.get(
    [
      "limit",
      "total",
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sept",
      "oct",
      "nov",
      "dec",
      "jan_u",
      "feb_u",
      "mar_u",
      "apr_u",
      "may_u",
      "jun_u",
      "jul_u",
      "aug_u",
      "sept_u",
      "oct_u",
      "nov_u",
      "dec_u",
    ],
    function (budget) {
      $("#limit").val(budget.limit);
      $("#total").text(budget.total);
      $("#jan").val(budget.jan);
      $("#feb").val(budget.feb);
      $("#mar").val(budget.mar);
      $("#apr").val(budget.apr);
      $("#may").val(budget.may);
      $("#jun").val(budget.jun);
      $("#jul").val(budget.jul);
      $("#aug").val(budget.aug);
      $("#sept").val(budget.sept);
      $("#oct").val(budget.oct);
      $("#nov").val(budget.nov);
      $("#dec").val(budget.dec);
      $("#jan_u").val(budget.jan_u);
      $("#feb_u").val(budget.feb_u);
      $("#mar_u").val(budget.mar_u);
      $("#apr_u").val(budget.apr_u);
      $("#may_u").val(budget.may_u);
      $("#jun_u").val(budget.jun_u);
      $("#jul_u").val(budget.jul_u);
      $("#aug_u").val(budget.aug_u);
      $("#sept_u").val(budget.sept_u);
      $("#oct_u").val(budget.oct_u);
      $("#nov_u").val(budget.nov_u);
      $("#dec_u").val(budget.dec_u);
    }
  );

  $("#saveLimit").click(function () {
    var limit = $("#limit").val();
    if (limit) {
      chrome.storage.sync.set({ limit: limit }, function () {
        close();
      });
    }
  });

  window.onload = function () {
    var total_monthly_sales = 0;
    var saas_name = "";
    var total_per_app = 0;
    $(".add-row").click(function () {
      var name = $("#name").val();
      var price = $("#price").val();
      var time = $("#time").val();
      var tax = $("#tax").val();
      price = Number(price) + Number(tax);

      if (time == "Yearly") price = price / 12;
      total_monthly_sales = Number(total_monthly_sales) + Number(price);
      total_per_app = price;
      saas_name = name;
      if (time == "Yearly") price = price * 12;

      var markup =
        "<tr><td><input type='checkbox' name='record'></td><td>" +
        name +
        "</td><td>" +
        price +
        "</td><td>" +
        time +
        "</td></tr>";
      $("#spending_table tbody").append(markup);
    });

    // Find and remove selected table rows
    var i = 0;
    $(".delete-row").click(function () {
      i = 0;
      $("#spending_table tbody")
        .find('input[name="record"]')
        .each(function () {
          i++;
          if ($(this).is(":checked")) {
            $(this).parents("tr").remove();
            var length = chart.options.data[0].dataPoints.length;

            if (chart.options.data[0].dataPoints[i - 1].y == 0) {
              for (var j = 0; j < length; j++) {
                if (chart.options.data[0].dataPoints[i - 1].y == 0) {
                  i++;
                } else {
                  break;
                }
              }
            }
            chart.options.data[0].dataPoints[i - 1].y = 0;
            chart.options.data[0].dataPoints[i - 1].label = "deleted";
            chart.render();
          }
        });
    });

    //to display monthly sales in SaaS apps
    $(".totalsales").click(function () {
      chrome.storage.sync.get(["total"], function (budget) {
        document.getElementById(
          "total_monthly_sales"
        ).innerHTML = total_monthly_sales;
        $("#total").text(total_monthly_sales);
      });
    });

    //to display chart dynamically
    var chart = new CanvasJS.Chart("piechartContainer", {
      title: {
        text: "Spending on SaaS applications",
      },
      axisY: {
        title: "SaaS Spend $",
        suffix: " $",
      },
      data: [
        {
          type: "column",
          yValueFormatString: "#,##0.# dollars",
          indexLabel: "{y}",
          dataPoints: [{ label: "Example", y: 5000 }],
        },
      ],
    });
    chart.render();

    $(".add-row").click(function () {
      var length = chart.options.data[0].dataPoints.length;
      chart.options.title.text = "New SaaS App Added";
      chart.options.data[0].dataPoints.push({
        label: saas_name,
        y: total_per_app,
      });
      chart.render();
    });
  };

  $("#TotalSpend").click(function () {
    var jan = Number(document.getElementById("jan").value);
    var feb = Number(document.getElementById("feb").value);
    var mar = Number(document.getElementById("mar").value);
    var apr = Number(document.getElementById("apr").value);
    var may = Number(document.getElementById("may").value);
    var jun = Number(document.getElementById("jun").value);
    var jul = Number(document.getElementById("jul").value);
    var aug = Number(document.getElementById("aug").value);
    var sept = Number(document.getElementById("sept").value);
    var oct = Number(document.getElementById("oct").value);
    var nov = Number(document.getElementById("nov").value);
    var dec = Number(document.getElementById("dec").value);

    var jan_u = Number(document.getElementById("jan_u").value);
    var feb_u = Number(document.getElementById("feb_u").value);
    var mar_u = Number(document.getElementById("mar_u").value);
    var apr_u = Number(document.getElementById("apr_u").value);
    var may_u = Number(document.getElementById("may_u").value);
    var jun_u = Number(document.getElementById("jun_u").value);
    var jul_u = Number(document.getElementById("jul_u").value);
    var aug_u = Number(document.getElementById("aug_u").value);
    var sept_u = Number(document.getElementById("sept_u").value);
    var oct_u = Number(document.getElementById("oct_u").value);
    var nov_u = Number(document.getElementById("nov_u").value);
    var dec_u = Number(document.getElementById("dec_u").value);

    // CanvasJS column chart to show revenue from Jan to Dec
    var chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "SaaS Annual Spending",
      },
      subtitles: [
        {
          text: "Sales from JANUARY to DECEMBER",
        },
      ],
      axisX: {
        title: "Month",
        valueFormatString: "MMM",
      },
      axisY: {
        title: "SaaS Spend - $",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC",
      },
      axisY2: {
        title: "Number of users - Units",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries,
      },
      data: [
        {
          type: "column",
          name: "SaaS Spend",
          showInLegend: true,
          yValueFormatString: "#,##0.# dollars",
          dataPoints: [
            { x: new Date("1 Jan 2019"), y: jan },
            { x: new Date("1 Feb 2019"), y: feb },
            { x: new Date("1 Mar 2019"), y: mar },
            { x: new Date("1 Apr 2019"), y: apr },
            { x: new Date("1 May 2019"), y: may },
            { x: new Date("1 Jun 2019"), y: jun },
            { x: new Date("1 Jul 2019"), y: jul },
            { x: new Date("1 Aug 2019"), y: aug },
            { x: new Date("1 Sep 2019"), y: sept },
            { x: new Date("1 Oct 2019"), y: oct },
            { x: new Date("1 Nov 2019"), y: nov },
            { x: new Date("1 Dec 2019"), y: dec },
          ],
        },
        {
          type: "column",
          name: "Users",
          axisYType: "secondary",
          showInLegend: true,
          yValueFormatString: "#,##0.# users",
          dataPoints: [
            { x: new Date("1 Jan 2019"), y: jan_u },
            { x: new Date("1 Feb 2019"), y: feb_u },
            { x: new Date("1 Mar 2019"), y: mar_u },
            { x: new Date("1 Apr 2019"), y: apr_u },
            { x: new Date("1 May 2019"), y: may_u },
            { x: new Date("1 Jun 2019"), y: jun_u },
            { x: new Date("1 Jul 2019"), y: jul_u },
            { x: new Date("1 Aug 2019"), y: aug_u },
            { x: new Date("1 Sep 2019"), y: sept_u },
            { x: new Date("1 Oct 2019"), y: oct_u },
            { x: new Date("1 Nov 2019"), y: nov_u },
            { x: new Date("1 Dec 2019"), y: dec_u },
          ],
        },
      ],
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }
    chrome.storage.sync.set({
      jan: jan,
      feb: feb,
      mar: mar,
      apr: apr,
      may: may,
      jun: jun,
      jul: jul,
      aug: aug,
      sept: sept,
      oct: oct,
      nov: nov,
      dec: dec,
      jan_u: jan_u,
      feb_u: feb_u,
      mar_u: mar_u,
      apr_u: apr_u,
      may_u: may_u,
      jun_u: jan_u,
      jul_u: jul_u,
      aug_u: aug_u,
      sept_u: sept_u,
      oct_u: oct_u,
      nov_u: nov_u,
      dec_u: dec_u,
    });
  });

  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      var notifOptions = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Resetting Total",
        message: "Total has been reset to 0.",
      };

      chrome.notifications.create("resetNotif", notifOptions);
      chrome.notifications.clear("resetNotif");
    });
  });
});
