import os from 'os'
import process from 'process'
import currentProcess from 'current-processes'
import _ from 'lodash'

const getAppProcessOfCpu = (appName) => {
  return new Promise(resolve => {
    currentProcess.get(function(err, processes) {

      let sorted = _.sortBy(processes, 'cpu')
      let appProcess = _.filter(sorted, {
        name: appName
      })

      resolve(appProcess)
    })
  })
}

export default {
  async getSystemStatus () {
    let allProcessInfo = await getAppProcessOfCpu('Chromium')
    let chromiumStatus = _.reduce(allProcessInfo, (result, val) => {
      result.totalCpu += val.cpu
      result.totalMem += val.mem.usage
      result.cnt++
      return result
    }, {
      totalCpu: 0,
      totalMem: 0,
      cnt: 0
    })
    return {
      arch: os.arch(),
      cpus: os.cpus(),
      totalMem: os.totalmem(),
      freeMem: os.freemem(),
      memInfo: process.memoryUsage(),
      totalMemFormat: (os.totalmem() / 1024 / 1024 / 1024).toFixed(1) + 'G',
      freeMemFormat: (os.freemem() / 1024 / 1024 / 1024).toFixed(1) + 'G',
      chromiumStatus
    }
  }
}
