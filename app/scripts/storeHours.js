class storeHours extends hyperElement{
  setup(n){

    var a = au(n(s))
    this.attrs = {
0: [DT.fromMillis(s.debouncedTimes[0][0]),DT.fromMillis(s.debouncedTimes[0][1])],
1: [DT.fromMillis(s.debouncedTimes[1][0]),DT.fromMillis(s.debouncedTimes[1][1])],
2: [DT.fromMillis(s.debouncedTimes[2][0]),DT.fromMillis(s.debouncedTimes[2][1])],
3: [DT.fromMillis(s.debouncedTimes[3][0]),DT.fromMillis(s.debouncedTimes[3][1])],
4: [DT.fromMillis(s.debouncedTimes[4][0]),DT.fromMillis(s.debouncedTimes[4][1])],
5: [DT.fromMillis(s.debouncedTimes[5][0]),DT.fromMillis(s.debouncedTimes[5][1])],
6: [DT.fromMillis(s.debouncedTimes[6][0]),DT.fromMillis(s.debouncedTimes[6][1])],
    }


    return a
  }

  render(h, st){
var self = this
// console.log("before",this.attrs[0])
// if(this.attrs[0] == undefined){
//   this.attrs = {
// 0: {0: st.storeHours[1][0], 1: st.storeHours[1][1]},
// 1: {0: st.storeHours[1][0], 1: st.storeHours[1][1]},
// 2: {0: st.storeHours[2][0], 1: st.storeHours[2][1]},
// 3: {0: st.storeHours[3][0], 1: st.storeHours[3][1]},
// 4: {0: st.storeHours[4][0], 1: st.storeHours[4][1]},
// 5: {0: st.storeHours[5][0], 1: st.storeHours[5][1]},
// 6: {0: st.storeHours[6][0], 1: st.storeHours[6][1]},
// }
// }
// console.log(this.attrs[0], "post")
console.log(self)
  return h`


  <div class="hours">
    <h3>Store Hours</h3>
    <table class="table table-striped">
      <tr>
        <th>day</th>
        <th>slide</th>
        <th>deactivate</th>
      </tr>
  ${
  st.dayPeriods.map((item, i)=>{ //intentional periods
    function disable(){
      return a.toggleDisable(i)
    }
    $(function() {
      $(".slider-range" + i)
      .slider({})
      .on(
        "slide", function (event) {
          var val = event.value
          a.changeSlider([self.attrs[i][0], self.attrs[i][1]], i)

          if (val[0] == item[0]) {
            self.attrs[i][1] = DT.fromMillis(val[1]*s.conf.sI.as("milliseconds")+item[0].ts)
          } else {
            self.attrs[i][0] = DT.fromMillis(val[0]*s.conf.sI.as("milliseconds")+item[0].ts)
          }
        },
      )
        .on(
          "slideStart", function (event) {
            var val = event.value
            a.changeSlider([self.attrs[i][0], self.attrs[i][1]], i)

            if (val[0] == item[0]) {
              self.attrs[i][1] = DT.fromMillis(val[1]*s.conf.sI.as("milliseconds")+item[0].ts)
            } else {
              self.attrs[i][0] = DT.fromMillis(val[0]*s.conf.sI.as("milliseconds")+item[0].ts)
            }
          },
        )
        .on(
          "slideStop", function (event) {
            var val = event.value
            a.changeSlider([self.attrs[i][0], self.attrs[i][1]], i)

            if (val[0] == item[0]) {
              self.attrs[i][1] = DT.fromMillis(val[1]*s.conf.sI.as("milliseconds")+item[0].ts)
            } else {
              self.attrs[i][0] = DT.fromMillis(val[0]*s.conf.sI.as("milliseconds")+item[0].ts)
            }
          },
        )

    })

// console.log(self.attrs[i][0])
    return w(item, ":storeItem")`
          <tr>
      <td>${st.calendarWeek[i].fullDay}<br/> ${self.attrs[i][0].toFormat("t")}-${self.attrs[i][1].toFormat("t")}</td>
        <td>
          <div class="slider">

          <input type="text" class=${"slider-range"+i} value="" data-slider-min="0" 
          data-slider-tooltip="hide"
          data-slider-max=${((item[1]).ts-(item[0]).ts)/s.conf.sI.as("milliseconds")} 
data-slider-step="1" data-slider-value=${`[${(item[0].ts-self.attrs[i][0])/s.conf.sI.as("milliseconds")}, ${(self.attrs[i][1]-self.attrs[i][0])/s.conf.sI.as("milliseconds")}]`}/>
    
          </div>

        </td>
        <td onclick=${disable}>
        ${this.attrs.val1}

<i class="fa fa-times-circle fa-lg" aria-hidden="true" style=${{color: st.disabledDays[i] ? "red" : "grey"}}></i>


        </td>
      </tr>
    
    `
    })
    }  
    
    </table>
  </div>

`
}}


class slider extends hyperElement{
  setup(n){
    console.log(this.dataset)


    var a = au(n(s))
    return a
  }
  connectedCallback() { console.log('rendering') }

  render(h, st){
    $(function(){$(".slider-range1").slider({})})
    return h`
    <input type="text"  data-init=true class=${"slider-range"+i} value="" data-slider-min=${(item[0]).ts} data-slider-max=${(item[1]).ts} 
    data-slider-step="5" data-slider-value=${`[${st.times[i][0]},${st.times[i][1]}]`}/>
`
}}



// ${w( $(function(){$(".slider-range1"+i).slider({})}), "slider1"+i)`
// <input type="text" class=${"slider-range1"+i} value="" data-slider-min="10" data-slider-max="1000"
// data-slider-step="5" data-slider-value="[250,450]"/>
//   `}



// function makeSlider(i, item, st){
  // $(function() {
  //   $(".slider-range" + i).slider({
  //     range: true,
  //     min: (item[0]).ts,
  //     max: (item[1]).ts + 1,
  //     values: [st.times[i][0], st.times[i][1] + 1], //TODO access ts if actual dates (ts= miliseconds)
  //     step: s.conf.sI.as("milliseconds"),
  //     slide: function (event, ui) {
  //       var val = ui.values
  //       if (val[0] == item[0]) {
  //         s.times[i][1] = DT.fromJSDate(new Date(val[1]))
  //       } else {
  //         s.times[i][0] = DT.fromJSDate(new Date(val[0]))
  //       }
  //     },
  //     change: function (event, ui) {
  //       a.changeSlider(i)
  //     }
  //   });
  // })
// }

