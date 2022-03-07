import { useNavigation } from "@react-navigation/native";
import React,{useState} from "react";
import {View,Text,SafeAreaView,TouchableOpacity,FlatList,Image} from 'react-native'
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import motorcycle from '../../assets/motorcycle.png'
import car from '../../assets/car.png'
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../../slices/navSlices";
import "intl";
import "intl/locale-data/jsonp/id-ID";

const RideOptionsCard = () => {

    const navigation = useNavigation()
    const [selected,setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)

    const data = [
        {
            id:'MT-123',
            title:'Motorcycle',
            multiplier:1,
            image:motorcycle
        },
        {
            id:'CR-123',
            title:'Car',
            multiplier:1.5,
            image:car
        }
    ]

    const SURGE_CHARGE_RATE = 2

    return(
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    style={[tw`absolute top-3 left-5 p-3 rounded-full`,{zIndex:4}]}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-base`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList 
                data={data}
                keyExtractor={(item,i) => i.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        style={tw`flex-row justify-between items-center px-5 py-5 my-5 ${item.id === selected?.id && 'bg-gray-200'}`}
                        onPress={() => setSelected(item)}    
                    >
                        <Image 
                            style={{
                                width:50,
                                height:50,
                                resizeMode:'contain'
                            }}
                            source={item.image}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-base font-semibold`}>{item.title}</Text>
                            <Text>{travelTimeInformation?.duration?.text}</Text>
                        </View>
                        <Text style={tw`text-base`}>
                            {
                                new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                                    (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier) * 10
                                )
                            }    
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                    style={tw`bg-black py-3 ${!selected && 'bg-gray-300'}`}
                    disabled={!selected}
                >
                    <Text style={tw`text-center text-white text-base`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard