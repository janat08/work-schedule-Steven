
function storeHours(data) {

  return w(data, ":calendar")`
<div class="hours">
  <h3>Store Hours</h3>
<table class="table table-striped">
  <tr>
  <th>day</th>
  <th>slide</th>
  <th>delete</th>
  </tr>
  <tr>
  <td>Date</td>
  <td>
  <div class="slider">
  <!-- https://www.w3schools.com/jquerymobile/tryit.asp?filename=tryjqmob_forms_slider_range -->
<form method="post" action="/action_page_post.php">
  <div data-role="rangeslider">
  <label for="price-min">Price:</label>
<input type="range" name="price-min" id="price-min" value="200" min="0" max="1000">
  <label for="price-max">Price:</label>
<input type="range" name="price-max" id="price-max" value="800" min="0" max="1000">
  </div>
  <input type="submit" data-inline="true" value="Submit">
  <p>The range slider can be useful for allowing users to select a specific price range when browsing products.</p>
</form>
</div>
</td>
<td>
<button type="button" class="btn btn-default btn-lg active">Button</button>

  </td>
  </tr>
  </table>
  </div>
`
}
