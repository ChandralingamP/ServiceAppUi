
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AssignedProviderCard from "../../components/AssignedProviderCard"
import { useGlobalContext } from '../../context/GlobalContext'
const AssignedProvidersScreen = () => {
  const { assignedProviderData,getAssignedProviders } = useGlobalContext();
  useEffect(() => {
    getAssignedProviders();
  }, [])
  if (assignedProviderData.length) {
    return <View style={{ padding: "3%" }}>
      {assignedProviderData?.map((item, key) => {
        return <AssignedProviderCard key={key} provider={item} />
      })}
    </View>
  } else {
    return <View>
      <Text>Available</Text>
    </View>
  }
}

export default AssignedProvidersScreen