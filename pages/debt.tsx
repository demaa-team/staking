import { FC, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import last from 'lodash/last';

import { FlexDivCol, LineSpacer ,FlexDivColCentered,FlexDivRow} from 'styles/common';
import StatBox from 'components/StatBox';
import useUserStakingData from 'hooks/useUserStakingData';
import UIContainer from 'containers/UI';

import { formatFiatCurrency } from 'utils/formatters/number';
import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';

import useHistoricalDebtData from 'hooks/useHistoricalDebtData';
import Main from 'sections/debt';
import ActiveDebt from 'sections/shared/modals/DebtValueModal/DebtValueBox';
import useSynthetixQueries from 'demaa-queries';
import { useRecoilValue } from 'recoil';
import { walletAddressState } from 'store/wallet';
import { wei } from '@synthetixio/wei';

const DashboardPage: FC = () => {
	const { t } = useTranslation();
	const { selectedPriceCurrency, getPriceAtCurrentRate } = useSelectedPriceCurrency();

	const walletAddress = useRecoilValue(walletAddressState);

	const { useSynthsBalancesQuery } = useSynthetixQueries();

	const { debtBalance: actualDebt } = useUserStakingData(walletAddress);
	const synthsBalancesQuery = useSynthsBalancesQuery(walletAddress);
	const { setTitle } = UIContainer.useContainer();
	const historicalDebt = useHistoricalDebtData(walletAddress);

	const totalSynthValue = synthsBalancesQuery.isSuccess
		? synthsBalancesQuery.data?.totalUSDBalance ?? wei(0)
		: wei(0);

	const dataIsLoading = historicalDebt?.isLoading ?? false;
	const issuedDebt = dataIsLoading ? wei(0) : wei(last(historicalDebt.data)?.issuanceDebt ?? 0);

	// header title
	useEffect(() => {
		setTitle('staking', 'debt');
	}, [setTitle]);

	return (
		<>
			<Head>
				<title>{t('debt.page-title')}</title>
			</Head>
			<FlexDivRow>
				<Content>
					{/* <LineSpacer /> */}
					<Main />
				</Content>
				<StatsSection>
					<IssuedDebt
						title={t('common.stat-box.issued-debt')}
						isBorder={true}
						value={formatFiatCurrency(getPriceAtCurrentRate(issuedDebt), {
							sign: selectedPriceCurrency.sign,
						})}
					/>
					<ActiveDebtP>
						<ActiveDebt
							title={t('common.stat-box.active-debt')}
							value={formatFiatCurrency(getPriceAtCurrentRate(actualDebt), {
								sign: selectedPriceCurrency.sign,
							})}
							isBorder={true}
							size="lg"
							isPink
						/>
					</ActiveDebtP>
					<TotalSynthValue
						title={t('common.stat-box.synth-value')}
						isBorder={true}
						value={formatFiatCurrency(getPriceAtCurrentRate(totalSynthValue), {
							sign: selectedPriceCurrency.sign,
						})}
					/>
				</StatsSection>
			</FlexDivRow>
		</>
	);
};
const ActiveDebtP = styled(FlexDivColCentered)`
	height:33%;
	justify-content: center;
	border-top:1px solid #040E5F;
	border-bottom:1px solid #040E5F;
	// padding:3rem 0;
`
const StatsSection = styled(FlexDivColCentered)`
	width: 13.5rem;
	margin: 0 auto;
	background:#203298;
	border-radius: 1.1rem;
	// padding:3rem 0;
`
const Content = styled(FlexDivCol)`
	width: calc(100% - 15rem);
	// max-width: 1200px;
`;

const IssuedDebt = styled(StatBox)`
	height:33%;
	.title {
		color: ${(props) => props.theme.colors.white};
	}
`;

const TotalSynthValue = styled(StatBox)`
	height:33%;
	.title {
		color: ${(props) => props.theme.colors.white};
	}
`;

export default DashboardPage;
