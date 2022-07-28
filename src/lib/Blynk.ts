import Protocol from './Protocol';
import Utils from './Utils';
import { BlynkResponse, Command } from './Constants';

class Blynk extends Protocol {
  login(email: string, password: string): Promise<BlynkResponse> {
    let passHash = Utils.hashPassword(password, email)
    let os = 'Android'
    let version = '2.27.34'
    let appName = 'Blynk'
    return this.sendCommand(Command.LOGIN, [email, passHash, os, version, appName])
  }

  register(email: string, password: string): Promise<BlynkResponse> {
    let passHash = Utils.hashPassword(password, email)
    let appName = 'Blynk'
    return this.sendCommand(Command.REGISTER, [email, passHash, appName])
  }

  getEnergy(): Promise<number> {
    return this.sendCommand(Command.GET_ENERGY)
  }

  createDash(dashId: string, dashName: string, ): Promise<BlynkResponse> {
    let dashJson = '{\"id\":' + dashId + ', \"name\":\" ' + dashName + ' \"}'
    let boardJson = '{\"name\": \"Arduino Uno\", \"boardType\": \"Arduino UNO\", \"connectionType\": \"WI_FI\"}'
    this.sendCommand(Command.CREATE_DASH, dashJson)
    this.sendCommand(Command.CREATE_DEVICE, [dashId, boardJson])
    //  this.sendCommand(Command.CREATE_WIDGET, [dashId, widgetJson])
    let widgetJson  =   '{\"id\":1, \"width\":1, \"height\":1, \"x\":0, \"y\":0, \"label\":\"LED\", \"type\":\"BUTTON\", \"pinType\":\"VIRTUAL\", \"pin\":0, \"max\":0, \"max\":1}'
    return this.sendCommand(Command.CREATE_WIDGET, [dashId, widgetJson])
  }

  activateDash(dashId: string): Promise<BlynkResponse> {
    return this.sendCommand(Command.ACTIVATE_DASHBOARD, dashId)
  }

  deactivateDash(dashId: string): Promise<BlynkResponse> {
    return this.sendCommand(Command.DEACTIVATE_DASHBOARD, dashId)
  }

  async getDevices(dashId: string) {
    return this.sendCommand(Command.GET_DEVICES, dashId)
      .then((r) => JSON.parse(r))
      .catch(() => null)
  }

  async loadProfileGzipped() {
    return this.sendCommand(Command.LOAD_PROFILE_GZIPPED)
      .then((r) => JSON.parse(r))
      .catch(() => null)
  }

  async hardware(dashIdAndTargetId: string, ops: string, gpio: string, value: string) {
    return this.sendCommand(Command.HARDWARE, [dashIdAndTargetId, ops, gpio, value], 250, true)
      .then((r) => {
        if (typeof r != 'undefined') throw new Error(BlynkResponse[r])
      })
  }
}

export default Blynk