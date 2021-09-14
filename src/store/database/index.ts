import { Database } from '@vuex-orm/core'

import WorkoutModel from 'src/store/models/WorkoutModel'
import WorkoutLogModel from '../models/WorkoutLogModel'
import ExerciseModel from '../models/ExerciseModel'

const database = new Database()

database.register(WorkoutModel)
database.register(ExerciseModel)
database.register(WorkoutLogModel)

export default database