import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { FlexDivColCentered } from 'styles/common';
import { MenuModal } from '../common';
import Modal, {
	WalletOptionsProps,
	StyledGlowingButton as _StyledGlowingButton,
} from './WalletOptionsModal';

export const StyledGlowingButton = _StyledGlowingButton;

export const DesktopWalletOptionsModal: FC<WalletOptionsProps> = ({
	onDismiss,
	setWatchWalletModalOpened,
	setDelegateModalOpened,
}) => {
	const { t } = useTranslation();

	return (
		<DesktopStyledMenuModal {...{ onDismiss }} title={t('modals.wallet.watch-wallet.title')}>
			<Modal
				{...{
					onDismiss,
					setWatchWalletModalOpened,
					setDelegateModalOpened,
				}}
			/>
		</DesktopStyledMenuModal>
	);
};

export const MobileWalletOptionsModal: FC<WalletOptionsProps> = ({
	onDismiss,
	setWatchWalletModalOpened,
	setDelegateModalOpened,
}) => {
	const { t } = useTranslation();
	return (
		<MobileStyledMenuModal
			{...{ onDismiss }}
			isOpen={true}
			title={t('modals.wallet.wallet-options.title')}
		>
			<Modal
				{...{
					onDismiss,
					setWatchWalletModalOpened,
					setDelegateModalOpened,
				}}
			/>
		</MobileStyledMenuModal>
	);
};

const DesktopStyledMenuModal = styled(FlexDivColCentered)`
	margin-top: 12px;
	background: #203298;
	// border: 1px solid ${(props) => props.theme.colors.mediumBlue};
	border-radius: 1.5rem;
	padding:2.5rem 0;
	box-shadow:0 0px 5px 0 #333333
`;

const MobileStyledMenuModal = styled(MenuModal)`
	[data-reach-dialog-content] {
		width: 384px;
	}
	.card-body {
		padding: 24px 0;
		text-align: center;
		margin: 0 auto;
	}
`;
