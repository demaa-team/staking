import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Img, { Svg } from 'react-optimized-image';

import {
	isWalletConnectedState,
	delegateWalletState,
	isMainnetState,
	truncatedWalletAddressState,
	walletAddressState,
	walletWatchedState,
} from 'store/wallet';

import BrowserWalletIcon from 'assets/wallet-icons/browserWallet.svg';
import LedgerIcon from 'assets/wallet-icons/ledger.svg';
import TrezorIcon from 'assets/wallet-icons/trezor.svg';
import WalletConnectIcon from 'assets/wallet-icons/walletConnect.svg';
import CoinbaseIcon from 'assets/wallet-icons/coinbase.svg';
import PortisIcon from 'assets/wallet-icons/portis.svg';
import TrustIcon from 'assets/wallet-icons/trust.svg';
import DapperIcon from 'assets/wallet-icons/dapper.png';
import TorusIcon from 'assets/wallet-icons/torus.svg';
import StatusIcon from 'assets/wallet-icons/status.svg';
import AuthereumIcon from 'assets/wallet-icons/authereum.png';
import ImTokenIcon from 'assets/wallet-icons/imtoken.svg';

import CopyIcon from 'assets/svg/app/copy.svg';
import LinkIcon from 'assets/svg/app/link.svg';
import WalletIcon from 'assets/svg/app/wallet.svg';
import ArrowsChangeIcon from 'assets/svg/app/arrows-change.svg';
import ExitIcon from 'assets/svg/app/exit.svg';
import CheckIcon from 'assets/svg/app/check.svg';
import SearchIcon from 'assets/svg/app/search.svg';
import Incognito from 'assets/svg/app/incognito.svg';
import DelegateIcon from 'assets/svg/app/delegate.svg';

import Connector from 'containers/Connector';
import Etherscan from 'containers/BlockExplorer';

import Button from 'components/Button';

import {
	ExternalLink,
	Tooltip,
	FlexDiv,
	FlexDivCol,
	FlexDivCentered,
	Divider,
} from 'styles/common';

export type WalletOptionsProps = {
	onDismiss: () => void;
	setWatchWalletModalOpened: Dispatch<SetStateAction<boolean>>;
	setDelegateModalOpened: Dispatch<SetStateAction<boolean>>;
};

const getWalletIcon = (selectedWallet?: string | null) => {
	switch (selectedWallet) {
		case 'browser wallet':
			return <Img src={BrowserWalletIcon} />;
		case 'trezor':
			return <Img src={TrezorIcon} />;
		case 'ledger':
			return <Img src={LedgerIcon} />;
		case 'walletconnect':
			return <Img src={WalletConnectIcon} />;
		case 'coinbase wallet':
		case 'walletlink':
			return <Img src={CoinbaseIcon} />;
		case 'portis':
			return <Img src={PortisIcon} />;
		case 'trust':
			return <Img src={TrustIcon} />;
		case 'dapper':
			return <Img src={DapperIcon} />;
		case 'torus':
			return <Img src={TorusIcon} />;
		case 'status':
			return <Img src={StatusIcon} />;
		case 'authereum':
			return <Img src={AuthereumIcon} />;
		case 'imtoken':
			return <Img src={ImTokenIcon} />;
		default:
			return selectedWallet;
	}
};

const exitIcon = <Svg src={ExitIcon} />;
const walletIcon = <Svg src={WalletIcon} />;
const changeIcon = <Svg src={ArrowsChangeIcon} />;
const searchIcon = <Svg src={SearchIcon} />;
const delegateIcon = <Svg src={DelegateIcon} />;

