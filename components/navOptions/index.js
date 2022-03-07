import React from 'react'
import {View,Text,FlatList,TouchableOpacity,Image} from 'react-native'
import ride from '../../assets/ride.png'
import delivery from '../../assets/delivery-man.png'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../../slices/navSlices'

const NavOptions = () => {

        const data = [
        {id:'123',
         title:'Get a ride',
         image:ride,
         screen:'Map'
        },
        {id:'456',
         title:'Order Food',
         image:delivery,
         screen:'EatScreen'
        }
    ]

    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)

    return(
       <FlatList 
        data={data}
        keyExtractor={(item,i) => i.toString()}
        horizontal 
        renderItem={({item}) => (
            <TouchableOpacity 
                onPress={() => navigation.navigate(item.screen)}
                style={[tw`pl-4 pb-4 pt-4 m-2 w-32 rounded-md`,{backgroundColor:'rgb(247, 101, 56)'}]}
                disabled={!origin}
            >
                <View style={tw`${!origin && "opacity-20"}`}>
                    <Image 
                        source={item.image}
                        style={{width:50,height:50,resizeMode:'contain'}}
                    />
                    <Text style={tw`mt-2 text-sm font-bold`}>{item.title}</Text>
                    <Icon 
                        name="arrowright" 
                        color={'white'} 
                        type='antdesign'
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                    />
                </View>
            </TouchableOpacity>
        )}
       />
    )
}

export default NavOptions