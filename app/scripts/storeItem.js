function storeItem(item, i) { //received dayPeriods [start, end]
  // console.log((item[1]-item[0])/s.conf.sI.as("milliseconds"), s.conf.sI)
  // console.log(item[1])
  $(function () {
    $(".slider-range").slider({
      range: true,
      min: item[0],
      max: item[1],
      values: [s.times[i][0], s.times[i][1]],
      step: s.conf.sI.as("milliseconds"),
      slide: function (event, ui) {
        var val = ui.values
        if (val[0] == item[0]){
          s.times[i][1]=val[1]
        } else {
          s.times[i][0]=val[0]
        }
      },
      change: function (event, ui) {
        a.changeSlider(ui, item, event)
      }
    });
    $("#amount").val("$" + $(".slider-range").slider("values", 0) +
      " - $" + $(".slider-range").slider("values", 1));

  });
  return w()`
      <tr>
        <td>${s.calendarWeek[i].fullDay}<br/> ${s.storeHours[i][0]}-${s.storeHours[i][1]}</td>
        <td>
          <div class="slider">
<div class="slider-range"></div>
          </div>
        </td>
        <td>
<i class="fa fa-times-circle fa-lg" aria-hidden="true" ></i>


        </td>
      </tr>
  </div>
`
}
//TODO step won't work as it can't divide the range
//TODO attach this once there're fixtures, and index works
//TODO switch generic/default values to getter
//          <!--style=${{color: item.disabled?"red":"grey"}}-->
