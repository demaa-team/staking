export default {
	address: '0x90Bb609649E0451E5aD952683D64BD2d1f245840',
	abi: [
		{
			name: 'Deposit',
			inputs: [
				{ type: 'address', name: 'provider', indexed: true },
				{ type: 'uint256', name: 'value', indexed: false },
			],
			anonymous: false,
			type: 'event',
		},
		{
			name: 'Withdraw',
			inputs: [
				{ type: 'address', name: 'provider', indexed: true },
				{ type: 'uint256', name: 'value', indexed: false },
			],
			anonymous: false,
			type: 'event',
		},
		{
			name: 'UpdateLiquidityLimit',
			inputs: [
				{ type: 'address', name: 'user', indexed: false },
				{ type: 'uint256', name: 'original_balance', indexed: false },
				{ type: 'uint256', name: 'original_supply', indexed: false },
				{ type: 'uint256', name: 'working_balance', indexed: false },
				{ type: 'uint256', name: 'working_supply', indexed: false },
			],
			anonymous: false,
			type: 'event',
		},
		{
			name: 'CommitOwnership',
			inputs: [{ type: 'address', name: 'admin', indexed: false }],
			anonymous: false,
			type: 'event',
		},
		{
			name: 'ApplyOwnership',
			inputs: [{ type: 'address', name: 'admin', indexed: false }],
			anonymous: false,
			type: 'event',
		},
		{
			name: 'Transfer',
			inputs: [
				{ type: 'address', name: '_from', indexed: true },
				{ type: 'address', name: '_to', indexed: true },
				{ type: 'uint256', name: '_value', indexed: false },
			],
			anonymous: false,
			type: 'event',
		},
		{
			name: 'Approval',
			inputs: [
				{ type: 'address', name: '_owner', indexed: true },
				{ type: 'address', name: '_spender', indexed: true },
				{ type: 'uint256', name: '_value', indexed: false },
			],
			anonymous: false,
			type: 'event',
		},
		{
			outputs: [],
			inputs: [
				{ type: 'string', name: '_name' },
				{ type: 'string', name: '_symbol' },
				{ type: 'address', name: '_lp_token' },
				{ type: 'address', name: '_minter' },
				{ type: 'address', name: '_admin' },
			],
			stateMutability: 'nonpayable',
			type: 'constructor',
		},
		{
			name: 'decimals',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 261,
		},
		{
			name: 'integrate_checkpoint',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 1997,
		},
		{
			name: 'user_checkpoint',
			outputs: [{ type: 'bool', name: '' }],
			inputs: [{ type: 'address', name: 'addr' }],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 2070619,
		},
		{
			name: 'claimable_tokens',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'address', name: 'addr' }],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 1989830,
		},
		{
			name: 'claimable_reward',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [
				{ type: 'address', name: '_addr' },
				{ type: 'address', name: '_token' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 999922,
		},
		{
			name: 'claim_rewards',
			outputs: [],
			inputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			name: 'claim_rewards',
			outputs: [],
			inputs: [{ type: 'address', name: '_addr' }],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			name: 'claim_historic_rewards',
			outputs: [],
			inputs: [{ type: 'address[8]', name: '_reward_tokens' }],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			name: 'claim_historic_rewards',
			outputs: [],
			inputs: [
				{ type: 'address[8]', name: '_reward_tokens' },
				{ type: 'address', name: '_addr' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			name: 'kick',
			outputs: [],
			inputs: [{ type: 'address', name: 'addr' }],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 2075807,
		},
		{
			name: 'set_approve_deposit',
			outputs: [],
			inputs: [
				{ type: 'address', name: 'addr' },
				{ type: 'bool', name: 'can_deposit' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 35981,
		},
		{
			name: 'deposit',
			outputs: [],
			inputs: [{ type: 'uint256', name: '_value' }],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			name: 'deposit',
			outputs: [],
			inputs: [
				{ type: 'uint256', name: '_value' },
				{ type: 'address', name: '_addr' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			name: 'withdraw',
			outputs: [],
			inputs: [{ type: 'uint256', name: '_value' }],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 3125023,
		},
		{
			name: 'allowance',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [
				{ type: 'address', name: '_owner' },
				{ type: 'address', name: '_spender' },
			],
			stateMutability: 'view',
			type: 'function',
			gas: 1911,
		},
		{
			name: 'transfer',
			outputs: [{ type: 'bool', name: '' }],
			inputs: [
				{ type: 'address', name: '_to' },
				{ type: 'uint256', name: '_value' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 12092388,
		},
		{
			name: 'transferFrom',
			outputs: [{ type: 'bool', name: '' }],
			inputs: [
				{ type: 'address', name: '_from' },
				{ type: 'address', name: '_to' },
				{ type: 'uint256', name: '_value' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 12129038,
		},
		{
			name: 'approve',
			outputs: [{ type: 'bool', name: '' }],
			inputs: [
				{ type: 'address', name: '_spender' },
				{ type: 'uint256', name: '_value' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 38244,
		},
		{
			name: 'increaseAllowance',
			outputs: [{ type: 'bool', name: '' }],
			inputs: [
				{ type: 'address', name: '_spender' },
				{ type: 'uint256', name: '_added_value' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 39488,
		},
		{
			name: 'decreaseAllowance',
			outputs: [{ type: 'bool', name: '' }],
			inputs: [
				{ type: 'address', name: '_spender' },
				{ type: 'uint256', name: '_subtracted_value' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 39512,
		},
		{
			name: 'set_rewards',
			outputs: [],
			inputs: [
				{ type: 'address', name: '_reward_contract' },
				{ type: 'bytes32', name: '_sigs' },
				{ type: 'address[8]', name: '_reward_tokens' },
			],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 2268178,
		},
		{
			name: 'set_killed',
			outputs: [],
			inputs: [{ type: 'bool', name: '_is_killed' }],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 36878,
		},
		{
			name: 'commit_transfer_ownership',
			outputs: [],
			inputs: [{ type: 'address', name: 'addr' }],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 38258,
		},
		{
			name: 'accept_transfer_ownership',
			outputs: [],
			inputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
			gas: 38203,
		},
		{
			name: 'minter',
			outputs: [{ type: 'address', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 1811,
		},
		{
			name: 'crv_token',
			outputs: [{ type: 'address', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 1841,
		},
		{
			name: 'lp_token',
			outputs: [{ type: 'address', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 1871,
		},
		{
			name: 'controller',
			outputs: [{ type: 'address', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 1901,
		},
		{
			name: 'voting_escrow',
			outputs: [{ type: 'address', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 1931,
		},
		{
			name: 'future_epoch_time',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 1961,
		},
		{
			name: 'balanceOf',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'address', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2206,
		},
		{
			name: 'totalSupply',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 2021,
		},
		{
			name: 'name',
			outputs: [{ type: 'string', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 8453,
		},
		{
			name: 'symbol',
			outputs: [{ type: 'string', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 7506,
		},
		{
			name: 'approved_to_deposit',
			outputs: [{ type: 'bool', name: '' }],
			inputs: [
				{ type: 'address', name: 'arg0' },
				{ type: 'address', name: 'arg1' },
			],
			stateMutability: 'view',
			type: 'function',
			gas: 2541,
		},
		{
			name: 'working_balances',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'address', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2356,
		},
		{
			name: 'working_supply',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 2171,
		},
		{
			name: 'period',
			outputs: [{ type: 'int128', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 2201,
		},
		{
			name: 'period_timestamp',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'uint256', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2340,
		},
		{
			name: 'integrate_inv_supply',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'uint256', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2370,
		},
		{
			name: 'integrate_inv_supply_of',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'address', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2506,
		},
		{
			name: 'integrate_checkpoint_of',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'address', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2536,
		},
		{
			name: 'integrate_fraction',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'address', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2566,
		},
		{
			name: 'inflation_rate',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 2381,
		},
		{
			name: 'reward_contract',
			outputs: [{ type: 'address', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 2411,
		},
		{
			name: 'reward_tokens',
			outputs: [{ type: 'address', name: '' }],
			inputs: [{ type: 'uint256', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2550,
		},
		{
			name: 'reward_integral',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [{ type: 'address', name: 'arg0' }],
			stateMutability: 'view',
			type: 'function',
			gas: 2686,
		},
		{
			name: 'reward_integral_for',
			outputs: [{ type: 'uint256', name: '' }],
			inputs: [
				{ type: 'address', name: 'arg0' },
				{ type: 'address', name: 'arg1' },
			],
			stateMutability: 'view',
			type: 'function',
			gas: 2931,
		},
		{
			name: 'admin',
			outputs: [{ type: 'address', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 2531,
		},
		{
			name: 'future_admin',
			outputs: [{ type: 'address', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 2561,
		},
		{
			name: 'is_killed',
			outputs: [{ type: 'bool', name: '' }],
			inputs: [],
			stateMutability: 'view',
			type: 'function',
			gas: 2591,
		},
	],
};
