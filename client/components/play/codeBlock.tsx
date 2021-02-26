import { useMemo } from 'react';
import { Box, Button, ButtonProps, Code, useClipboard } from '@chakra-ui/react';

import { useControl } from '@/contexts/play';
import { defaultSettings, isBase64 } from '@/utils/index';

export default function CodeBlock() {
	const {
		controlState: { code },
	} = useControl();

	const copyCode = useMemo(
		() => (isBase64(code) ? code : JSON.stringify(code, null, 4).replace(/"([^"]+)":/g, '$1:')),
		[code]
	);

	const { hasCopied, onCopy } = useClipboard(copyCode);

	return (
		<Box position="relative" zIndex="0" mt="-3.5" mr="-3.5">
			<Box p="4" rounded="8px">
				<Code d="block" p="2" overflowY="scroll" h={defaultSettings.PLAY_CODE_STYLE_HEIGHT}>
					{copyCode}
				</Code>
			</Box>
			<CopyButton onClick={onCopy}>{hasCopied ? 'copied' : 'copy'}</CopyButton>
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
			top="1.5"
			zIndex="1"
			right="1.25em"
			{...props}
		/>
	);
}
