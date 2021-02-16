import {
	Link,
	Flex,
	HStack,
	Icon,
	Switch,
	Box,
	Button,
	IconButton,
	useColorModeValue,
	useColorMode,
} from '@chakra-ui/react';
import { SiGithub } from 'react-icons/si';
import { FiMoon, FiSun } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';

export default function NavbarContent() {
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

						<MobileNavButton />
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

// REPLACE WITH Drawer OR Accordion

function MobileNavButton() {
	return (
		<IconButton
			display={{ base: 'flex', md: 'none' }}
			aria-label="Open SideBar Menu"
			fontSize="20px"
			color={useColorModeValue('gray.800', 'inherit')}
			variant="ghost"
			icon={<AiOutlineMenu />}
		/>
	);
}

//   export function SidebarContent(props: SidebarContentProps) {
// 	return (
// 	  <>
// 				<chakra.h4
// 				  fontSize="sm"
// 				  fontWeight="bold"
// 				  my="1.25rem"
// 				  textTransform="uppercase"
// 				  letterSpacing="wider"
// 				  color={useColorModeValue("gray.700", "inherit")}
// 				>
// 				  {lvl1.title}
// 				</chakra.h4>

// 			  {lvl1.routes.map((lvl2, index) => {
// 				if (!lvl2.routes) {
// 				  return (
// 					<SidebarLink ml="-3" mt="2" key={lvl2.path} href={lvl2.path}>
// 					  {lvl2.title}
// 					</SidebarLink>
// 				  )
// 				}

// 				const selected = pathname.startsWith(lvl2.path)
// 				const opened = selected || lvl2.open

// 				const sortedRoutes = !!lvl2.sort
// 				  ? _.sortBy(lvl2.routes, (i) => i.title)
// 				  : lvl2.routes

// 				return (
// 				  <SidebarCategory
// 					contentRef={contentRef}
// 					key={lvl2.path + index}
// 					title={lvl2.title}
// 					selected={selected}
// 					opened={opened}
// 				  >
// 					<Stack as="ul">
// 					  {sortedRoutes.map((lvl3) => (
// 						<SidebarLink as="li" key={lvl3.path} href={lvl3.path}>
// 						  <span>{convertBackticksToInlineCode(lvl3.title)}</span>
// 						  {lvl3.new && (
// 							<Badge
// 							  ml="2"
// 							  lineHeight="tall"
// 							  fontSize="10px"
// 							  variant="solid"
// 							  colorScheme="purple"
// 							>
// 							  New
// 							</Badge>
// 						  )}
// 						</SidebarLink>
// 					  ))}
// 					</Stack>
// 				  </SidebarCategory>
// 				)
// 			  })}
// 		  )
// 		})}
// 	  </>
// 	)
//   }
