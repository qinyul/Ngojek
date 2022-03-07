import React from 'react'
import {View,Text,FlatList,TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { useSelector,useDispatch } from 'react-redux'
import { selectCurrentLocation,setOrigin } from '../../slices/navSlices'
import { useNavigation } from '@react-navigation/native'

const NavFavourites = () => {
    
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const currentLocation = useSelector(selectCurrentLocation)

    const data = [
        {
         id:'123',
         icon:'home',
         location:'Home',
         destination:'Tegal,Jawa Tengah'
        },
        {
         id:'456',
         icon:'briefcase',
         location:'Work',
         destination:'Kebagusan,Jakarta'
        },
        {
         id:'789',
         icon:'pin-outline',
         location:'Current Location',
         destination:currentLocation?.description
        }
    ]
      
    return(
        <View>
            <FlatList 
                data={data}
                keyExtractor={(item,i) => i.toString()}
                ItemSeparatorComponent={() => (
                    <View style={[tw`bg-gray-200`,{height:0.5}]}></View>
                )}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        style={tw`flex-row items-center p-5`}
                        onPress={() => {
                  
                            if(item.icon !== 'pin-outline') return
                            dispatch(setOrigin({
                                location:currentLocation.location,
                                description:currentLocation.description
                            }))
                            navigation.navigate('Map')
                        }}
                    >
                        <Icon 
                            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                            name={item.icon}
                            type="ionicon"
                            color="white"
                            size={18}
                        />
                         <View>
                            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
                            <Text style={tw`text-gray-500`}>{item.destination}</Text>
                        </View>
                    </TouchableOpacity>
                   
                )}
            />
        </View>
    )
}

export default NavFavourites