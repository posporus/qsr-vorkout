import { Database } from '@vuex-orm/core'

import WorkoutModel from 'src/store/models/WorkoutModel'

const database = new Database()

database.register(WorkoutModel)

export default database