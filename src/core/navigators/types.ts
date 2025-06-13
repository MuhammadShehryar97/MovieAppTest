import { BottomTabNavigationOptions, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationProp, Route, ParamListBase } from '@react-navigation/native';

import { RootStackParamList } from './root.navigator';

export interface BarSelectorParams {
	focused: boolean;
	color: string;
}

export interface BarIconSelectorParams extends BarSelectorParams {
	size: number;
}

export interface BarLabelSelectorParams extends BarSelectorParams {
	position: 'beside-icon' | 'below-icon';
}

export type BarSelectorRoute = Route<string>;

export type BarScreenOptions = (props: {
	route: BarSelectorRoute;
	navigation: BottomTabNavigationProp<ParamListBase, string>;
}) => BottomTabNavigationOptions;

export type StackNavigatorOptions<ParamList extends string> = (props: {
	route: Route<ParamList>;
	navigation: Navigation;
}) => NativeStackNavigationOptions;

export type Navigation = NavigationProp<RootStackParamList>;