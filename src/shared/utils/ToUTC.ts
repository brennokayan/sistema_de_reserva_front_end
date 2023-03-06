import moment from "moment"

export function ToUtc(date: any){
    var correct = date?.toISOString()
    var correctDate = moment(correct).tz("America/Cuiaba").utc(true).format()
    console.log(correctDate)
    return String(correctDate)
}