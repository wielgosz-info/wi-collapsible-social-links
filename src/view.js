import { store, getContext } from '@wordpress/interactivity';

store('WICollapsibleSocialLinks', {
	actions: {
		toggle: () => {
			const context = getContext();
			context.isOpen = !context.isOpen;
		},
	},
});
