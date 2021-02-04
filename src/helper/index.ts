export default class TitleHelper {

	/**
	 * Returns the specific featuring string found in the given title.
	 * Returns an empty string if none is found.
	 * @param title
	 */
	public static findFeaturingString(title: string) {
		const titleLower = title.toLowerCase();
		let featuringString = "";

		// List of all possible spellings of featuring
		const featuringSpellings = [
			"featuring",
			"feat.",
			"feat",
			"ft.",
			"ft",
		];

		// Check if title contains a featuring string
		for (let i = 0; i < featuringSpellings.length; i++) {
			if (titleLower.includes(featuringSpellings[i])) {
				const pos = titleLower.indexOf(featuringSpellings[i]);
				featuringString = title.substr(pos, featuringSpellings[i].length);
				break;
			}
		}

		return featuringString;
	}

	public static findKnowArtistsInTitle(title: string, artists: string[]) {
		const titleLower = title.toLowerCase();
		const foundArtists = [];
		for (let i = 0; i < artists.length; i++) {
			if (titleLower.includes(artists[i].toLowerCase())) {
				foundArtists.push(artists[i]);
			}
		}

		return foundArtists;
	}

	/**
	 *
	 * @param title
	 */
	public static removeCommonPhrasesFromTitle(title: string) {
		const titleLower = title.toLowerCase();
		let newTitle = title;

		const commonPhrases = [
			"official audio",
			"official-audio",
			"official video",
			"official-video",
			"official lyric video",
			"official-lyric-video",
			"official lyrics video",
			"official-lyrics-video",
			"lyric video",
			"lyric-video",
			"official music video",
			"official-music-video",
			"hq audio",
			"hq-audio",
			"hd audio",
			"hd-audio",
			"hq music",
			"hq-music",
			"hd video",
			"hd-video",
			"hq-video",
			"hq-video",
			"hq flac",
			"hq-flac",
			"high quality audio",
			"high-quality-audio",
			"clean audio",
			"clean-audio",
			"clean version",
			"clean-version",
			"(audio)",
			"( audio )",
			"(lyric)",
			"( lyric )",
			"(lyrics)",
			"( lyrics )",
			"(premiere)",
			"( premiere )",
			"[premiere]",
			"[ premiere ]",
			"(free)",
			"( free )",
			"[free]",
			"[ free ]",
			"audio only",
			"high quality",
			"high-quality",
			"(hq)",
			"( hq )",
			"(hq-flac)",
			"( hq-flac )",
			"(original mix)",
			"( original mix )",
			"(remix)",
			"( remix )",
			"4k",
			"1080p",
			"1080",
			"720p",
			"720",
			"480p",
			"480",
			"360p",
			"full album"
		];

		// Search for common phrases
		for (let i = 0; i < commonPhrases.length; i++) {
			const posAt = titleLower.indexOf(commonPhrases[i], 0);
			if (posAt >= 0) {
				newTitle = newTitle.substr(0, posAt) + newTitle.substr((posAt + commonPhrases[i].length))
			}
		}

		return newTitle;
	}

	/**
	 *
	 * @param title
	 */
	public static removeUnregularTitleSideCharacters(title: string) {
		let newTitle = title;
		const unregularCharacters = [
			' ',
			',',
			';',
			'-',
			'/',
			'|',
			'.',
			'&',
			'%',
			'?',
			'=',
			'´',
			'`',
			'+',
			'#',
			'<',
			'>',
			'!',
			'"',
			'(',
			')',
			'[',
			']',
			'{',
			'}',
		];

		// Remove unregular and utf-8/16 characters from the beginning
		while (unregularCharacters.indexOf(newTitle.charAt(0)) > -1 || newTitle.charCodeAt(0) > 255) {
			newTitle = newTitle.substr(1);
		}
		// Remove unregular and utf-8/16 characters from the end
		while (unregularCharacters.indexOf(newTitle.charAt(newTitle.length - 1)) > -1 || newTitle.charCodeAt(newTitle.length - 1) > 255) {
			newTitle = newTitle.substr(0, newTitle.length - 1);
		}

		return newTitle;
	}

	/**
	 *
	 * @param title
	 * @param artists
	 */
	public static removeArtistsFromTitle(title: string, artists: string[]) {
		let newTitle = title;
		for (let i = 0; i < artists.length; i++) {
			newTitle = newTitle.replace(artists[i], "");
		}

		return newTitle;
	}

	/**
	 *
	 * @param title
	 * @param featuringString
	 */
	public static removeFeaturingStringFromTitle(title: string, featuringString: string) {
		return title.replace(featuringString, "");
	}

	/**
	 *
	 * @param data
	 */
	// eslint-disable-next-line
	public static fetchTitle(data: any) {
		if (data.title === null) {
			return data.alternativeTitle;
		} else if (data.title.includes("\\u")) {
			return data.alternativeTitle;
		} else {
			return data.title;
		}
	}

	public static getFormattedTitleByMetadata(options: number[], artists: string[], featuringArtists: string[], title: string) {
		// Artists
		let artistsStr = artists[0];
		if (options[0] === 2) {
			const length = (artists.length < 3) ? artists.length : 3;
			const artistsSlice = artists.slice(0, length);
			artistsStr = artistsSlice.join(', ');
		} else if (options[0] === 3) {
			artistsStr = artists.join(', ');
		}

		// Featuring Artists
		let featuringArtistsStr = '';
		if (options[1] === 2) {
			featuringArtistsStr = featuringArtists[0];
		} else if (options[1] === 3) {
			const length = (featuringArtists.length < 3) ? featuringArtists.length : 3;
			const artistsSlice = featuringArtists.slice(0, length);
			featuringArtistsStr = artistsSlice.join(', ');
		} else if (options[1] === 4) {
			featuringArtistsStr = featuringArtists.join(', ');
		}

		if (featuringArtists.length > 0 && options[1] !== 1) {
			if (options[2] === 1) {
				featuringArtistsStr = ' ft. ' + featuringArtistsStr;
			} else {
				featuringArtistsStr = ' feat. ' + featuringArtistsStr;
			}
		} else {
			featuringArtistsStr = '';
		}

		// Orientation
		if (options[3] === 1) {
			return artistsStr + featuringArtistsStr + ' - ' + title;
		} else {
			return title + ' - ' + artistsStr + featuringArtistsStr;
		}
	}
}
