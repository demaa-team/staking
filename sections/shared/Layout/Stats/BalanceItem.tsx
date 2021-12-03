import { FC } from 'react';
import styled from 'styled-components';
import Wei from '@synthetixio/wei';
import { Trans } from 'react-i18next';
import { FlexDivCol, NoTextTransform } from 'styles/common';
import { formatFiatCurrency } from 'utils/formatters/number';

type BalanceItemProps = {
	amount: Wei;
	currencyKey: string;
};

const BalanceItem: FC<BalanceItemProps> = ({ amount, currencyKey }) => {
	return (
		<Container>
			<Title>
				<Trans
					i18nKey="common.currency.currency-balance"
					values={{ currencyKey }}
					components={[<NoTextTransform />]}
				/>
			</Title>
			<Balance>{formatFiatCurrency(amount)}</Balance>
		</Container>
	);
};

const Container = styled(FlexDivCol)`
	margin-bottom: 0.9rem;
`;

const Title = styled.h3`
	font-family: Microsoft YaHei;
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
	padding-bottom: 0.25rem;
	font-size: 0.6rem;
	margin: 0;
	font-weight:500;
`;

const Balance = styled.span`
	font-family: Microsoft YaHei;
	color: #F86C29;
	font-size: 0.6rem;
`;

export default BalanceItem;
