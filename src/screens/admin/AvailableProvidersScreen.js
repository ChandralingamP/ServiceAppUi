import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { get } from "../../services/WebServices"
import AvailableProviderCard from "../../components/AvailableProviderCard"
import { useGlobalContext } from '../../context/GlobalContext'
const AvailableProvidersScreen = () => {
  const { availableProviderData, getAvailableProviders } = useGlobalContext();
  useEffect(() => {
    getAvailableProviders();
  }, [])
  if (availableProviderData.length) {
    return <View style={{ padding: "3%" }}>
      {availableProviderData?.map((item, key) => {
        return <AvailableProviderCard key={key} provider={item} />
      })}
    </View>
  } else {
    return <View>
      <Text>Available</Text>
    </View>
  }
}

export default AvailableProvidersScreen