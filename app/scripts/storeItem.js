function storeItem(item, i) { //received dayPeriods [start, end]
  // console.log((item[1]-item[0])/s.conf.sI.as("milliseconds"), s.conf.sI)
  // console.log(item[1])
  function disable(){
    return a.toggleDisable(i)
  }
  $(function () {
    $(".slider-range").slider({
      range: true,
      min: (item[0]).ts,
      max: (item[1]).ts+1,
      values: [s.times[i][0].ts, s.times[i][1].ts+1],
      step: s.conf.sI.as("milliseconds"),
      slide: function (event, ui) {
        var val = ui.values
        if (val[0] == item[0]){
          s.times[i][1]= DT.fromJSDate(new Date(val[1]))
        } else {
          s.times[i][0]= DT.fromJSDate(new Date(val[0]))
        }
      },
      change: function (event, ui) {
        a.changeSlider(i)
      }
    });
  });
  return w()`
      <tr>
        <td>
          <div class="slider">
<div class="slider-range"></div>
          </div>
        </td>
        <td onclick=${disable}>
<i class="fa fa-times-circle fa-lg" aria-hidden="true" style=${{color: item.disabled ? "red" : "grey"}}></i>


        </td>
      </tr>
  </div>
`
}

// <td>${s.calendarWeek[i].fullDay}<br/> ${s.storeHours[i][0]}-${s.storeHours[i][1]}</td>

//TODO max is increment to next day for step to work
//TODO switch generic/default values to getter (s.times
