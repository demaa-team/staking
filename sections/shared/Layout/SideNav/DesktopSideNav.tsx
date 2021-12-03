import styled from 'styled-components';
import { FC, useMemo } from 'react';
import Link from 'next/link';
import { Svg } from 'react-optimized-image';
import { useRecoilValue } from 'recoil';

import StakingLogo from 'assets/svg/app/staking-logo.svg';
import StakingL2Logo from 'assets/svg/app/staking-l2-logo.svg';

import useCryptoBalances from 'hooks/useCryptoBalances';

import ROUTES from 'constants/routes';
import { CryptoCurrency, Synths } from 'constants/currency';
import { DESKTOP_SIDE_NAV_WIDTH, zIndex } from 'constants/ui';
import UIContainer from 'containers/UI';

import { isL2State, walletAddressState, delegateWalletState } from 'store/wallet';

import PriceItem from 'sections/shared/Layout/Stats/PriceItem';
import PeriodBarStats from 'sections/shared/Layout/Stats/PeriodBarStats';
import BalanceItem from 'sections/shared/Layout/Stats/BalanceItem';
import CRatioBarStats from 'sections/shared/Layout/Stats/CRatioBarStats';

import SideNav from './SideNav';
import SubMenu from './DesktopSubMenu';
import useSynthetixQueries from 'demaa-queries';
import { wei } from '@synthetixio/wei';
import useWindowSize from 'utils/useWindowSize'
const DesktopSideNav: FC = () => {
	const walletAddress = useRecoilValue(walletAddressState);
	const delegateWallet = useRecoilValue(delegateWalletState);

	const { useSNX24hrPricesQuery, useSynthsBalancesQuery } = useSynthetixQueries();

	const SNX24hrPricesQuery = useSNX24hrPricesQuery();
	const cryptoBalances = useCryptoBalances(delegateWallet?.address ?? walletAddress);
	const synthsBalancesQuery = useSynthsBalancesQuery(delegateWallet?.address ?? walletAddress);
	const isL2 = useRecoilValue(isL2State);
	const { clearSubMenuConfiguration } = UIContainer.useContainer();

	const snxBalance =
		cryptoBalances?.balances?.find((balance) => balance.currencyKey === CryptoCurrency.DEM)
			?.balance ?? wei(0);

	const sUSDBalance = synthsBalancesQuery?.data?.balancesMap[Synths.sUSD]?.balance ?? wei(0);

	const snxPriceChartData = useMemo(() => {
		return (SNX24hrPricesQuery?.data ?? [])
			.map((dataPoint: { averagePrice: number }) => ({ value: dataPoint.averagePrice }))
			.slice()
			.reverse();
	}, [SNX24hrPricesQuery?.data]);
	const { width, height } = useWindowSize();
	return (
		<Container onMouseLeave={clearSubMenuConfiguration} data-testid="sidenav">
			<StakingLogoWrap>
				<Link href={ROUTES.Home}>
					<div style={{transform:`scale(${width/1920},${width/1920})`}}>
						<Svg src={StakingL2Logo} />
					</div>
				</Link>
			</StakingLogoWrap>

			<SideNav isDesktop={true} />

			<>
				{/* <LineSeparator /> */}
				<MenuCharts>
					<CRatioBarStats />
					<BalanceItem amount={snxBalance} currencyKey={CryptoCurrency.DEM} />
					<BalanceItem amount={sUSDBalance} currencyKey={Synths.sUSD} />
					<PriceItem currencyKey={CryptoCurrency.DEM} data={snxPriceChartData} />
					<PeriodBarStats />
				</MenuCharts>
			</>

			<SubMenu />
		</Container>
	);
};

export default DesktopSideNav;

const Container = styled.div`
	z-index: 49;
	height: 100%;
	position: fixed;
	top: 0;
	width: ${DESKTOP_SIDE_NAV_WIDTH}rem;
	left: 0;
	background: #203298;
	border-radius: 0px 1.9rem 1.9rem 0px;
	border-right: 1px solid ${(props) => props.theme.colors.grayBlue};
	display: grid;
	grid-template-rows: auto 1fr auto auto;
	overflow-y: hidden;
	overflow-x: visible;
	transition: left 0.3s ease-out;
`;

const StakingLogoWrap = styled.div`
	padding: 1rem 0 1rem 1.2rem;
	cursor: pointer;
`;

const LineSeparator = styled.div`
	height: 1px;
	background: ${(props) => props.theme.colors.grayBlue};
	margin-bottom: 25px;
`;

const MenuCharts = styled.div`
	margin: 0.5rem 0.6rem 1.35rem 0.6rem;
	background:#3849A3;
	padding:2.5rem 1.5rem;
	border-radius: 0.8rem;
`;
