import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { Pop } from "../Utils/Pop.js";
import { SandboxServer } from "./AxiosService.js";



class HousesService {
  setActiveHouse(id) {
    const house = appState.houses.find(h => h.id == id)

    if (!house) {
      throw new Error('That is a bad Id')
    }
    appState.activeHouse = house
    console.log('the active house', appState.activeHouse)
  }

  async deleteHouse(id) {
    const yes = await Pop.confirm('delete the house?')
    if (!yes) { return }

    await SandboxServer.delete(`/api/houses/${id}`)
    appState.houses = appState.houses.filter(h => h.id != id)
  }

  async addHouse(formData) {
    const res = await SandboxServer.post('/api/houses', formData)
    console.log('create house response?', res.data);
    let house = new House(res.data)
    appState.houses = [...appState.houses, house]
  }

  async editHouse(formData) {
    const house = appState.activeHouse
    const res = await SandboxServer.put(`/api/houses/${house.id}`, formData)
    console.log('the update house response', res.data);
    const updatedHouse = new House(res.data)


    const index = appState.houses.findIndex(h => house.id == house.id)
    appState.houses.splice(index, 1, updatedHouse)
    appState.emit('houses')



  }
  async getHouses() {
    const res = await SandboxServer.get('/api/houses')
    appState.houses = res.data.map(apple => new House(apple))
  }


}

export const housesService = new HousesService()