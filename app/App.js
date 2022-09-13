import { CarsController } from "./Controllers/CarsController.js";
import { JobsController } from "./Controllers/JobsController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  carsController = new CarsController()
  jobsController = new JobsController()
}

window["app"] = new App();
