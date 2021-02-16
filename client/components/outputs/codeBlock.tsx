import { Box, Button, ButtonProps, Code, useClipboard } from '@chakra-ui/react';

export default function CodeBlock({ code, isJSON }: { code: string; isJSON?: boolean }) {
	const copyCode = isJSON ? JSON.stringify(code, null, 4).replace(/"([^"]+)":/g, '$1:') : code;

	const { hasCopied, onCopy } = useClipboard(copyCode);

	return (
		<Box position="relative" zIndex="0" m="2" h='200px'>
			<Box padding="5" rounded="8px" my="8">
				<Code p="4" >{copyCode}</Code>
			</Box>
			<CopyButton top="1.5" onClick={onCopy}>
				{hasCopied ? 'copied' : 'copy'}
			</CopyButton>
		</Box>
	);
}

function CopyButton(props: ButtonProps) {
	return (
		<Button
			size="sm"
			position="absolute"
			textTransform="uppercase"
			colorScheme="messenger"
			fontSize="xs"
			height="24px"
			top={0}
			zIndex="1"
			right="1.25em"
			{...props}
		/>
	);
}