const WalletOptionsModal: FC<WalletOptionsProps> = ({
	onDismiss,
	setWatchWalletModalOpened,
	setDelegateModalOpened,
}) => {
	const { t } = useTranslation();
	const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
	const {
		connectWallet,
		disconnectWallet,
		switchAccounts,
		isHardwareWallet,
		selectedWallet,
	} = Connector.useContainer();
	const { blockExplorerInstance } = Etherscan.useContainer();

	const [walletAddress, setWalletAddress] = useRecoilState(walletAddressState);
	const truncatedWalletAddress = useRecoilValue(truncatedWalletAddressState);
	const isWalletConnected = useRecoilValue(isWalletConnectedState);
	const isMainnet = useRecoilValue(isMainnetState);
	const [delegateWallet, setDelegateWallet] = useRecoilState(delegateWalletState);
	const [walletWatched, setWalletWatched] = useRecoilState(walletWatchedState);

	useEffect(() => {
		if (copiedAddress) {
			setInterval(() => {
				setCopiedAddress(false);
			}, 3000); // 3s
		}
	}, [copiedAddress]);

	return (
		<>
			{isWalletConnected ? (
				<>
					<WalletDetails>
						{walletWatched ? (
							<SelectedWallet>
								<Svg src={Incognito} />
							</SelectedWallet>
						) : (
							<SelectedWallet>{getWalletIcon(selectedWallet?.toLowerCase())}</SelectedWallet>
						)}
						<WalletAddress>{truncatedWalletAddress}</WalletAddress>
						<ActionIcons>
							<Tooltip
								hideOnClick={false}
								arrow={true}
								placement="bottom"
								content={
									copiedAddress
										? t('modals.wallet.copy-address.copied')
										: t('modals.wallet.copy-address.copy-to-clipboard')
								}
							>
								<CopyClipboardContainer>
									<CopyToClipboard text={walletAddress!} onCopy={() => setCopiedAddress(true)}>
										{copiedAddress ? (
											<Svg
												src={CheckIcon}
												width="16"
												height="16"
												viewBox={`0 0 ${CheckIcon.width} ${CheckIcon.height}`}
											/>
										) : (
											<Svg src={CopyIcon} />
										)}
									</CopyToClipboard>
								</CopyClipboardContainer>
							</Tooltip>
							<Tooltip
								hideOnClick={false}
								arrow={true}
								placement="bottom"
								content={t('modals.wallet.etherscan')}
							>
								<LinkContainer>
									<WrappedExternalLink href={blockExplorerInstance?.addressLink(walletAddress!)}>
										<Svg src={LinkIcon} />
									</WrappedExternalLink>
								</LinkContainer>
							</Tooltip>
						</ActionIcons>
					</WalletDetails>
					<StyledDivider />
					<Buttons>
						<StyledButton
							onClick={() => {
								onDismiss();
								connectWallet();
							}}
						>
							 {t('modals.wallet.change-wallet')}
						</StyledButton>
						{isHardwareWallet() && (
							<StyledButton
								onClick={() => {
									onDismiss();
									switchAccounts();
								}}
							>
								{t('modals.wallet.switch-account')}
							</StyledButton>
						)}
						<StyledButton
							onClick={() => {
								onDismiss();
								setWatchWalletModalOpened(true);
							}}
							data-testid="watch-wallet"
						>
							{t('modals.wallet.watch-wallet.title')}
						</StyledButton>
						{isMainnet && (
							<StyledButton
								onClick={() => {
									onDismiss();
									setDelegateModalOpened(true);
								}}
							>
								{t('modals.wallet.delegate-mode.menu-title')}
							</StyledButton>
						)}
					</Buttons>
					<StyledDivider />
					{delegateWallet && (
						<StyledTextButton
							onClick={() => {
								setDelegateWallet(null);
								onDismiss();
							}}
						>
							{t('modals.wallet.stop-delegation')}
						</StyledTextButton>
					)}
					{walletWatched ? (
						<StyledTextButton
							onClick={() => {
								onDismiss();
								setWalletWatched(null);
								setWalletAddress(null);
							}}
						>
							{t('modals.wallet.stop-watching')}
						</StyledTextButton>
					) : (
						<StyledTextButton
							onClick={() => {
								onDismiss();
								disconnectWallet();
							}}
						>
							{t('modals.wallet.disconnect-wallet')}
						</StyledTextButton>
					)}
				</>
			) : (
				<WalletDetails>
					<Buttons>
						<StyledGlowingButton
							onClick={() => {
								onDismiss();
								connectWallet();
							}}
							data-testid="connect-wallet"
						>
							{t('common.wallet.connect-wallet')}
						</StyledGlowingButton>
						{/* <DividerText>{t('common.wallet.or')}</DividerText> */}
						<StyledButton
							onClick={() => {
								onDismiss();
								setWatchWalletModalOpened(true);
							}}
							data-testid="watch-wallet"
						>
							{t('modals.wallet.watch-wallet.title')}
						</StyledButton>
					</Buttons>
				</WalletDetails>
			)}
		</>
	);
};

