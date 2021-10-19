import {Dayjs} from 'dayjs'
import  {Duration} from 'dayjs/plugin/duration'

export interface Dataset {
    time:Dayjs,
    data:number
}

/**
 * @param time Point in time as typeof Date
 * @param timespan Timespan in Milliseconds
 * @param dataSet Dataset as Array
 * @returns average data
 */
export default function averageOverTime(time:Dayjs,timespan:Duration,dataSet:Dataset[]):number {
    console.log(time,timespan,dataSet)
    return 1
}
