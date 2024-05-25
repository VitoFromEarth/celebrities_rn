import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RootStackParamList, DrawerStackParamList} from './router.types.ts';

export const MainStack = createNativeStackNavigator<RootStackParamList>();
export const Drawer = createDrawerNavigator<DrawerStackParamList>();
