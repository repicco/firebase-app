import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { FormLogin } from '../page/FormLogin/FormLogin';
import { CameraApp } from '../page/CameraApp/CameraApp';

const Tab = createBottomTabNavigator();

function PersonTabBarIcon({ color, size }: { color: string; size: number }) {
  return <Ionicons name="person-outline" color={color} size={size} />;
}

function CameraTabBarIcon({ color, size }: { color: string; size: number }) {
  return <Ionicons name="camera-outline" color={color} size={size} />;
}

export function BottomTabRoute() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={FormLogin}
        options={{
          tabBarLabel: 'Formulário',
          tabBarIcon: PersonTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraApp}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: CameraTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
}
