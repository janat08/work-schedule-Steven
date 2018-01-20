function storeHours() {

  return w()`
  <div class="hours">
    <h3>Store Hours</h3>
    <table class="table table-striped">
      <tr>
        <th>day</th>
        <th>slide</th>
        <th>deactivate</th>
      </tr>
  ${
  s.dayPeriods.map((time, i)=>{
    return w(time, ":storeItem")`${storeItem(time, i)}`
    })
    }  
    
    </table>
  </div>

`
}
