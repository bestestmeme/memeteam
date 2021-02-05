import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import { abbreviateAddress } from '../../web3/utils'

export default function CardRatingBar({ rating, proposer }) {
  const proposerShorthand = proposer ? abbreviateAddress(proposer) : 'Unknown'
  return (
    <div className="rating-container">
      <div className="posted">
        <p>Posted by</p>
        <Link to="/" target="_blank">
          {proposerShorthand.toUpperCase()}
        </Link>
      </div>
      <div className="rating">
        <div className="rate-icon">❤</div>
        <p>{rating === 'NaN' ? 0 : rating}</p>
      </div>
    </div>
  )
}
