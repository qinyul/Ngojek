import React,{useEffect} from "react";
import {View,Image,StatusBar,Alert} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import logo from '../../assets/logo.png'
import NavOptions from "../../components/navOptions";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_APIKEY} from '@env'
import { useDispatch,useSelector } from "react-redux";
import { setOrigin,setDestination,setCurrentLocation } from "../../slices/navSlices";
import NavFavourites from "../../components/navFavourites";
import * as Location from 'expo-location';

const HomeScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {


        const getCurrentLocation = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync()

            if(status !== 'granted') return Alert.alert('Please Enable GPS Location')

            let {coords} = await Location.getCurrentPositionAsync()
        
            if(!coords) return

            const {latitude,longitude} = coords
        
            let [address] = await Location.reverseGeocodeAsync({latitude,longitude})

            const description = `${address.street}, ${address.district}, ${address.city}, ${address.region}, ${address.country}`

            const location = {
                lat:latitude,
                lng:longitude
            }
            
            dispatch(setCurrentLocation({
                location,
                description
            }))
        }

        getCurrentLocation()
        const currentLocationInterval = setInterval( getCurrentLocation,3000)

        return () => clearInterval(currentLocationInterval)
    },[])

    return(
        <View style={[tw`bg-white h-full`,{paddingTop:StatusBar.currentHeight}]}>
            <View style={tw`p-5`}>
                <Image source={logo} style={{width:100,height:100,resizeMode:'contain'}}/>
                <GooglePlacesAutocomplete 
                    placeholder="Where From?"
                    styles={{
                        container:{
                            flex:0
                        },
                        textInput:{
                            fontSize:18
                        }
                    }}
                    onPress={(data,details = null) => {

                        dispatch(setOrigin({
                            location:details.geometry.location,
                            description:data.description
                        }))

                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    returnKeyType="search"
                    minLength={2}
                    query={{
                        key:GOOGLE_MAP_APIKEY,
                        language:"id"
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    onFail={error => console.log(error)}
                />
                <NavOptions />
                <NavFavourites />
            </View>
        </View>
    )
}

export default HomeScreen