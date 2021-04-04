# vue-test-code
## Found issue 
```
1. There's error after first time try serve.
2. MapState is not needed and replaced with MapGetter.
3. Action setDatas commit type is incorrect and replaced with SET_DATA constant.
4. Change getCountData to using getData getter
5. Removed error in Catch > Users.vue, because  not really needed. 
6. Added new CSS Rule to match the example.
```
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Expected Output :
![expected](./src/assets/Expected.png)