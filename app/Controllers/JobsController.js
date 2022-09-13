import { setHTML } from "../Utils/Writer.js"

function drawJobs() {
  setHTML('listings', /*html*/`
  <div>
    <h1>YOUR JOB STARTS HERE</h1>
  </div>
  `)
}


export class JobsController {
  constructor() {
    // console.log('the jobs controller')
  }

  showJobs() {
    drawJobs()
  }
}