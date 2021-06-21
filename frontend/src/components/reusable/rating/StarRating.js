import React, { useState } from 'react'

// require state in parent component
//      const [ clickRate, setClickRate ] = useState(null)
//      <StarRating clickRate={clickRate} setClickRate={setClickRate} />


const StarIcon = props => {

    const { hoverRate, setHoverRate, clickRate, setClickRate, rating } = props

    const MouseEnterHandler = () => {
        setHoverRate(rating)
    }

    const MouseLeaveHandler = () => {
        setHoverRate(null)
    }

    const ClickHandler = () => {
        setClickRate(rating)
    }

    const star = ( hoverRate >= rating || clickRate >= rating ) ? 'star' : 'star_outline'

    return (
        <span 
        className="material-icons" 
        id={rating}
        onMouseEnter={MouseEnterHandler}
        onMouseLeave={MouseLeaveHandler}
        onClick={ClickHandler}
        >{ star }</span>
    );
}

const StarRating = props => {

    const [ hoverRate, setHoverRate ] = useState(null)

    return (
        [1,2,3,4,5].map(rating => {
            return <StarIcon key={rating} rating={rating} hoverRate={hoverRate} setHoverRate={setHoverRate} {...props} />
        })
    )
}

export default StarRating