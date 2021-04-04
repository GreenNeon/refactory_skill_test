# CodeDebugging
## Found issue 
```
1. Some imported config not readable because forget to point the object.
2. Added env configuration.
3. res.data[accessToken] in authCallbackService.js is changed to res.data.access_token, 
	 because the property is not exists.
4. Typo module.exports as module.export fixed in some file.
5. Changin var name require(UserInfoService) in authCallbackService.js
6. Modifying userInfoService to returning axios object and promise.
7. Adding github username to url.
8. Moving the res.json in authCallbackService.js to the inside of getUserInfo Callback. 
```
Code debugging built with NodeJs