var https = require('https')
var fs = require('fs')
var filename = 'data.json'
var fileurl = 'https://gist.githubusercontent.com/dhamanutd/97aa0d2131903ea8c071721032c7b2a3/raw/60f5108ca55c9a07a951c884599e6b7d07153d14/inventory_list.md'

if (fs.existsSync(filename + '.txt')) {
	var dataJSON = fs.readFileSync(filename + '.txt', 'utf8')
	dataJSON = dataJSON.split("```").join('')

	fs.renameSync(filename + '.txt', filename)
	fs.writeFileSync(filename, dataJSON)

} else if (fs.existsSync(filename)) {
	var dataJSON = fs.readFileSync(filename, 'utf8')
	var dataJSON = JSON.parse(dataJSON)
	console.log("Find items in the Meeting Room.\n", findItemsMeetingRoom(dataJSON))
	console.log("Find all electronic devices.\n", findType(dataJSON, 'electronic'))
	console.log('Find all the furniture.\n', findType(dataJSON, 'furniture'))
	console.log("Find all items were purchased on 16 Januari 2020.\n", findDate(dataJSON, new Date(2020,1,16)))
	console.log("Find all items with brown color.\n", findTag(dataJSON, 'brown'))
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

function findItemsMeetingRoom (data) {
	return data.map((item) => {
		if (item.placement.name.toLowerCase().includes('meeting room')) return item
	}).filter((item) => item !== undefined)
}

function findType (data, type) {
	return data.map((item) => {
		if (item.type.toLowerCase() === type) return item
	}).filter((item) => item !== undefined)
}

function findTag (data, search) {
	return data.map((item) => {
		if (item.tags.find((tag) => tag.toLowerCase() === search)) return item
	}).filter((item) => item !== undefined)
}

function findDate (data, date) {
	return data.map((item) => {
		if (new Date(item.purchased_at) == date) return item
	}).filter((item) => item !== undefined)
}
