import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';
import NavBar from './NavBar';
var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIATWHP2O5ZIHUYX4RT", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
  
let docClient = new AWS.DynamoDB.DocumentClient();
const containerStyle = {
    width: 'calc(100vh)',
    height: 'calc(100vh - 85px)',
    float: 'right',
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

function Home() {
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDk7tn9tpSTXL0dwRxX9KnVmK9-GzwANQE"
})

// eslint-disable-next-line
const [map, setMap] = React.useState(null)

const onLoad = React.useCallback(function callback(map) {
    var mail = JSON.parse(localStorage.getItem("email"));
    console.log(mail);
    var params = {
        TableName: "FoodForThoughtDB",
        Key: {
        "email": mail
        }
        
    };
    let result = null;
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            result = (JSON.stringify(data, null, 2));
            const tempObj = JSON.parse(result);
            let name = tempObj;
            localStorage.setItem("name", JSON.stringify(name.Item.name));
            console.log(name.Item.name+" name");
            var params = {
                TableName: "Markers",
                Key: {
                "name": name.Item.name
                }
            };
            result = null;
            docClient.get(params, function (err, data) {
                if (err) {
                    console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
                }
                else {
                    result = (JSON.stringify(data, null, 2));
                    const tempObj = JSON.parse(result)
                    var center = {lat: tempObj.Item.latitude, lng: tempObj.Item.longitude}
                    localStorage.setItem("pos", JSON.stringify(center));
                    const bounds = new window.google.maps.LatLngBounds(center);
                    map.fitBounds(bounds);
                    setMap(map)
                    const infoWindow = new window.google.maps.InfoWindow();
                    var params = {
                        TableName: "Markers"
                    }
                    docClient.scan(params, function (err,data){
        
                        let temp = JSON.stringify(data, null, 2);
                        
                        const secondObj = JSON.parse(temp);
                        console.log(secondObj)
                        secondObj.Items.forEach((item, i) =>{
                            const marker = new window.google.maps.Marker({
                                position: {lat: item.latitude, lng: item.longitude},
                                map,
                                title: item.name+"'s location",
        
                            });
                            
                            marker.addListener("click", () => {
                                infoWindow.close();
                                infoWindow.setContent(marker.getTitle());
                                infoWindow.open(marker.getMap(), marker);
                              });
                        })
                        
                    })
                }
            })
        }
        
    })
    
    
}, [])

const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
}, [])

return isLoaded ? (
    <><h1>
        Home
    </h1><>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position:'absolute', top:'16.69%', left:'-25%', width:'100%'}}>
    <h1>Food for thought</h1>
    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position:'absolute', top:'25.69%', left:'2.5%', width:'45%', flexDirection:'column'}}>
    <b>FoodForThought is a service that connects those in need of food to those with an excess of it.
        Use the search tab to find a particular food, and use the map on the right to find other users in your area.
        This can help you find pick up points for food. Declare your wishlist, and view what other users have!

        FoodForThought is here to revolutionize the way humanity distributes food.
    </b>
    </div>
    <><GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
    >
        {/* Child components, such as markers, info windows, etc. */}
    <></>
    </GoogleMap>
        <div /></><NavBar />
        </></>


) : <></>
}

export default Home