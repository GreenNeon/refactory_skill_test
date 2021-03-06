const axios = require("axios")
const config = require("../config").config

function getUserInfo (token) {
	return axios({
		method: "get",
		url: `${config.apiUrl}/users/mazsam`,
		headers: {
			Authorization: "token " + token,
		},
	}).then((response) => {
		return response.data
	})
}

module.exports = getUserInfo
