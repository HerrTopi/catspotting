import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getCats, saveCat } from '../../redux/actions/cats'
import { makeStyles } from '@material-ui/core/styles';
import CatForm from './CatForm';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const center = {
    lat: 47.48790873591885,
    lng: 19.040234582753975
};
const containerStyle = {
    width: '900px',
    height: '400px',
    marginTop: "20px",
    marginBottom: "20px"
};
const useStyles = makeStyles((theme) => ({
    catList: {
        margin: "auto",
        width: "900px",
        minHeight: "100vh",
        textAlign: "center",
        background: "rgb(242,242,242)"
    },
    infoWindow: {
        textAlign: "left",
    },
    infoWindowRowKey: {
        width: "100px",
        display: "inline-block",
        fontWeight: "bold"
    },
    infoWindowRowValue: {
        width: "100px",
        display: "inline"
    }
}));
const CatList = ({ cats, getCats, saveCat }) => {
    useEffect(() => {
        getCats()
    }, [getCats]);

    const classes = useStyles();

    const [selectedCenter, setSelectedCenter] = useState(null);
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearch = () => {
        getCats(searchTerm)
    }

    return (
        <div className={classes.catList}>
            <h1 style={{ marginTop: 0 }}>SPOTTED A CAT?</h1>
            <CatForm onSubmit={saveCat}></CatForm>
            <h1>SEARCH FOR CATS</h1>
            <input value={searchTerm} onChange={handleSearchTerm}></input>
            <button onClick={handleSearch}>Search</button>

            <LoadScript
                googleMapsApiKey="AIzaSyDwtomCxbvfOQ1pLTrakJSb-Ymwsdxz77w"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {cats.map(cat => (
                        <Marker
                            key={cat.id}
                            position={{
                                lat: cat.location.latitude,
                                lng: cat.location.longitude
                            }}
                            onClick={() => {
                                setSelectedCenter(cat.location);
                            }}
                            icon={{
                                url: `${process.env.PUBLIC_URL}/icon.png`
                            }}
                        >
                            {(selectedCenter && selectedCenter.latitude === cat.location.latitude &&
                                selectedCenter.longitude === cat.location.longitude) && (
                                    <InfoWindow
                                        onCloseClick={() => {
                                            setSelectedCenter(null);
                                        }}
                                        position={{
                                            lat: parseFloat(selectedCenter.latitude),
                                            lng: parseFloat(selectedCenter.longitude)
                                        }}
                                    >
                                        <div className={classes.infoWindow}>
                                            <h3>Cat data</h3>
                                            <div><div className={classes.infoWindowRowKey}> Spotter: </div> <div className={classes.infoWindowRowValue}>{cat.spotter}</div></div>
                                            <div><div className={classes.infoWindowRowKey}> Breed: </div> <div className={classes.infoWindowRowValue}>{cat.breed}</div></div>
                                            <div><div className={classes.infoWindowRowKey}> Spotted at: </div> <div className={classes.infoWindowRowValue}>{cat.datetime}</div></div>
                                            <div><div className={classes.infoWindowRowKey}> Age: </div> <div className={classes.infoWindowRowValue}>{cat.age}</div></div>
                                            <div><div className={classes.infoWindowRowKey}> Activity: </div> <div className={classes.infoWindowRowValue}>{cat.activity}</div></div>
                                            <div><div className={classes.infoWindowRowKey}> Quantum state: </div> <div className={classes.infoWindowRowValue}>{cat.quantumState}</div></div>
                                            <div><div className={classes.infoWindowRowKey}> Color: </div> <div className={classes.infoWindowRowValue}>{cat.color.join(", ")}</div></div >
                                            <div><div className={classes.infoWindowRowKey}> Location: </div> <div className={classes.infoWindowRowValue}>{`${cat.location.latitude}, ${cat.location.longitude}`}</div></div >
                                        </div >
                                    </InfoWindow >
                                )}
                        </Marker >
                    ))}
                </GoogleMap >
            </LoadScript >

            <table>
                <tbody>
                    <tr><th>Spotter</th><th>Color</th><th>Breed</th><th>Age</th><th>Activity</th><th>Quantum state</th><th>Location</th></tr>
                    {cats.map(cat => (
                        <tr key={cat.id}>
                            <td>{cat.spotter}</td>
                            <td>{cat.color.join(", ")}</td>
                            <td>{cat.breed}</td>
                            <td>{cat.age}</td>
                            <td>{cat.activity}</td>
                            <td>{cat.quantumState}</td>
                            <td> <a target="_blank" href={`https://maps.google.com/?ll=${cat.location.latitude},${cat.location.longitude}`}>map</a> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}


const mapStateToProps = ({ cats }) => {
    return {
        cats: cats.cats
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCats: (searchTerm) => {
            dispatch(getCats(searchTerm))
        },
        saveCat: (cat) => {
            dispatch(saveCat(cat))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatList)