import { useRef } from 'react';
import {
	Link,
	Flex,
	HStack,
	Icon,
	Switch,
	Box,
	Button,
	useColorModeValue,
	useDisclosure,
	useColorMode,
	useUpdateEffect,
} from '@chakra-ui/react';
import { SiGithub } from 'react-icons/si';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function NavbarContent() {
	const mobileNav = useDisclosure();

	const mobileNavBtnRef = useRef<HTMLButtonElement>();

	useUpdateEffect(() => {
		mobileNavBtnRef.current?.focus();
	}, [mobileNav.isOpen]);

	return (
		<>
			<Flex w="100%" my="2.5" h="100%" px="6" align="center" justify="space-between">
				<Flex align="center">
					<strong>
						<h3>DynaImages</h3>
					</strong>
				</Flex>

				<Flex justify="flex-end" w="100%" maxW="824px" align="center" color="gray.400">
					<HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
						<NavButton name="PlayGround" />
						<NavButton name="Docs" />
						<NavButton name="Examples" />
						<Link
							color="green"
							href="https://github.com/aditya-mitra"
							isExternal
							aria-label="GitHub Repository Link">
							<Icon as={SiGithub} w="5" h="5" />
						</Link>

						{/* <MobileNavButton
						ref={mobileNavBtnRef}
						aria-label="Open Menu"
						onClick={mobileNav.onOpen}
					/> */}
					</HStack>
					<ColorModeSwitch />
				</Flex>
			</Flex>
			{/* <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} /> */}
		</>
	);
}

function ColorModeSwitch() {
	const { toggleColorMode } = useColorMode();
	const switchOn = useColorModeValue(false, true);
	const text = useColorModeValue('Light', 'Dark');
	const icon = useColorModeValue(FiSun, FiMoon);

	return (
		<Box aria-label={`Switch to ${text} Mode`}>
			<Switch colorScheme="green" ml="10" isChecked={switchOn} onChange={toggleColorMode} />
			<Icon as={icon} ml="3" />
		</Box>
	);
}

function NavButton({ name }: { name: string }) {
	return (
		<Button colorScheme="green" variant="ghost">
			{name}
		</Button>
	);
}
