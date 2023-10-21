export function normalizeString(input: string): string {
	// Remove accents using Unicode normalization
	const normalizedString = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	// Convert to lowercase
	const lowercaseString = normalizedString.toLowerCase();

	return lowercaseString;
}

export function stringMatches(str1: string, str2: string) {
	return normalizeString(str1) == normalizeString(str2);
}

export function stringIncludes(str1: string, str2: string) {
	return normalizeString(str1).includes(normalizeString(str2));
}
