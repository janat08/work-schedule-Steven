
const {hyper, wire} = hyperHTML
const hyperhtml = hyperHTML,
w= wire

function root() {
    hyperHTML(document.getElementById('root'))`
      <div>
        <h1>Hello, world!</h1>
        <h2>It is ${s.todos}.</h2>
        ${calendar()}
        ${storeHours()}
      </div>
    `
  }


  autorun(()=>root(Store))
  // wa(tick(timerData))
  // setInterval(tick, 1000,
  //   hyperHTML(document.getElementById('root'))
  // );
  // hyperHTML(document.getElementById('root'))


// @observer class Timer extends React.Component {
//     render() {
//         return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
//     }
// };
// // React.render(<Timer timerData={timerData} />, document.body);


