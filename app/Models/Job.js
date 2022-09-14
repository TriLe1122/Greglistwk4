

export class Job {
  constructor(data) {
    this.id = data.id
    this.company = data.company
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
    this.jobTitle = data.jobTitle
    this.imgUrl = data.imgUrl
  }

  get JobCardTemplate() {
    return /*html*/`
    <div class="col-md-4 col-lg-3 mb-3"> 
      <div class="card">
        <img src="${this.imgUrl}" alt="job" class="img-fluid">
        <div class="card-body">
          <h5 class="text-uppercase">
            ${this.hours} | ${this.rate} ${this.company}
          </h5>
          <p>
            <strong>$ ${this.jobTitle}</strong>
          </p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
    `

  }




  static GetJobForm(editable) {
    editable =
      editable ||
      new Job({
        company: '',
        jobTitle: '',
        hours: 40,
        rate: 55,
        description: '',
      });
    return /*html*/`
      <form form onsubmit = "app.jobsController.handleSubmit()">

 

  <div class="form-floating mb-3">
    <input type="text" class="form-control" name="company" required value="${editable.company
      }">
    <label for="company">Company</label>
  </div>

  <div class="form-floating mb-3">
    <input type="text" class="form-control" name="jobTitle" required value="${editable.jobTitle
      }">
    <label for="jobtitle">Job title</label>
  </div>

  <div class="form-floating mb-3">
    <input type="number" class="form-control" name="hours" required value="${editable.hours
      }">
    <label for="hours">Hours</label>
  </div>

  <div class="form-floating mb-3">
    <input type="number" class="form-control" name="rate" required  value="${editable.rate
      }">
    <label for="rate">Rate</label>
  </div>



  <div class="form-floating">
    <textarea class="form-control" placeholder="Describe your Listing" name="description">${editable.description
      }</textarea>
    <label for="description">Description</label>
  </div>

  <div class="d-flex my-4 gap-5 align-items-center">
  <button class="btn" type="reset">Cancel</button>
    <button class="btn btn-primary" type="submit">${editable.id ? 'Save Changes' : 'Create'
      } </button>
  </div>


</form>
`

  }
}