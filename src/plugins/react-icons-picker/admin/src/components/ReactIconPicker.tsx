import React, { useState, forwardRef } from 'react';
import { IconType } from 'react-icons';

import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as FiIcons from 'react-icons/fi';
import * as PiIcons from 'react-icons/pi';
import * as LiaIcons from 'react-icons/lia';
import * as MdIcons from 'react-icons/md';

const iconGroups = {
	fa: FaIcons,
	gi: GiIcons,
	fi: FiIcons,
	pi: PiIcons,
	lia: LiaIcons,
	md: MdIcons,
};

const groupLabels: Record<string, string> = {
	fa: 'FontAwesome',
	gi: 'Game Icons',
	fi: 'Feather Icons',
	pi: 'Phosphor Icons',
	lia: 'Line Awesome',
	md: 'Material',
};

interface IconPickerProps {
	name: string;
	value: string;
	onChange: (event: { target: { name: string; value: string; type: string } }) => void;
}

const IconPicker = forwardRef<HTMLInputElement, IconPickerProps>(
	({ name, value, onChange }, ref) => {
		const [selectedIcon, setSelectedIcon] = useState(value || '');
		const [searchQuery, setSearchQuery] = useState('');
		const [selectedGroup, setSelectedGroup] = useState<keyof typeof iconGroups>('fa');

		const currentGroupIcons = iconGroups[selectedGroup];

		const iconEntries = Object.keys(currentGroupIcons).map((key) => ({
			name: key,
			component: currentGroupIcons[key as keyof typeof currentGroupIcons] as IconType,
		}));

		const filteredIcons = iconEntries.filter((icon) =>
			icon.name.toLowerCase().includes(searchQuery.toLowerCase())
		);

		const handleChange = (iconName: string) => {
			setSelectedIcon(iconName);
			onChange({
				target: {
					name,
					value: iconName,
					type: 'string',
				},
			});
		};

		return (
			<div style={{ fontFamily: 'sans-serif' }}>
				<label htmlFor="icon-group">Icon Group:</label>
				<select
					id="icon-group"
					value={selectedGroup}
					onChange={(e) => setSelectedGroup(e.target.value as keyof typeof iconGroups)}
					style={{ margin: '0 0 10px 10px', padding: '5px' }}
				>
					{Object.keys(iconGroups).map((groupKey) => (
						<option key={groupKey} value={groupKey}>
							{groupLabels[groupKey]}
						</option>
					))}
				</select>

				<input
					ref={ref}
					type="text"
					placeholder="Search icons"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					style={{ margin: '10px 0', padding: '5px', fontSize: '16px', width: '100%' }}
				/>

				<div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: '300px', overflowY: 'scroll' }}>
					{filteredIcons.map((icon) => {
						const IconComponent = icon.component; // Extract the component directly

						return (
							<button
								key={icon.name}
								onClick={() => handleChange(icon.name)}
								style={{
									margin: '5px',
									padding: '10px',
									fontSize: '20px',
									backgroundColor: selectedIcon === icon.name ? '#e6f7ff' : 'transparent',
									border: selectedIcon === icon.name ? '1px solid #1890ff' : '1px solid #d9d9d9',
								}}
							>
								{React.createElement(IconComponent)}
							</button>
						);
					})}
				</div>

				<div style={{ marginTop: '10px' }}>
					<strong>Selected icon:</strong> {selectedIcon}
				</div>
			</div>
		);
	}
);

IconPicker.displayName = 'IconPicker';

export default IconPicker;
