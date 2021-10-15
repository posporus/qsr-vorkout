import { Database } from '@vuex-orm/core'

import {
    WorkoutModel,
    ExerciseModel,
    WorkoutLogModel,
    ExerciseLogModel,
    SettingsModel,
    CategoryModel,
    CategoryExerciseRelationship,
} from '../models'

const database = new Database()

database.register(WorkoutModel)
database.register(ExerciseModel)
database.register(WorkoutLogModel)
database.register(ExerciseLogModel)
database.register(SettingsModel)
database.register(CategoryModel)
database.register(CategoryExerciseRelationship)

export default database