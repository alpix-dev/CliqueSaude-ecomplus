const axios = require('axios')
const getAppData = require('../../lib/store-api/get-app-data')

exports.post = ({ appSdk, admin }, req, res) => {  
  const { storeId, scheduleDate } = req.body

  //console.log(JSON.stringify(req.body))
  let scheduleList
  let minifyScheduleDate
  let currentDay
  let scheduleDateOrder

  if(scheduleDate != null){
    let separator = "-"
    let currentDayFormat
    
    currentDayFormat =  scheduleDate.split(separator)[1] + '/' + scheduleDate.split(separator)[2] + '/' + scheduleDate.split(separator)[0]
    
    
    minifyScheduleDate = currentDayFormat.replace('/','').replace('/','')
    currentDayFormat = new Date(currentDayFormat)
    currentDay = currentDayFormat.getDay()
      
    console.log(`${storeId}/${minifyScheduleDate}`)
    getAppData({ appSdk, storeId }).then(appData => {
      console.log(JSON.stringify(appData))
      admin.firestore().doc(`${storeId}/${minifyScheduleDate}`).get().then((docSnapshot) => {
        let scheduleList
        if(docSnapshot.exists){
          scheduleList = docSnapshot.get('schedules')
        }else{
          scheduleList = null
        }

        //if(scheduleDate != null && typeof scheduledDeliveryConfig != "undefined"){
          let responseData = []                

          if(scheduleList != null){
            responseData.push({field:"scheduleList", value:scheduleList})
          }
          if(typeof appData.posting_deadline.holidays != "undefined" && appData.posting_deadline.holidays != null){
            responseData.push({field:"holidays", value:appData.posting_deadline.holidays})
          }
          if(typeof appData.posting_deadline.closed_dates != "undefined" && appData.posting_deadline.closed_dates != null){
            responseData.push({field:"closed_dates", value: appData.posting_deadline.closed_dates})
          }
          if(typeof appData.posting_deadline.no_schedule != "undefined" && appData.posting_deadline.no_schedule != null){
            responseData.push({field:"no_schedule", value: appData.posting_deadline.no_schedule})            
          }
          
          res.send(responseData)
          
        //}

      })        
      .catch(err => {
        console.error(err)
        res.send(err.message)
      })
    })
  }
}
