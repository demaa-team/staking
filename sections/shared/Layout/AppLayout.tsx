import { FC, ReactNode, useEffect } from 'react';
import router from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { DESKTOP_SIDE_NAV_WIDTH, DESKTOP_BODY_PADDING } from 'constants/ui';
import ROUTES from 'constants/routes';
import NotificationContainer from 'constants/NotificationContainer';

import media from 'styles/media';
import { isL2State, isMainnetState, delegateWalletState } from 'store/wallet';
import Header from './Header';
import SideNav from './SideNav';
import useSynthetixQueries from 'demaa-queries';

type AppLayoutProps = {
	children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
	const isL2 = useRecoilValue(isL2State);
	const isMainnet = useRecoilValue(isMainnetState);

	const { useIsBridgeActiveQuery } = useSynthetixQueries();

	const depositsInactive = !(useIsBridgeActiveQuery().data ?? true); // Deposits are active by default to prevent redirects when status unknown
	const delegateWallet = useRecoilValue(delegateWalletState);

	useEffect(() => {
		if (!isL2 && router.pathname === ROUTES.Withdraw.Home) {
			router.push(ROUTES.Home);
		}
		if ((isL2 || depositsInactive) && router.pathname === ROUTES.L2.Deposit) {
			router.push(ROUTES.Home);
		}
		if (isL2 && router.pathname.includes(ROUTES.Gov.Home)) {
			router.push(ROUTES.Home);
		}
		// if (!isMainnet && router.pathname.includes(ROUTES.Debt.Home)) {
		// 	debugger
		// 	router.push(ROUTES.Home);
		// }
		if (delegateWallet && router.pathname !== ROUTES.Home) {
			router.push(ROUTES.Home);
		}
	}, [isL2, isMainnet, depositsInactive, delegateWallet]);

	return (
		<>
			<SideNav />
			<Header />
			<Content>{children}</Content>
			<NotificationContainer />
		</>
	);
};

const Content = styled.div`
	width:calc(100% - ${DESKTOP_SIDE_NAV_WIDTH}rem);
	padding:1.2rem;
	margin-left:${DESKTOP_SIDE_NAV_WIDTH}rem;
`;

export default AppLayout;
