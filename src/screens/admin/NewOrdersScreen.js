import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get } from "../../services/WebServices"
import NewOrdersCard from "../../components/NewOrderCard"
import PopupCard from '../../components/PopupCard'
const NewOrderScreen = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newOrdersData, setNewOrdersData] = useState(null);
  const [orderId, setOrderId] = useState('');
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const updateNewOrdersData = (id) => {
    const newData = newOrdersData?.filter((item) => item.orderId != id);
    setNewOrdersData(newData);
  }
  const getNewOrders = async () => {
    const data = await get('orders/new');
    setNewOrdersData(data);
  }
  useEffect(() => {
    getNewOrders();
  }, [])
  if (newOrdersData) {
    return <View style={{ padding: "3%" }}>
      {newOrdersData?.map((item, key) => {
        return <NewOrdersCard key={key} setOrderId={setOrderId} togglePopup={togglePopup} order={item} />
      })}
      <PopupCard togglePopup={togglePopup} updateNewOrdersData={updateNewOrdersData} orderId={orderId} isPopupVisible={isPopupVisible} />
    </View>
  } else {
    return <View>
      <Text>NewOrderScreen</Text>
    </View>
  }
}

export default NewOrderScreen