import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { Pop } from "../Utils/Pop.js";
import { SandboxServer } from "./AxiosService.js";


class JobsService {
  async getJobs() {
    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(pear => new Job(pear))
  }


  setActiveJob(id) {
    const job = appState.jobs.find(j => j.id == id)

    if (!job) {
      throw new Error('thats a bad id')
    }
    appState.activeJob = job
    console.log('the active job', appState.activeJob);
  }
  async deleteJob(id) {
    const yes = await Pop.confirm('delete the job?')
    if (!yes) { return }

    await SandboxServer.delete(`/api/jobs/${id}`)
    appState.jobs = appState.jobs.filter(j => j.id != id)
  }

  async addJob(formData) {
    const res = await SandboxServer.post('/api/jobs', formData)
    console.log('create job res', res.data);
    let job = new Job(res.data)
    appState.jobs = [...appState.jobs, job]
  }
  async editJob(formData) {
    const job = appState.activeJob
    const res = await SandboxServer.put(`/api/jobs/${job.id}`, formData)
    console.log('the update job res', res.data);
    const updatedJob = new Job(res.data)

    const index = appState.jobs.findIndex(j => j.id == job.id)
    appState.jobs.splice(index, 1, updatedJob)
    appState.emit('jobs')
  }
}

export const jobsService = new JobsService()


// just finished services