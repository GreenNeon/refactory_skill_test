var https = require('https')
var fs = require('fs')
var filename = 'data.json'
var fileurl = 'https://gist.githubusercontent.com/dhamanutd/6993984928506eea49908c2e3fcbc628/raw/65e5c2b0874f6efefb99db824cff922ca9435193/profile_list.md'

if (fs.existsSync(filename + '.txt')) {
	var dataJSON = fs.readFileSync(filename + '.txt', 'utf8')
	dataJSON = dataJSON.split("```").join('')

	fs.renameSync(filename + '.txt', filename)
	fs.writeFileSync(filename, dataJSON)

} else if (fs.existsSync(filename)) {
	var dataJSON = fs.readFileSync(filename, 'utf8')
	var dataJSON = JSON.parse(dataJSON)
	console.log("Find users who don't have any phone numbers.\n", findNoPhone(dataJSON))
	console.log("Find users who have articles.\n", findHaveArticle(dataJSON))
	console.log('Find users who have "annis" on their name.\n', findAnnis(dataJSON))
	console.log("Find users who have articles on the year 2020.\n", findArticle2020(dataJSON))
	console.log("Find users who are born in 1986.\n", findBorn1986(dataJSON))
	console.log('Find articles that contain "tips" on the title.\n', findArticleTips(dataJSON))
	console.log("Find articles published before August 2019.\n", findArticle2019(dataJSON))
}
else {
	var file = fs.createWriteStream(filename + '.txt')
	var request = https.get(fileurl, function (response) {
		response.pipe(file)
		file.on('finish', function () {
			file.close()  // close() is async, call cb after close completes.
		})
	}).on('error', function (err) { // Handle errors
		fs.unlink(dest) // Delete the file async. (But we don't check the result)
	})
}

function findNoPhone (data) {
	return data.map((user) => {
		if (user.profile.phones.length === 0 || user.profile.phones === null || user.profile.phones === undefined) return user
	}).filter((user) => user !== undefined)
}

function findHaveArticle (data) {
	return data.map((user) => {
		if(user["articles:"].length > 0 || user["articles:"] !== null || user["articles:"] !== undefined) return user
	}).filter((user) => user !== undefined)
}

function findAnnis (data) {
	return data.map((user) => {
		if(user.profile.full_name.toLowerCase().includes('annis')) return user
	}).filter((user) => user !== undefined)
}

function findArticle2020 (data) {
	var articles = []
	findHaveArticle(data).map((user) => {
		var items = user["articles:"].map((article) => {
			if(article.published_at.includes('2020')) return article
		}).filter((article) => article !== undefined)
		
		articles.push(...items)
		return false
	})
	return articles
}

function findBorn1986 (data) {
	return data.map((user) => {
		if(user.profile.birthday.includes('1986')) return user
	}).filter((user) => user !== undefined)
}

function findArticleTips (data) {
	var articles = []
	findHaveArticle(data).map((user) => {
		var items = user["articles:"].map((article) => {
			if(article.title.toLowerCase().includes('tips')) return article
		}).filter((article) => article !== undefined)
		articles.push(...items)
		return false
	})
	return articles
}

function findArticle2019 (data) {
	// August 2019
	var before = new Date(2019, 8, 1)
	var articles = []
	findHaveArticle(data).map((user) => {
		var items = user["articles:"].map((article) => {
			if(new Date(article.published_at) < before) return article
		}).filter((article) => article !== undefined)
		articles.push(...items)
		return false
	})
	return articles
}