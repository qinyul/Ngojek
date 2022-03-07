import React,{useRef,useEffect} from "react";
import {View,Text} from 'react-native'
import tw from "tailwind-react-native-classnames";
import MapView,{Marker} from 'react-native-maps';
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation,selectFocusOnUser } from "../../slices/navSlices";
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_MAP_APIKEY} from '@env'


const Map = () => {

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const focusOnUser = useSelector(selectFocusOnUser)
    const mapRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!origin || !destination) return

        mapRef.current.fitToSuppliedMarkers(['origin','destination'],{
            edgePadding:{top:50, right:50,bottom:50,left:50}
        })
    ,[origin,destination]})

    useEffect(() => {
        if(!origin || !destination) return

        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAP_APIKEY}`
            )
             .then(res => res.json())
             .then((data) => {
                 dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
             })
        }

        getTravelTime()
    },[origin,destination,GOOGLE_MAP_APIKEY])

    const mapChangeLocationHandler = (coordinate) => {

        if(!focusOnUser) return

        return mapRef.current.animateToRegion({
            latitude:coordinate.latitude,
            longitude:coordinate.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        })
    }
    
    return(
        <View style={{width:'100%',height:'100%'}}>
            <MapView
                ref={mapRef}
                style={{flex:1}}
                initialRegion={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onUserLocationChange={locationChange => mapChangeLocationHandler(locationChange.nativeEvent.coordinate)}
            >   
                {
                    origin && destination && (
                        <MapViewDirections
                           origin={{ latitude: origin.location.lat,
                                     longitude:origin.location.lng
                                   }}
                           destination={{ latitude: destination.location.lat,
                                          longitude:destination.location.lng
                                        }}
                           apikey={GOOGLE_MAP_APIKEY}
                           strokeWidth={7}
                           strokeColor="rgb(22, 137, 244)"
                           precision="high"
                        />
                    )
                }
                {
                    origin?.location && (
                        <Marker 
                            coordinate={{
                                latitude: origin.location.lat,
                                longitude:origin.location.lng
                            }}
                            title="Origin"
                            description={origin.description}
                            identifier="origin"
                        />
                    )
                }
                {
                    destination?.location && (
                        <Marker 
                            coordinate={{
                                latitude: destination.location.lat,
                                longitude:destination.location.lng
                            }}
                            pinColor={'rgb(22, 137, 244)'}
                            title="Destination"
                            description={destination.description}
                            identifier="destination"
                        />
                    )
                }
            </MapView>
        </View>
    )
}

export default Map