export const StyledGlowingButton = styled.div`
	padding: 0.7rem 1.25rem;
	font-size:0.8rem;
	background: #F86C29;
	text-align: center;
	cursor:pointer;
	width:11rem;
	border-radius: 1.25rem;
	font-family: ${(props) => props.theme.fonts.condensedMedium};
	text-transform: uppercase;
	margin-bottom:1.4rem;
	// margin: 4px 0px;
	&:hover{
		background:#F39365
	}
`;

const StyledButton = styled.div`
	font-family: ${(props) => props.theme.fonts.condensedMedium};
	padding: 0.7rem 1.25rem;
	font-size:0.8rem;
	background: #3142A0;
	text-align: center;
	cursor:pointer;
	border-radius: 1.25rem;
	// display: inline-grid;
	grid-template-columns: auto 1fr;
	// align-items: center;
	// justify-items: center;
	text-transform: uppercase;

	margin: 6px 0px;
	&:hover{
		background:#1A2479
	}
	svg {
		margin-right: 5px;
		color: ${(props) => props.theme.colors.gray};
	}
`;

const StyledTextButton = styled(Button).attrs({
	variant: 'text',
	size: 'lg',
})`
	font-family: ${(props) => props.theme.fonts.condensedMedium};
	padding: 0 20px;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	justify-items: center;
	text-transform: uppercase;
	margin: -2px 0 6px 0;

	svg {
		margin-right: 5px;
		color: ${(props) => props.theme.colors.gray};
	}
`;

const WalletDetails = styled.div`
	// padding: 8px 0px;
`;

const SelectedWallet = styled(FlexDivCentered)`
	margin-top: 16px;
	justify-content: center;
	img {
		width: 22px;
	}
`;

const WalletAddress = styled.div`
	margin: 6px;
	font-family: ${(props) => props.theme.fonts.extended};
	font-size: 14px;
`;

const ActionIcons = styled(FlexDivCentered)`
	justify-content: center;
`;

const CopyClipboardContainer = styled(FlexDiv)`
	cursor: pointer;
	color: ${(props) => props.theme.colors.gray};
	margin-right: 2px;
	&:hover {
		svg {
			color: ${(props) => props.theme.colors.white};
		}
	}
`;

const WrappedExternalLink = styled(ExternalLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	max-height: 16px;
`;

const LinkContainer = styled(FlexDiv)`
	cursor: pointer;
	margin-left: 2px;
	svg {
		color: ${(props) => props.theme.colors.gray};
	}
	&:hover {
		svg {
			color: ${(props) => props.theme.colors.white};
		}
	}
`;

const Buttons = styled(FlexDivCol)`
	// margin: 0px 8px;
`;

const StyledDivider = styled(Divider)`
	margin: 8px 0px;
`;

const DividerText = styled.p`
	text-align: center;
	font-family: ${(props) => props.theme.fonts.condensedMedium};
	color: ${(props) => props.theme.colors.gray};
	font-size: 12px;
	text-transform: uppercase;
`;

export default WalletOptionsModal;
