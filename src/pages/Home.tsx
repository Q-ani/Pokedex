import React, {ChangeEvent, useState} from 'react'
import {Container, Grid, InputAdornment, TextField, Typography, Box, Button, IconButton, Collapse} from '@mui/material'
import PokemonCard from '../components/PokemonCard'
import {Field, PokemonType, usePokemonContext} from '../components/Contexts/PokemonProvider'
import {Search, FavoriteBorder, Favorite, Close} from '@mui/icons-material'
import PokemonTypeIcon from "../components/PokemonTypeIcon";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const Home: React.FC = () => {
    const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false)
    const {
        pokemon,
        query,
        search,
        favourites,
        addFavourite,
        removeFavourite,
        filters,
        addFilter,
        removeFilter,
        types,
        addType,
        removeType,
        clearTypes
    } = usePokemonContext()

    function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
        search(event.target.value)
    }

    const handleToggleFavourites = () => {
        if (filters[Field.favourite]) {
            removeFilter(Field.favourite)
        } else {
            addFilter(Field.favourite, true)
        }
    }

    // handle types
    const handleTypes = (type: string) => {
        if (types.includes(type)) {
            removeType(type)
        } else {
            addType(type)
        }
    }
    // handle toggle search by types button
    const handleToggleTypes = () => {
        if (isTypeOpen) {
            clearTypes()
        }
        setIsTypeOpen(!isTypeOpen)
    }

    return (
        <Container maxWidth="lg" sx={{py: 2}}>
            <Typography variant="h1">What Pokemon <br/>are you looking for?</Typography>
            <Box
                sx={{
                    display: 'flex',
                    pt: 4,
                    pb: 2
                }}
            >
                <TextField
                    id="pokemon-search"
                    placeholder="Search Pokemon"
                    variant="outlined"
                    value={query}
                    onChange={handleQueryChange}
                    InputProps={{
                        sx: {pr: 0},
                        startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => search('')}><Close/></IconButton>
                        </InputAdornment>
                    }}
                />
                <Button
                    sx={{
                        flexShrink: 0,
                        ml: '2rem'
                    }}
                    startIcon={<CatchingPokemonIcon/>}
                    color={isTypeOpen ? "primary" : "secondary"}
                    onClick={() => handleToggleTypes()}
                >
                    Search by Types
                </Button>
                <Button
                    startIcon={filters[Field.favourite]
                        ? <Favorite/>
                        : <FavoriteBorder/>
                    }
                    color={filters[Field.favourite] ? 'primary' : 'secondary'}
                    sx={{
                        flexShrink: 0,
                        ml: '2rem'
                    }}
                    onClick={handleToggleFavourites}
                >
                    My Favourites ({favourites.length})
                </Button>
            </Box>

            {/*filter by types*/}
            <Collapse in={isTypeOpen}>
                <Grid
                    container
                    justifyContent={"space-between"}
                    sx={{pb:2}}
                >
                    {Object.values(PokemonType).map(type => (
                        <Button
                            key={type}
                            startIcon={<PokemonTypeIcon type={type}/>}
                            onClick={() => handleTypes(type)}
                            color={(types.includes(type) ? "primary" : "secondary")}
                            size="medium"
                            sx={{m: "0.3rem"}}
                        >
                            {type}
                        </Button>
                    ))}
                </Grid>
            </Collapse>


            <Grid container spacing={2}>
                {pokemon.map((pokemon) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={pokemon.name}
                    >
                        <PokemonCard
                            pokemon={pokemon}
                            isFavourite={favourites.includes(pokemon.name)}
                            onAddFavourite={() => addFavourite(pokemon)}
                            onRemoveFavourite={() => removeFavourite(pokemon)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Home