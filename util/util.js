const moment = require('moment');
require('moment-duration-format');

module.exports = {
	/**
	 * @description - A function to paginate long arrays into shorter ones.
	 * @param {Array} collection - The array to paginate.
	 * @param {number} [pageLength = 10] - The number of items per page.
	 * @returns {{items:Array<Array>, pages:number, pageLength:number}} - The paginated data.
	 */
	paginate: (collection, pageLength = 10) => {
		const pages = Math.ceil(collection.length / pageLength);
		let startIndex = 0;
		const items = [];
		for (let i = 0; i < pages; i++) {
			items.push(collection.slice(startIndex, startIndex + pageLength));
			startIndex += pageLength;
		}
		return { items, pages, pageLength };
	},
	/**
	 * @description - A function to parse time to a string.
	 * @param {number} time - The time to parse.
	 * @param {1|2} [format = 1] - Format (h [h], mm [m, and] ss [s]) or (hh:mm:ss)
	 * @param {boolean} [ms = true] - Whether the given time is in ms or not.
	 * @returns {string} - The parsed time string.
	 */
	parseTime: (time, format = 1, ms = true) => {
		let parsedTime = undefined;
		if (!ms) time *= 1000;
		if (format === 1) {
			if (time > 36e5) parsedTime = moment.duration(time).format('h [h], mm [m, and] ss [s]');
			else parsedTime = moment.duration(time).format('mm [m and] ss [s]');
		} else {
			parsedTime = moment.duration(time).format('hh:mm:ss');
		}
		if (format !== 1 && parsedTime.length === 2) parsedTime = `00:${parsedTime}`;
		return parsedTime;
	},
	/**
	 * @description - This function provides a quick way to destroy the music player for a server.
	 * @param {string} guild - The id of the guild.
	 * @param {AkairoClient} client - The client object.
	 * @returns {*}
	 */
	musicExit: async (guild, client) => {
		const serverQueue = client.music.queues.get(guild);
		if (!serverQueue) return undefined;
		await serverQueue.stop();
		await serverQueue.clear();
		await serverQueue.player.leave();
		await serverQueue.player.destroy();
		client.musica.feed.delete(guild);
		return true;
	},
	/**
	 * @param {number} time - The time in milliseconds.
	 * @returns {string} - The time parsed in human readable format.
	 */
	parseDuration: time => {
		if (time > 6.307e+10) {
			// Greater than 2 years.
			time = moment.duration(time).format('Y [years,] M [months,] D [days, and] h [hours]');
		} else if (time > 3.1536e10) {
			// Greater than a year.
			time = moment.duration(time).format('Y [year,] M [months,] D [days, and] h [hours]');
		} else if (time > 5.256e+9) {
			// Greater than 2 months
			time = moment.duration(time).format('M [months,] D [days,] h [hours, and] m [mins]');
		} else if (time > 2.628e9) {
			// Greater than a month.
			time = moment.duration(time).format('M [month,] D [days,] h [hours, and] m [mins]');
		} else if (time > 1.2096e9) {
			// Greater than 2 weeks.
			time = moment.duration(time).format('w [week,] D [days,] h [hours, and] m [mins]');
		} else if (time > 6.048e8) {
			// Greater than a week.
			time = moment.duration(time).format('w [week,] D [days,] h [hours, and] m [mins]');
		} else if (time > 1.728e8) {
			// Greater than 2 days.
			time = moment.duration(time).format('D [days,] h [hours,] m [mins, and] s [s]');
		} else if (time > 8.64e7) {
			// Greater than a day.
			time = moment.duration(time).format('D [day,] h [hours,] m [mins, and] s [s]');
		} else if (time > 7.2e6) {
			// Greater than 2 hours.
			time = moment.duration(time).format('h [hours,] m [mins, and] s [seconds]');
		} else if (time > 3.6e6) {
			// Greater than an hour.
			time = moment.duration(time).format('h [hour,] m [mins, and] s [seconds]');
		} else if (time > 12e4) {
			// Greater than 2 mins.
			time = moment.duration(time).format('m [mins and] s [seconds]');
		} else if (time > 6e4) {
			// Greater than a minute.
			time = moment.duration(time).format('m [min and] s [seconds]');
		} else {
			// Less than a minute.
			time = moment.duration(time).format('s [seconds]');
		}
		time = time.split(',').filter(part => !part.includes(' 0 '));
		if (time.length < 2) time = time.join(',').replace(', and', 'and');
		else time = time.join(',');
		return time.replace(/\s\s/g, ' ');
	}
};
