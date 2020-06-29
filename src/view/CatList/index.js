import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getCats, saveCat } from '../../redux/actions/cats'
import { makeStyles } from '@material-ui/core/styles';
import CatForm from './CatForm';

const useStyles = makeStyles((theme) => ({
    catList: {
        margin: "auto",
        width: "900px",
        textAlign: "center",
        background: "rgb(242,242,242)"
    },
}));
const CatList = ({ cats, getCats, saveCat }) => {
    useEffect(() => {
        getCats()
    }, [getCats]);

    const classes = useStyles();

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearch = () => {
        getCats(searchTerm)
    }

    return (
        <div className={classes.catList}>
            <h1>SPOTTED A CAT?</h1>
            <CatForm onSubmit={saveCat}></CatForm>
            <h1>SEARCH FOR CATS</h1>
            <input value={searchTerm} onChange={handleSearchTerm}></input>
            <button onClick={handleSearch}>Search</button>

            <table>
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
            </table>
        </div>
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