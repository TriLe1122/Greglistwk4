import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function drawHouses() {
  let template = ''
  appState.houses.forEach(house => template += house.HouseCardTemplate)
  setHTML('listings', template)
}

export class HousesController {
  constructor() {
    appState.on('houses', drawHouses)
    this.showHouses()
  }


  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error('[GetHouses]', error)
      Pop.error(error)
    }

  }

  showHouses() {
    this.getHouses()
    setHTML('forms', House.getHouseForm())
  }


  async handleSubmit() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let formData = getFormData(form)

      if (appState.activeHouse) {
        await housesService.editHouse(formData)
      } else {
        await housesService.addHouse(formData)
      }

      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[AddHouse]', error)
      Pop.error(error)
    }
  }

  async deleteHouse(id) {
    try {
      await housesService.deleteHouse(id)
    } catch (error) {
      console.error('[DeletingHouse]', error)
      Pop.error(error)
    }
  }

  addHouse() {
    appState.activeHouse = null
    const template = House.getHouseForm()
    setHTML('forms', template)
  }

  beginEdit(id) {
    housesService.setActiveHouse(id)
    const editable = appState.activeHouse
    const template = House.getHouseForm(editable)

    setHTML('forms', template)
  }

}