import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { LineSpacer } from 'styles/common';
import StatsSection from 'components/StatsSection';
import { formatFiatCurrency, formatPercent } from 'utils/formatters/number';

import Main from 'sections/staking';
import useStakingCalculations from 'sections/staking/hooks/useStakingCalculations';
import StakedValue from 'sections/shared/modals/StakedValueModal/StakedValueBox';
import ActiveDebt from 'sections/shared/modals/DebtValueModal/DebtValueBox';

import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';

import { isWalletConnectedState } from 'store/wallet';

import StatBox from 'components/StatBox';
import ProgressBar from 'components/ProgressBar';

const StakingPage = () => {
	const { t } = useTranslation();
	const {
		stakedCollateralValue,
		percentageCurrentCRatio,
		debtBalance,
		percentCurrentCRatioOfTarget,
	} = useStakingCalculations();
	const { selectedPriceCurrency, getPriceAtCurrentRate } = useSelectedPriceCurrency();
	const isWalletConnected = useRecoilValue(isWalletConnectedState);

	return (
		<>
			<Head>
				<title>{t('staking.page-title')}</title>
			</Head>
			<StatsSection>
				<StakedValue
					title={t('common.stat-box.staked-value')}
					value={formatFiatCurrency(getPriceAtCurrentRate(stakedCollateralValue), {
						sign: selectedPriceCurrency.sign,
					})}
				/>
				<CRatio
					title={t('common.stat-box.c-ratio')}
					value={isWalletConnected ? formatPercent(percentageCurrentCRatio) : '-%'}
					size="lg"
				>
					<CRatioProgressBar
						variant="blue-pink"
						percentage={percentCurrentCRatioOfTarget.toNumber()}
					/>
				</CRatio>
				<ActiveDebt
					title={t('common.stat-box.active-debt')}
					value={formatFiatCurrency(getPriceAtCurrentRate(debtBalance), {
						sign: selectedPriceCurrency.sign,
					})}
					isPink
				/>
			</StatsSection>
			<LineSpacer />
			<Main />
		</>
	);
};

const CRatio = styled(StatBox)`
	.value {
		// text-shadow: ${(props) => props.theme.colors.blueTextShadow};
		// color: ${(props) => props.theme.colors.black};
		font-size: 2.4rem;
		font-family: FZDaHei-B02;
		font-weight: 400;
		color: #FFFFFF;
	}
`;

export const CRatioProgressBar = styled(ProgressBar)`
		height: 0.8rem;
		width: 100%;
		transform: translateY(0.6rem);
		max-width: 19.1rem;
		border-radius:0.35rem
`;

export default StakingPage;
