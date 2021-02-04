import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import { GET_BALANCES_RETURNED, NOW_TIMESTAMP_UPDATED } from '../../web3/constants'
import Store from '../../stores'
import { abbreviateAddress, getDisplayableAmountFromMinUnit } from '../../web3/utils'
import { campaignConfig } from '../../campaign.config'

import './styles.css'
import { Link } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Unlock from '../../containers/Unlock'

const store = Store.store
const emitter = Store.emitter

class Header extends PureComponent {
  state = {}

  componentDidMount() {
    emitter.on(GET_BALANCES_RETURNED, this.balancesReturned)
    emitter.on(NOW_TIMESTAMP_UPDATED, this.updateNow)
  }

  componentWillUnmount() {
    emitter.removeListener(GET_BALANCES_RETURNED, this.balancesReturned)
    emitter.removeListener(NOW_TIMESTAMP_UPDATED, this.updateNow)
  }

  balancesReturned = () => {
    this.setState({ redraw: true })
  }

  updateNow = () => {
    let now = store.getStore('now')
    this.setState({ now })
  }

  handleGoToStake = () => {
    const { history } = this.props
    history.replace('/stake')
  }

  render() {
    const account = store.getStore('account')
    const wallet = abbreviateAddress(account.address)

    const token = store.getYFLToken()
    const balance = getDisplayableAmountFromMinUnit(token.balance, token.decimals, 1)
    const stakedBalance = getDisplayableAmountFromMinUnit(token.stakedBalance, token.decimals, 1)
    const { now } = this.state
    const { currentCampaignEndBlock, currentCampaignStartBlock } = campaignConfig
    return (
      <div className="header">
        <div className="submit-button">
          <Button className="button-main" href="/#/create">
            submit your meme
          </Button>
        </div>
        {token && account && account.address ? (
          <div className="account">
            <div className="balance">
              YFL: {balance}, {stakedBalance} staked
            </div>
            <div className="address">{wallet}</div>
          </div>
        ) : (
          <div className="account">
            <Unlock redirectUrl="/" title="Unconnected" />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
