import {configureStore} from '@reduxjs/toolkit'
import loginReducer from './loginReducer'
import departmantListReducer from './departmantListReducer'
import addDepartmantReducer from './departmant/departmantAddReducee'
import zoneReducer from './zone/zoneReducer'

import logger from 'redux-logger'


const reducer ={
    login: loginReducer,
    department:departmantListReducer,
    addDepartmantReducer:addDepartmantReducer,
    zone:zoneReducer

}

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})