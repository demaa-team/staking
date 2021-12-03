import { FC } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { walletAddressState } from 'store/wallet';
import StatBox from 'components/StatBox';
import { LineSpacer } from 'styles/common';
import StatsSection from 'components/StatsSection';
import useStakingCalculations from 'sections/staking/hooks/useStakingCalculations';
import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';
import useUserStakingData from 'hooks/useUserStakingData';
import { formatFiatCurrency, formatPercent } from 'utils/formatters/number';
import StakedValue from 'sections/shared/modals/StakedValueModal/StakedValueBox';
import ActiveDebt from 'sections/shared/modals/DebtValueModal/DebtValueBox';

import Main from 'sections/merge-accounts';

const MergeAccountsPage: FC = () => {
	const { t } = useTranslation();

	const { stakedCollateralValue, debtBalance } = useStakingCalculations();
	const { selectedPriceCurrency, getPriceAtCurrentRate } = useSelectedPriceCurrency();
	const walletAddress = useRecoilValue(walletAddressState);
	const { stakingAPR } = useUserStakingData(walletAddress);

	return (
		<>
			<Head>
				<title>{t('merge-accounts.page-title')}</title>
			</Head>
			<StatsSection>
				<StakedValue
					title={t('common.stat-box.staked-value')}
					value={formatFiatCurrency(getPriceAtCurrentRate(stakedCollateralValue), {
						sign: selectedPriceCurrency.sign,
					})}
					isGreen
				/>
				<Earning
					title={t('common.stat-box.earning')}
					value={formatPercent(stakingAPR ? stakingAPR : 0)}
					size="lg"
				/>
				<ActiveDebt
					title={t('common.stat-box.active-debt')}
					value={formatFiatCurrency(getPriceAtCurrentRate(debtBalance), {
						sign: selectedPriceCurrency.sign,
					})}
					isGreen
				/>
			</StatsSection>
			<LineSpacer />
			<Main />
		</>
	);
};

const Earning = styled(StatBox)`
	.title {
		color: ${(props) => props.theme.colors.white};
	}
	.value {
		// text-shadow: ${(props) => props.theme.colors.greenTextShadow};
		color: ${(props) => props.theme.colors.white};
	}
`;

export default MergeAccountsPage;
