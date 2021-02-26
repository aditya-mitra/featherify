import { ChangeEvent, ReactNode } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Select,
	InputGroup,
	InputRightAddon,
	NumberInput,
	NumberInputField,
	NumberIncrementStepper,
	NumberDecrementStepper,
	NumberInputStepper,
	UseCounterProps as ChakraUseCounterProps,
} from '@chakra-ui/react';

import { useControl } from '@/contexts/play';
import type { ConfigType } from '@/types/index';

export default function Controls() {
	const { controlState, dispatchControl, changeControlWithServer } = useControl();

	return (
		<Box>
			<NumberField
				label="Height"
				val={controlState.height}
				onChange={(curVal) =>
					changeControlWithServer({
						type: 'CHANGE_HEIGHT',
						payload: { height: parseInt(curVal, 10) },
					})
				}
				rightSideDisplay="px"
				max={100}
				min={5}
				step={1}
			/>
			<NumberField
				label="Width"
				val={controlState.width}
				onChange={(curVal) =>
					changeControlWithServer({
						type: 'CHANGE_WIDTH',
						payload: { width: parseInt(curVal, 10) },
					})
				}
				rightSideDisplay="px"
				max={100}
				min={5}
				step={1}
			/>
			<NumberField
				label="Blur"
				val={controlState.blur}
				onChange={(curVal) =>
					dispatchControl({
						type: 'CHANGE_BLUR',
						payload: { blur: parseFloat(curVal) },
					})
				}
				rightSideDisplay={'px'}
				max={30.0}
				min={0.0}
				step={0.5}
			/>
			<NumberField
				label="Scale"
				val={controlState.scale}
				onChange={(curVal) =>
					dispatchControl({
						type: 'CHANGE_SCALE',
						payload: { scale: parseFloat(curVal) },
					})
				}
				max={3.0}
				min={0.0}
				step={0.05}
			/>
			<DropdownSelect // change this to a double button like toggle - selected one is filled (buttongroup)
				label="Format"
				options={[]}
				val={controlState.config}
				onChange={(e) =>
					dispatchControl({
						type: 'CHANGE_CONFIG',
						payload: { config: e.target.value as ConfigType },
					})
				}
			/>
			<Button
				mt="3.5"
				variant="outline"
				colorScheme="pink"
				onClick={() => dispatchControl({ type: 'RESET', payload: {} })}>
				Reset All Values
			</Button>
		</Box>
	);
}

function NumberField({
	val,
	label,
	step,
	min,
	max,
	onChange,
	rightSideDisplay,
}: INumberFieldProps) {
	return (
		<Box my="1.5">
			<FormControl id={label}>
				<FormLabel>
					<strong>{label}</strong>
				</FormLabel>
				<InputGroup>
					<NumberInput
						max={max}
						min={min}
						step={step}
						value={val.toString()}
						onChange={onChange}
						clampValueOnBlur={true}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					{rightSideDisplay && <InputRightAddon children={rightSideDisplay} />}
				</InputGroup>
			</FormControl>
		</Box>
	);
}

function DropdownSelect({ options, label, val, onChange }: IDropdownSelectProps) {
	return (
		<Box my="2.5">
			<FormControl id={label}>
				<FormLabel>
					<strong>{label}</strong>
				</FormLabel>
				<Select onChange={onChange} value={val}>
					<option
						value={`Select a ${label}`}
						disabled={true}>{`Select a ${label}`}</option>
					{options.map((opt) => (
						<option value={opt} key={opt}>
							{opt}
						</option>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}

interface INumberFieldProps {
	label: string;
	max: number;
	min: number;
	val: number;
	step: number;
	onChange: ChakraUseCounterProps['onChange'];
	rightSideDisplay?: ReactNode;
}

interface IDropdownSelectProps {
	options: string[];
	label: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	val: string;
}
