import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const useStyles = makeStyles((theme) => ({
    catform: {
        textAlign: "left",
        margin: "20px"
    },
    flexBox: {
        flex: 1
    },
    flexRow: {
        display: "flex"
    },
    inputWith: {
        width: "250px",
        backgroundColor: "lightgrey"
    },
    inputWithDateTime: {
        width: "255px",
        backgroundColor: "lightgrey"
    },
    select: {
        width: "257px",
        height: "25px",
        borderRadius: 0,
        backgroundColor: "lightgrey",
        padding: '10px'
    },
    picture: {
        height: "100px",
        display: "inline",
    },
    formField: {
        paddingTop: "10px"
    },
    label: {
        width: "150px",
        display: "inline-block"
    },
    imgPlaceHolder: {
        width: "100px",
        height: "100px",
        borderStyle: "solid",
        display: "inline-block",
        marginRight: "-2px",
    },
    imgPlaceHolderPlaceholder: {
        marginTop: "20px"
    },
    saveButton: {
        height: "101px",
        marginTop: "74px",
        width: "300px",
        fontSize: "24px",
        borderRadius: 0,
        backgroundColor: "grey",
    }
}));
const containerStyle = {
    width: '300px',
    height: '300px'
};

const colors = ["black", "white", "grey", "blue", "brown", "cinnamon", "cream"]
const ages = ["kitten", "young", "old"]
const activities = ["sleeping", "maintaining anal hygiene", "maintaining fur hygiene", "watching", "playing", "acting scared", "acting weird", "looking grumpy", "eating", "drinking", "hunting"]
const quantumStates = ["alive", "dead", "both", "neither"]

const CatForm = ({ onSubmit, initialValues = {
    spotter: "",
    breed: "",
    activity: "",
    age: "",
    color: [],
    quantumState: "",
    datetime: "",
    lat: 47.48790873591885,
    lng: 19.040234582753975
} }) => {

    useEffect(() => { }, [initialValues])
    const classes = useStyles();

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
            resetForm(initialValues)
        },
    });

    const handleOnClick = ({ latLng }) => {
        formik.setFieldValue("lat", latLng.lat())
        formik.setFieldValue("lng", latLng.lng())
    }
    return (
        <form className={classes.catform} onSubmit={formik.handleSubmit}>
            <div className={classes.flexRow}>
                <div className={classes.flexBox}>
                    <div className={classes.formField}>
                        <div className={classes.label}>Spotter</div>
                        <input
                            id="spotter"
                            name="spotter"
                            variant="outlined"
                            className={classes.inputWith}
                            label="Spotter"
                            onChange={formik.handleChange}
                            value={formik.values.spotter}
                        />
                    </div>

                    <div className={classes.formField}>
                        <div className={classes.label}>Breed</div>
                        <input
                            id="breed"
                            name="breed"
                            variant="outlined"
                            className={classes.inputWith}
                            label="Breed"
                            onChange={formik.handleChange}
                            value={formik.values.breed}
                        />
                    </div>

                    <div className={classes.formField}>
                        <div className={classes.label}>Spotted at</div>
                        <input
                            id="datetime"
                            name="datetime"
                            type="datetime-local"
                            value={formik.values.inputWithDateTime}
                            onChange={formik.handleChange}
                            className={classes.inputWith}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>


                    <div className={classes.formField}>
                        <div className={classes.label}>Age</div>

                        <Select
                            id="age"
                            name="age"
                            variant="outlined"
                            className={classes.select}
                            value={formik.values.age}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="">
                                <em>Unknown</em>
                            </MenuItem>
                            {ages.map(age => <MenuItem key={age} value={age}>{age}</MenuItem>)}
                        </Select>
                    </div>


                    <div className={classes.formField}>
                        <div className={classes.label}>Activity</div>
                        <Select
                            id="activity"
                            name="activity"
                            variant="outlined"
                            className={classes.select}
                            value={formik.values.activity}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="">
                                <em>Unknown</em>
                            </MenuItem>
                            {activities.map(activity => <MenuItem key={activity} value={activity}>{activity}</MenuItem>)}
                        </Select>


                    </div>

                    <div className={classes.formField}>
                        <div className={classes.label}>Color</div>

                        <Select
                            id="color"
                            name="color"
                            variant="outlined"
                            className={classes.select}
                            value={formik.values.color}
                            multiple
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="">
                                <em>Unknown</em>
                            </MenuItem>
                            {colors.map(color => <MenuItem key={color} value={color}>{color}</MenuItem>)}
                        </Select>
                    </div>

                    <div className={classes.formField}>
                        <div className={classes.label}>Quantum state</div>

                        <Select
                            id="quantumState"
                            name="quantumState"
                            variant="outlined"
                            className={classes.select}
                            value={formik.values.quantumState}
                            onChange={formik.handleChange}
                        >
                            {quantumStates.map(quantumState => <MenuItem key={quantumState} value={quantumState}>{quantumState}</MenuItem>)}
                        </Select>
                    </div>

                    <div className={classes.formField}>
                        <div className={classes.label}>Lat</div>
                        <input
                            id="lat"
                            name="lat"
                            type="lat"
                            value={formik.values.lat}
                            onChange={formik.handleChange}
                            className={classes.inputWith}
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.label}>Lng</div>
                        <input
                            id="lng"
                            name="lng"
                            type="lng"
                            value={formik.values.lng}
                            onChange={formik.handleChange}
                            className={classes.inputWith}
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.flexBox}>
                    <LoadScript
                        googleMapsApiKey="AIzaSyDwtomCxbvfOQ1pLTrakJSb-Ymwsdxz77w"
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{
                                lng: formik.values.lng,
                                lat: formik.values.lat
                            }}
                            zoom={10}
                            onClick={handleOnClick}
                        > <></>
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
            <div className={classes.flexRow}>
                <div className={classes.flexBox}>

                    <h2>Was the cat like this?</h2>
                    <div className={classes.imgPlaceHolderPlaceholder}>
                        <div className={classes.imgPlaceHolder}>
                            {formik.values.age && <img className={classes.picture} src={`${process.env.PUBLIC_URL}/age/${formik.values.age}.jpg`} />}
                        </div>
                        <div className={classes.imgPlaceHolder}>
                            {formik.values.activity && <img className={classes.picture} src={`${process.env.PUBLIC_URL}/activity/${formik.values.activity.split(" ").join("")}.jpg`} />}
                        </div>
                        <div className={classes.imgPlaceHolder}>
                            {formik.values.color.length > 0 && <img className={classes.picture} src={`${process.env.PUBLIC_URL}/color/${formik.values.color[0]}.jpg`} />}
                        </div>
                        <div className={classes.imgPlaceHolder}>
                            {formik.values.quantumState && <img className={classes.picture} src={`${process.env.PUBLIC_URL}/quantumstate/${formik.values.quantumState}.jpg`} />}
                        </div>
                    </div>
                </div>
                <div className={classes.flexBox}>
                    <Button className={classes.saveButton} type="submit" variant="contained" color="primary">YES! (save the cat)</Button>
                </div>
            </div>

        </form >
    );
}


export default CatForm;