import React from 'react'
import {AutoColumn} from '../../components/Column'
import styled from 'styled-components'
import {STAKING_REWARDS_INFO, useStakingInfo} from '../../state/stake/hooks'
import {ExternalLink, TYPE} from '../../theme'
import PoolCard from '../../components/earn/PoolCard'
import {RowBetween} from '../../components/Row'
import {CardBGImage, CardNoise, CardSection, DataCard} from '../../components/earn/styled'
import {Countdown} from './Countdown'
import Loader from '../../components/Loader'
import {useActiveWeb3React} from '../../hooks'
import {ChainId, Pair, Token, TokenAmount, WETH} from "@uniswap/sdk";
import {ORN, USDT, ZERO_ADDRESS} from "../../constants";

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

const FooterLink = styled.a`
  color: #888;
  
  :hover, :focus, :active {
    color: #888;
  }
`

export default function Earn() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `
  // const p = new Pair(new TokenAmount(ORN, '0'), new TokenAmount(WETH[ChainId.ROPSTEN], '0'),)
  // console.log('AAA', p.liquidityToken.address)

  // const b = new Pair(new TokenAmount(ORN, '0'), new TokenAmount(USDT, '0'));
  // console.log('BBB', b.liquidityToken.address)

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Orion liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your Liquidity Provider tokens to receive ORN, the Orion Protocol token.
                </TYPE.white>
              </RowBetween>{' '}
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://www.orionprotocol.io/"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about ORN</TYPE.white>
              </ExternalLink>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          <Countdown exactEnd={stakingInfos?.[0]?.periodFinish} />
        </DataRow>

        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            stakingInfos?.map(stakingInfo => {
              // need to sort by added liquidity here
              return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
            })
          )}
        </PoolSection>
      </AutoColumn>

      <div style={{position: 'fixed', left: '0', bottom: '16px', paddingLeft: '16px', fontSize: '10px', color: '0x888'}}>
        View source code on <FooterLink href="https://github.com/orionprotocol/orn-liquidity-mining-ui" target="_blank">GitHub</FooterLink>. Based on <FooterLink href="https://github.com/Uniswap/uniswap-interface" target="_blank">uniswap-interface</FooterLink>.
      </div>
    </PageWrapper>
  )
}
