import React, { useMemo } from 'react';
import ReactSelect, { Props, StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';

import { IndicatorSeparator, DropdownIndicator, MultiValueRemove } from './components';

type SelectProps<T> = Props<T> & {
	variant?: 'solid' | 'outline';
};

function Select<T>(props: SelectProps<T>) {
	const { colors, fonts } = useTheme();

	const computedStyles = useMemo(() => {
		const styles: StylesConfig = {
			container: (style, state) => ({
				...style,
				opacity: state.isDisabled ? 0.4 : 1,
				backgroundColor: '#1A2479',
			}),
			singleValue: (style) => ({
				...style,
				color: colors.white,
				boxShadow: `0`,
				fontSize: '12px',
				border: 'none',
			}),
			multiValue: (style) => ({
				...style,
				background: 'none',
				alignItems: 'flex-end',
			}),
			multiValueLabel: (style) => ({
				...style,
				background: '#1A2479',
				borderRadius: 0,
				color: colors.white,
				fontSize: '12px',
				padding: 0,
				paddingLeft: 0,
			}),
			multiValueRemove: (style) => ({
				...style,
				background: '#1A2479',
				borderRadius: 0,
				color: colors.gray,
				'&:hover': {
					background: '#1A2479',
					color: colors.white,
				},
				padding: 0,
			}),
			noOptionsMessage: (style) => ({
				...style,
				fontSize: '12px',
				color: colors.white,
			}),
			control: (style) => {
				const baseStyles = {
					...style,
					fontFamily: fonts.condensedBold,
					color: colors.white,
					cursor: 'pointer',
					borderRadius: '4px',
					outline: 'none',
					fontSize: '12px',
					backgroundColor: '#1A2479',
				};
				if (props.variant === 'outline') {
					return {
						...baseStyles,
						border: `1px solid #3f478f`,
						boxShadow: 'none',
						'&:hover': {
							backgroundColor: '#1A2479',
							border: `1px solid #3f478f`,
							outline: 'none',
						},
					};
				}
				return {
					...baseStyles,
					border: 'none',
					boxShadow: `0`,
					'&:hover': {
						border: 'none',
					},
				};
			},
			menu: (style) => ({
				...style,
				backgroundColor: '#1A2479',
				border: 'none',
				boxShadow: `0`,
				padding: 0,
			}),
			menuList: (style) => ({
				...style,
				borderRadius: 0,
				padding: 0,
				textAlign: 'left',
			}),
			option: (style) => {
				const baseStyles = {
					...style,
					fontFamily: fonts.condensedBold,
					cursor: 'pointer',
					padding: '12px 10px',
					fontSize: '12px',
					backgroundColor: '#1A2479',
					'&:hover': {
						backgroundColor: '#1A2479',
						color: colors.white,
					},
				};

				if (props.variant === 'outline') {
					return {
						...baseStyles,
						color: colors.white,
					};
				}

				return {
					...baseStyles,
					color: colors.gray,
				};
			},
			placeholder: (style) => ({
				...style,
				fontSize: '12px',
				color: colors.white,
				textTransform: 'capitalize',
			}),
			dropdownIndicator: (style, state) => ({
				...style,
				color: state.selectProps.menuIsOpen ? colors.white : colors.gray,
				transition: 'transform 0.2s ease-in-out',
				transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
			}),
		};
		return styles;
	}, [colors, fonts, props.variant]);

	const { components, ...rest } = props;

	return (
		<ReactSelect
			styles={computedStyles}
			classNamePrefix="react-select"
			components={{ IndicatorSeparator, DropdownIndicator, MultiValueRemove, ...components }}
			{...rest}
		/>
	);
}

export default Select;
