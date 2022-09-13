import { CarsController } from "./Controllers/CarsController.js";
import { HousesController } from "./Controllers/HousesController.js";
import { JobsController } from "./Controllers/JobsController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  carsController = new CarsController()
  jobsController = new JobsController()

  housesController = new HousesController()
}

window["app"] = new App();
