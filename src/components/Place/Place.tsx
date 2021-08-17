import React from 'react'

type PlaceProps = {
    // place: {
    //     name: string
    // }
    place: any
}

const Place: React.FC<PlaceProps> = ({ place }) => {
    return (
        <h1>{place.name}</h1>
    )
}

export default Place
