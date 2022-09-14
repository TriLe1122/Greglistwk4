import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function drawJobs() {
  let template = ''
  appState.jobs.forEach(job => template += job.JobCardTemplate)
  setHTML('listings', template)
}


export class JobsController {
  constructor() {
    appState.on('jobs', drawJobs)
    this.showJobs()
  }


  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error('[GetJobs]', error)
      Pop.error(error)
    }
  }

  showJobs() {
    this.getJobs()
    setHTML('forms', Job.GetJobForm())
  }

  async handleSubmit() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let formData = getFormData(form)

      if (appState.activeJob) {
        await jobsService.editJob(formData)
      } else {
        await jobsService.addJob(formData)
      }
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[AddJob]', error);
      Pop.error(error)
    }
  }


  async deleteJob(id) {
    try {
      await jobsService.deleteJob(id)
    } catch (error) {
      console.error('[deletingHouse]', error);
      Pop.error(error)
    }
  }

  addJob() {
    appState.activeJob = null
    const template = Job.GetJobForm()
    setHTML('forms', template)
  }

  beginEdit(id) {
    jobsService.setActiveJob(id)
    const editable = appState.activeJob
    const template = Job.GetJobForm(editable)
    setHTML('forms', template)

  }
}