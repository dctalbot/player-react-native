import React from 'react'
import { BottomTabBar, BottomTabBarProps } from 'react-navigation-tabs'
import { useTheme } from '../../styles/theming'

export default function TabBarComponent(props: BottomTabBarProps) {
  const theme = useTheme()

  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.activeTintColor}
      inactiveTintColor={theme.inactiveTintColor}
      inactiveBackgroundColor={theme.primary}
      activeBackgroundColor={theme.activeBackgroundColor}
      style={{ backgroundColor: theme.primary }}
    />
  )
}