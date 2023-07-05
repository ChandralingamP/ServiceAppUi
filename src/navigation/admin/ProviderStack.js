import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AvailableProvidersScreen from "../../screens/admin/AvailableProvidersScreen";
import AssignedProvidersScreen from "../../screens/admin/AssignedProvidersScreen";
import ActiveProvidersScreen from '../../screens/admin/ActiveProvidersScreen';
const Tab = createMaterialTopTabNavigator();
function TabStack() {
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
        name="AvailableProvidersScreen"
        component={AvailableProvidersScreen}
        options={{
          tabBarLabel: 'Available',
        }} />
      <Tab.Screen
        name="AssignedProvidersScreen"
        component={AssignedProvidersScreen}
        options={{
          tabBarLabel: 'Assigned',
        }} />
      <Tab.Screen
        name="ActiveProvidersScreen"
        component={ActiveProvidersScreen}
        options={{
          tabBarLabel: 'Active',
        }} />
    </Tab.Navigator>
  );
}

function ProviderStack() {
  return (
    <TabStack></TabStack>
  );
}

export default ProviderStack;