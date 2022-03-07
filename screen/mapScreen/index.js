import React from "react";
import {View,Text,TouchableOpacity} from 'react-native'
import tw from "tailwind-react-native-classnames";
import Map from "../../components/map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../../components/navigateCard";
import RideOptionsCard from "../../components/rideOptionsCard";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { selectFocusOnUser, setFocusOnUser } from "../../slices/navSlices";

const MapScreen = () => {

    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch()
    const focusOnUser = useSelector(selectFocusOnUser)
    const navigation = useNavigation()

    return(
        <View style={{flex:1}}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
            >
                <Icon name="menu"/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => dispatch(setFocusOnUser(!focusOnUser))}
                style={tw`${focusOnUser ? 'bg-blue-400' : 'bg-gray-100'} absolute top-32 left-8 z-50 p-3 rounded-full shadow-lg`}
            >
                <Icon name="navigation" type="feather"/>
            </TouchableOpacity>
           <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="NavigateCard" 
                        component={NavigateCard} 
                        options={{headerShown:false}} 
                    />   
                    <Stack.Screen 
                        name="RideOptionsCard" 
                        component={RideOptionsCard} 
                        options={{headerShown:false}} 
                    />   
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen