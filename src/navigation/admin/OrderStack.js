import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import NewOrdersScreen from "../../screens/admin/NewOrdersScreen";
import PendingOrdersScreen from "../../screens/admin/PendingOrdersScreen";
import CompletedOrdersScreen from '../../screens/admin/CompletedOrdersScreen';
const Tab = createMaterialTopTabNavigator();
function TabStack(){
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: 12
        },
        tabBarIndicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="NewOrdersScreen"
        component={NewOrdersScreen}
        options={{
          tabBarLabel: 'New',
        }}  />
      <Tab.Screen
        name="PendingOrdersScreen"
        component={PendingOrdersScreen}
        options={{
          tabBarLabel: 'Pending',
        }} />
      <Tab.Screen
        name="CompletedOrdersScreen"
        component={CompletedOrdersScreen}
        options={{
          tabBarLabel: 'Completed',
        }} />
    </Tab.Navigator>
  );
}

function OrderStack() {
  return (
      <TabStack></TabStack>
  );
}

export default OrderStack;